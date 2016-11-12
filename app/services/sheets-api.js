import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;

export default Ember.Service.extend({
  /**
   * Retrieve languages for each document
   * @returns {*}
   */
  getAvailableLanguages(){
    const docs = Object.keys(DOCUMENTS);

    return Ember.RSVP.all(docs.map((DOC) => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: DOCUMENTS[DOC].ID,
        range: `${DOCUMENTS[DOC].SHEET_ID}!2:3`,
        majorDimension: 'COLUMNS'
      });
    })).then((results) => {
      return this.processLanguagesResponse(results, docs);
    });
  },

  /**
   * Converts the google api result into an a arrays of languages per documents
   * @param results
   * @param docIds
   * @returns {Object} {DOC_NAME: [{column: x, label: '', code: ''}]}
   */
  processLanguagesResponse(results, docIds) {
    let languages = {};

    docIds.forEach((docId, index) => {
      let result = results[index].result;

      languages[docId] = result.values.map(((value, i) => {
        return {
          column: i,
          label: value[0],
          code: value.length > 1 ? value[1] : null,
        };
      })).slice(2, result.values.length + 1);
    });
    return languages;
  },

  /**
   * Retrieve the phrases from the specified document for the specified languages
   * @param doc
   * @param languages
   */
  getAllPhrases() {
    const docs = Object.keys(DOCUMENTS);

    return Ember.RSVP.all(docs.map((DOC) => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: DOCUMENTS[DOC].ID,
        range: `${DOCUMENTS[DOC].SHEET_ID}`,
        // majorDimension: 'COLUMNS'
      });
    })).then((results) => {
      return this.processSheetsResult(results, docs);
    });
  },

  processSheetsResult(results, docIds) {

    let docs = {};
    let startingLanguagesRow = 1;
    let startingPhrases = 5;

    // process results for each document
    docIds.forEach((docId, index) => {
      let languages = [];
      let phrasesCollection = [];


      // get document results
      let sheetRows = results[index].result.values;
      sheetRows.forEach((row, rowNum) => {

        // row contains the language label
        if (rowNum === 1) {
          languages = row.map((cell, columnNum) => {
            // ignore the two first columns
            if (columnNum > 1) {
              return {
                column: columnNum - 2,
                label: cell
              };
            }
          });
        }

        // row contains the language encoding
        if (rowNum === 2) {
          row.forEach((cell, columnNum) => {
            // ignore the two first columns
            if (columnNum > 1) {
              languages[columnNum].encoding = cell;
            }
          });
        }

        // phrases start in this row
        if (rowNum >= 4) {
          let phrases = [];
          row.forEach((cell, columnNum) => {
            // ignore the two first columns
            if (columnNum > 1) {
              phrases.push(cell);
            }
          });
          phrasesCollection.push(phrases);
        }
      });

      let docObject = {
        languages: languages.compact(),
        phrases: phrasesCollection
      };
      console.log('docObject --->', docId, docObject);
      docs[docId] = docObject;
    });
    return docs;
  }

});
