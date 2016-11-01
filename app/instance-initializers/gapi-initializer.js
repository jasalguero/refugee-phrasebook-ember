export function initialize(appInstance) {
  let gapiService = appInstance.lookup('service:gapi');
  gapiService.fetchGapi();
}

export default {
  name: 'gapi-initializer',
  initialize
};
