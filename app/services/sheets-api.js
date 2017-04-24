import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS, ICONS} = CONSTANTS;
const {get} = Ember;

export default Ember.Service.extend({
  /**
   * Retrieve all the spreadsheets info
   */
  getAllPhrases() {
    const docs = Object.keys(DOCUMENTS);

    return Ember.RSVP.all(docs.map((DOC) => {
      return gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: DOCUMENTS[DOC].ID,
        range: `${DOCUMENTS[DOC].SHEET_ID}`
      });
    })).then(results => {
      return this.processSheetsResult(results, docs);
    });
  },

  /** Parse and convert results from Docs sheets into usable models **/
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
              if (hasValues || !Ember.isEmpty(phrase)) {
                // console.log(phrase);
              }
              return hasValues || !Ember.isEmpty(phrase);
            }, false)) {
            phrasesCollection.push(phrases);
          } else {
            phrasesCollection.push([]);
          }
        }
      });

      let docObject = {
        languages: languages.compact(),
        phrases: phrasesCollection.filter(p => p.length > 0)
      };
      console.log('docObject --->', docId, docObject);
      docs[docId] = docObject;
    });
    return docs;
  },

  /** Retrieve all the icons info from the spreadsheet **/
  getIcons() {
    return gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: ICONS.ID,
      range: `${ICONS.SHEET_ID}`
    }).then(results => {
      return this.processIconsResults(results);
    });
  },

  processIconsResults(results) {
    let rows = get(results, 'result.values');

    let languages = rows[1].map((column, index) => {
      // languages start in 3rd column
      if (index > 2) {
        return {
          label: column,
          encoding: rows[2][index]
        };
      }
    });

    return rows.map((row, rowIndex) => {
      // icons start in 4th row
      if (rowIndex > 3) {
        return {
          svg: row[2],
          languages: row.map((column, index) => {
            if (index > 2) {
              return {
                value: column,
                language: languages[index].label,
                encoding: languages[index].encoding,
              };
            }
          }).compact()
        };
      }
    }).compact();
  }
});
