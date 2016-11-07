import Ember from "ember";
import CONSTANTS from "refugee-phrasebook/utils/constants";

const {get, inject} = Ember;
const {DOCUMENTS} = CONSTANTS;

export default Ember.Route.extend({
  gapi: inject.service(),
  sheetsApi: inject.service('sheets-api'),

  beforeModel() {
    return get(this, 'gapi').initialize().then(() => {
      this.transitionTo('docs');
    });
  },

  model() {
    return get(this,'sheetsApi').getAvailableLanguages().then((result) => {
      return {
        languages: result
      };
    });
  }
});
