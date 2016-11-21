import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {get, set, observer, debug} = Ember;
const {DOCUMENTS} = CONSTANTS;

export default Ember.Controller.extend({
  /** languages for all documents **/
  documents: Ember.computed.alias('model'),

  /** user selected document **/
  selectedDocument: DOCUMENTS.SHORT.LABEL,

  /** user selected document **/
  documentChanged: observer('selectedDocument', function () {
    debug(`document changed to ${get(this, 'selectedDocument')}`);
    this.resetLanguages();
  }),

  /** initialize data **/
  setup() {
    this.forceEnglishLanguage();
  },

  /** make english always selected and 'not unselectable' **/
  forceEnglishLanguage() {
    let documents = get(this, 'documents');
    let allLanguages = Object.keys(documents).map(docId => get(documents[docId], 'languages'));

    debug('setting english by default');

    allLanguages.forEach( docLanguages => {
      set(docLanguages[0], 'isSelected', true);
      set(docLanguages[0], 'isReadOnly', true);
    });
  },

  /** observer to reset isSelect flag on document change **/
  resetLanguages() {
    debug('resetting languages');
    let documents = get(this, 'documents');
    let allLanguages = Object.keys(documents).map(docId => get(documents[docId], 'languages'));
    allLanguages.forEach( docLanguages => {
      docLanguages.forEach(language => {
        set(language, 'isSelected', get(language, 'isReadOnly'));
      });
    });
  }
});
