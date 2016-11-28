import Ember from "ember";

const {get, inject, RSVP} = Ember;

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
    return RSVP.all([sheetsAPI.getAllPhrases(), sheetsAPI.getIcons()]).then(results => {
      return {
        documents: results[0],
        icons: results[1]
      };
    });
  },

  /** tell the controller to trigger data initialization needed **/
  setupController(controller, model) {
    this._super(controller, model);

    controller.setup();
  },

});
