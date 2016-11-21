import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {get, inject, computed} = Ember;

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
