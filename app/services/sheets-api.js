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
      }));
    });

    // get all the values except the first two columns that don't hold language name
    // for (let i = 0; i < result.values.length; i++) {
    //   RPB.CONFIG.LANGUAGES[document][i] = {
    //     id: i,
    //     label: (response.result.values[i].length > 0 && i > 1) ? response.result.values[i][0] : null
    //   };
    // }
    return languages;
  }
});
