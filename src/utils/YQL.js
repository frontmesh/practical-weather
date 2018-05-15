class YQL {
  query = '';
  params = {};
  static ERROR = {
    missingQuery: 'Missing YQL query',
    missingBody: 'Missing response body',
    invalidParameter: 'Missing or invalid parameter',
  };

  static DEFAULT_CONFIG = {
    baseURL: {
      http: 'http://query.yahooapis.com/v1/public/yql',
      https: 'https://query.yahooapis.com/v1/public/yql',
    },
    env: 'http://datatables.org/alltables.env',
    headers: {},
    ssl: false,
    timeout: 0, // 0 = No timeout
  };

  constructor(query, config) {
    config = config || {};

    if (!query) {
      throw new Error(YQL.ERROR.missingQuery);
    }

    if (!(this instanceof YQL)) {
      return new YQL(query, config);
    }

    this.query = query;
    this.config = {
      ...YQL.DEFAULT_CONFIG,
      ...config,
    };
  }
}

export default YQL;
