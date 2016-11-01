export default {
  // Target spreadsheets
  SPREADSHEETS: {
    // SHORT: 'https://docs.google.com/spreadsheets/d/1tV8MsUYpk5LW0ZZsZ3lF1ZoM9gK-3xzmCmyVKeszdDs/edit#gid=0',
    // GENERAL: 'https://docs.google.com/spreadsheets/d/1hVa7vtHCc7WGkf0idxU0j5YWX0eX0jzavMR5GncG-nU/edit#gid=0',
    // MEDICAL: 'https://docs.google.com/spreadsheets/d/1wjmRrkN9WVB4KIeKBy8wDDJ8E51Mh2-JxIBy2KNMFRQ/edit#gid=0',
    // JURIDICAL: 'https://docs.google.com/spreadsheets/d/1D7jo-tAyQkmfYvVyT27nZ93ZkyFcZg2vEvf4OMbXJ_c/edit#gid=0',
    // HELPERS: 'https://docs.google.com/spreadsheets/d/1h5q88bo6kPClrvevqDwml82lC48bpr5XnMfl9bRYaKs/edit#gid=0'
    SHORT: {
      SPREADSHEET_ID: '1tV8MsUYpk5LW0ZZsZ3lF1ZoM9gK-3xzmCmyVKeszdDs',
      SHEET_ID: '1) Phrases for refugees'
    },
    GENERAL: {
      SPREADSHEET_ID: '1hVa7vtHCc7WGkf0idxU0j5YWX0eX0jzavMR5GncG-nU',
      SHEET_ID: '1) Phrases for refugees'
    },
    MEDICAL: {
      SPREADSHEET_ID: '1wjmRrkN9WVB4KIeKBy8wDDJ8E51Mh2-JxIBy2KNMFRQ',
      SHEET_ID: 'Medical'
    },
    JURIDICAL: {
      SPREADSHEET_ID: '1D7jo-tAyQkmfYvVyT27nZ93ZkyFcZg2vEvf4OMbXJ_c',
      SHEET_ID: 'phrasebook Law - no new sheets pls'
    },
    HELPERS: {
      SPREADSHEET_ID: '1h5q88bo6kPClrvevqDwml82lC48bpr5XnMfl9bRYaKs',
      SHEET_ID: 'Sheet1'
    }
  },
  // List of available languages for the queries
  LANGUAGES: {
    SHORT: {},
    GENERAL: {},
    MEDICAL: {},
    JURIDICAL: {},
    HELPERS: {}
  },
  DEFAULTS: {
    TARGET: 'SHORT',
    LANGUAGES: ['D', 'F', 'X'],
    CONTAINER_CLASS: 'rpb-wrapper'
  }
};