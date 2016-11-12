import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {get, observer} = Ember;
const {DOCUMENTS} = CONSTANTS;

export default Ember.Controller.extend({
  /** languages for all documents **/
  documents: Ember.computed.alias('model'),

  /** user selected document **/
  selectedDocument: DOCUMENTS.SHORT.LABEL,

  /** user selected document **/
  documentChanged: observer('selectedDocument', function () {
    console.log('document changed to ', get(this, 'selectedDocument'));
  })
});
