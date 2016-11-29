import Ember from "ember";

const {get, set, inject, computed, $} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  phrasesController: inject.controller('phrases'),
  languagesController: inject.controller('languages'),
  iconsController: inject.controller('icons'),

  /** models **/
  selectedDocument: computed.oneWay('applicationController.selectedDocument'),
  phrases: computed.filterBy('phrasesController.availablePhrases', 'isSelected'),
  selectedLanguages: computed.oneWay('languagesController.selectedLanguages'),
  icons: computed.oneWay('iconsController.enabledIcons'),
  englishIconsEnabled: computed.oneWay('iconsController.englishEnabled'),
  arabicIconsEnabled: computed.oneWay('iconsController.arabicEnabled'),
  blankIconsEnabled: computed.oneWay('iconsController.blankEnabled'),

  actions: {
    /** **/
    generateJSON() {
      let json = {};
      let selectedLanguages = get(this, 'selectedLanguages');

      json.languages = selectedLanguages.map(language => {
        return {
          label: get(language, 'label'),
          lang_code: get(language, 'encoding')
        };
      });

      // so far only one category corresponding to the document
      json.categories = [];
      json.categories.push({
        label: selectedLanguages.map(() => get(this, 'selectedDocument')),
        phrases: get(this, 'phrases').map(phrase => phrase.map(idiom => idiom))
      });

      json.icons = get(this, 'icons').map(icon => {
        return {
          icon: get(icon, 'svg'),
          captions: get(icon, 'languages').map((language, index) => {
            // only pass arabic and english if they are selected
            if ((index === 0 && get(this, 'englishIconsEnabled')) || (index === 1 && get(this, 'arabicIconsEnabled'))) {
              return {
                lang_code: get(language, 'encoding'),
                label: get(language, 'value')
              };
            }
          }).compact(),
          show_empty_caption: get(this, 'blankIconsEnabled')
        };
      });

      set(this, 'generatedJSON', JSON.stringify(json));
      console.log('GENERATED JSON', json);
      $('.ui.json-preview.modal').modal('show');
    },

    closeModal() {
      this.$('.ui.json-preview.modal').modal('hide');

    }
  }
});
