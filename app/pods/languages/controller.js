import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {get, set, inject, computed, observer} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  selectedDocument: computed.alias('applicationController.selectedDocument'),
  documentObjects: computed.alias('applicationController.documents'),

  /** available documents */
  documents: DOCUMENTS,

  /** languages for selected document **/
  availableLanguages: computed('selectedDocument', 'documentObjects.@each.languages', function() {
    return get(this, `documentObjects.${get(this, 'selectedDocument')}.languages`);
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
