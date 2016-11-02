import Ember from "ember";

const {get, inject} = Ember;

export default Ember.Route.extend({

  gapi: inject.service(),
  sheetsApi: inject.service('sheets-api'),

  beforeModel() {
    return get(this, 'gapi').initialize().then(() => {
      this.transitionTo('languages');
    });
  },

  model() {
    return get(this,'sheetsApi').getAvailableLanguages().then((result) => {
      console.log(`------ languages retrieved:`, result);
    });
  }
});
