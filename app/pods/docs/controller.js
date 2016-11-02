import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {set, inject, computed} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  selectedDocument: computed.alias('applicationController.selectedDocument'),

  /** available documents */
  documents: DOCUMENTS,

  actions: {
    /** set a new document as selected*/
    documentSelected(document) {
      set(this, 'selectedDocument', document);
    }
  }
});
