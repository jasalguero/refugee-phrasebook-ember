import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['svg-icon'],

  /** bound properties **/
  height: '50px',
  width: '50px',

  /** component life cycle **/
  didInsertElement() {
    // this.$('svg')
  }
});
