import Ember from "ember";
import config from "./config/environment";

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function () {
  this.route('languages');
  this.route('icons');
  this.route('phrases');
  this.route('links');
  this.route('extras');
  this.route('docs');
});

export default Router;
