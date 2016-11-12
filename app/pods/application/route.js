import Ember from "ember";

const {get, inject} = Ember;
// const {DOCUMENTS} = CONSTANTS;

export default Ember.Route.extend({
  gapi: inject.service(),
  sheetsApi: inject.service('sheets-api'),

  /** initialize google api before anything **/
  beforeModel() {
    return get(this, 'gapi').initialize().then(() => {
      this.transitionTo('docs');
    });
  },

  /** retrieve the languages for all the docs **/
  model() {
    let sheetsAPI = get(this, 'sheetsApi');
    return sheetsAPI.getAllPhrases();
  }
});
