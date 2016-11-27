import Ember from "ember";
import config from "refugee-phrasebook/config/environment";

const {GAPI_CLIENT_ID, GAPI_SOURCE_URL, GAPI_SHEETS_URL}= config.APP;
const {$, debug, RSVP} = Ember;

export default Ember.Service.extend({
  gapiReady: false,
  sheetClientReady: false,

  init() {
    this._super();

    if (window.gapi) {
      // gapi client is already loaded
      return this.setReady();
    }

    // bind the event that gapi client will call on load
    window.gapiReady = this.setReady.bind(this);
  },

  setReady() {
    debug('GAPI client loaded');
    this.set('gapiReady', true);
  },

  loadSheetsAPI() {
    gapi.client.setApiKey(GAPI_CLIENT_ID);
    return gapi.client.load(GAPI_SHEETS_URL).then(this.setSheetClientReady.bind(this), (error) => {
      console.error('ERROR HAPPENED -> ', error);
    });
  },

  setSheetClientReady() {
    debug('GAPI sheet api loaded');
    this.set('sheetClientReady', true);
  },

  initialize() {
    return new RSVP.Promise((resolve, reject) => {
      RSVP.Promise.resolve($.getScript(GAPI_SOURCE_URL)).then(() => {
        gapi.load('client', () => {
          this.loadSheetsAPI().then(() => {
            resolve();
          });
        }, error => {
          reject(error);
        });
      });
    });
  }
});
