import url from 'url';

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

  setParam(key, value) {
    this.params[key] = value;
    return this;
  }

  setParams(params) {
    this.params = { ...this.params, ...params };
    return this;
  }

  setConfig(key, value) {
    this.config[key] = value;
    return this;
  }

  setConfigs(config) {
    this.config = { ...this.config, ...config };
    return this;
  }

  getURL() {
    const baseURL = this.config.baseURL[this.config.ssl ? 'https' : 'http'];
    // Create base url object
    const urlObj = url.parse(baseURL, true);
    const opts = {
      format: 'json',
      env: this.config.env,
      q: this.query,
    };

    urlObj.query = { ...urlObj.query, ...opts, ...this.params };
    this._urlObj = urlObj;
    return urlObj.format();
  }
}

export default YQL;
