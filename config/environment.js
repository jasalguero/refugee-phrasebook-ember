/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'refugee-phrasebook',
    podModulePrefix: 'refugee-phrasebook/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      GAPI_CLIENT_ID: 'AIzaSyDrgM9k7R2XDXWECt4J0L7GAYQ7OxGpRSc',
      GAPI_SOURCE_URL: 'https://apis.google.com/js/client.js?onload=gapiReady',
      GAPI_SHEETS_URL: 'https://sheets.googleapis.com/$discovery/rest?version=v4'

      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
