import Ember from 'ember';
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {DOCUMENTS} = CONSTANTS;
const {get, set, inject, computed} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  languagesController: inject.controller('languages'),
  selectedDocument: computed.oneWay('applicationController.selectedDocument'),
  documentObjects: computed.alias('applicationController.documents'),
  selectedLanguages: computed.oneWay('languagesController.selectedLanguages'),

  /** available documents */
  documents: DOCUMENTS,

  /** phrases for selected document **/
  availablePhrases: computed('selectedDocument', 'documentObjects.@each.phrases', 'selectedLanguages.[]', function() {
    let selectedLanguagesIndexes = get(this, 'selectedLanguages').map(lang => lang.column);

    return get(this, `documentObjects.${get(this, 'selectedDocument')}.phrases`).map(phrases => {
      return phrases.filter((phrase, index) => {
        return selectedLanguagesIndexes.includes(index);
      });
    });
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
