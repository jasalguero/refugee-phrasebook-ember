import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {get, observer} = Ember;
const {DOCUMENTS} = CONSTANTS;

export default Ember.Controller.extend({
  allLanguages: Ember.computed.alias('model.languages'),
  selectedDocument: DOCUMENTS.SHORT.LABEL,

  documentChanged: observer('selectedDocument', function () {
    console.log('document changed to ', get(this, 'selectedDocument'));
  })
});
