import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {get, set, observer, debug} = Ember;
const {DOCUMENTS} = CONSTANTS;

export default Ember.Controller.extend({
  /** model **/
  documents: Ember.computed.alias('model.documents'),
  icons: Ember.computed.alias('model.icons'),

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
    this.preselectIcons();
  },

  /** make english always selected and 'not unselectable' **/
  forceEnglishLanguage() {
    let documents = get(this, 'documents');
    let allLanguages = Object.keys(documents).map(docId => get(documents[docId], 'languages'));

    debug('setting english by default');

    allLanguages.forEach( docLanguages => {
      set(docLanguages[0], 'isSelected', true);
    });
  },

  /** sets the 12 first icons as selected and select all languages**/
  preselectIcons() {
    get(this, 'icons').forEach((icon, index) => set(icon, 'isSelected', index < 12));
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
