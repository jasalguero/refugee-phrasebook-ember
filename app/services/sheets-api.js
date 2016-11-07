import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;

export default Ember.Service.extend({
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
  }
});
