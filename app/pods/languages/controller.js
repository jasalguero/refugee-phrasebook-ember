import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {get, set, inject, computed, observer} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  selectedDocument: computed.alias('applicationController.selectedDocument'),
  allLanguages: computed.alias('applicationController.allLanguages'),

  /** available documents */
  documents: DOCUMENTS,

  /** languages for selected document **/
  availableLanguages: computed('selectedDocument', 'allLanguages', function() {
    return get(this, 'allLanguages')[get(this, 'selectedDocument')];
  }),

  /** selected languages for this document **/
  selectedLanguages: computed.filterBy('availableLanguages', 'isSelected'),

  /** observer to reset isSelect flag on document change **/
  selectedDocumentChanged: observer('selectedDocument', function() {
    Ember.debug('resetting languages');
    let allLanguages = get(this, 'allLanguages');
    for (let doc in allLanguages) {
      allLanguages[doc].setEach('isSelected', false);
    }
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