import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {get, set, inject, computed} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  selectedDocument: computed.alias('applicationController.selectedDocument'),
  selectedLanguages: computed.alias('applicationController.allLanguages'),

  /** available documents */
  documents: DOCUMENTS,

  /** languagse for selected document **/
  selectedDocLanguages: computed('selectedDocument', 'allLanguages', function() {
    return get(this, 'allLanguages')[get(this, 'selectedDocument')];
  }),

  actions: {
    /** set a new document as selected */
    documentSelected(document) {
      set(this, 'selectedDocument', document);
    },

    /** go to next section */
    next() {
      this.transitionToRoute('phrases');
    },

    /** go to previous section */
    prev() {
      this.transitionToRoute('documents');

    }
  }
});
