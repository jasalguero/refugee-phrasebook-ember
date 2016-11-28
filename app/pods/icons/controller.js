import Ember from "ember";

const {get, set, inject, computed} = Ember;

export default Ember.Controller.extend({
  /** dependencies */
  applicationController: inject.controller('application'),
  icons: computed.oneWay('applicationController.icons'),

  /** flag to check if any icon is selected **/
  enabledIcons: computed.filterBy('icons', 'isSelected'),

  /** flags for language and blank columns **/
  englishEnabled: true,
  arabicEnabled: true,
  blankEnabled: true,

  actions: {
    /** go to next section */
    next() {
      this.transitionToRoute('links');
    },

    /** go to previous section */
    prev() {
      this.transitionToRoute('documents');
    },

    /** toggles selection for all icons **/
    toggleAllIcons(value) {
      get(this, 'icons').forEach(icon => set(icon, 'isSelected', value));
    }
  }
});
