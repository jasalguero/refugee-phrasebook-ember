import Ember from "ember";

const {get, inject} = Ember;

export default Ember.Route.extend({

  gapi: inject.service(),

  beforeModel() {
    return get(this, 'gapi').initialize().then(() => {
      this.transitionTo('languages');
    });
  },

  model() {
    console.log('loading model');
  }
});
