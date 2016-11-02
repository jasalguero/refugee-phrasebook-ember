import Ember from "ember";

const {get, observer} = Ember;

export default Ember.Controller.extend({
  allLanguages: Ember.computed.alias('model.languages'),
  selectedDocument: null,

  documentChanged: observer('selectedDocument', function () {
    console.log('document changed to ', get(this, 'selectedDocument'));
  })
});
