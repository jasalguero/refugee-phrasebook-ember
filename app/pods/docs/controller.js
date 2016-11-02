import Ember from 'ember';

export default Ember.Controller.extend({
  documents: Ember.computed.alias('model')
});
