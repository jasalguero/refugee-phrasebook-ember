import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;

export default Ember.Service.extend({
  /**
   * Retrieve the phrases from the specified document for the specified languages
   */
  getAllPhrases() {
    const docs = Object.keys(DOCUMENTS);

    return Ember.RSVP.all(docs.map((DOC) => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: DOCUMENTS[DOC].ID,
        range: `${DOCUMENTS[DOC].SHEET_ID}`
      });
    })).then((results) => {
      return this.processSheetsResult(results, docs);
    });
  },

  processSheetsResult(results, docIds) {
    let docs = {};

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


          // make sure is not an empty row
          if (phrases.reduce((hasValues, phrase) => {
              return hasValues || !Ember.isNone(phrase);
            }, false)) {
            phrasesCollection.push(phrases);
          } else {
            phrasesCollection.push([]);
          }
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
