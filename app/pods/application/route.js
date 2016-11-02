import Ember from "ember";

const {get, inject} = Ember;

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
