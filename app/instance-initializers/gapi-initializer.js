export function initialize(appInstance) {
  let gapiService = appInstance.lookup('service:gapi');
  // app.deferReadiness();
  // gapiService.fetchGapi();
}

export default {
  name: 'gapi-initializer',
  initialize
};
