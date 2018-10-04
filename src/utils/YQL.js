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

    Object.keys(this.params).forEach(param => {
      this.query = this.query.replace(`@${param}`, this.params[param]);
    });

    const opts = {
      format: 'json',
      env: this.config.env,
      q: this.query,
    };

    console.log(opts);
    urlObj.query = { ...urlObj.query, ...opts };

    this._urlObj = urlObj;
    return urlObj.format();
  }

  exec(callback) {
    const url = this.getURL();
    const config = {
      headers: this.config.headers,
      method: 'GET',
      timeout: parseInt(this.config.timeout, 10),
      url,
    };

    const handler = this._handleResponse.bind(this, callback);
    this._httpRequest(config, handler);
  }

  _handleResponse(callback, error, response, body) {
    if (error) {
      return callback(error);
    }

    if (body) {
      parseJSON(body, (error, body) => {
        if (error) {
          return callback(error, null);
        }

        error = null;

        // Request returned an error, create an error object
        if (body.error) {
          error = new Error(body.error.description);
        }

        if (callback) {
          callback(error, body);
        }
      });
    } else {
      throw new Error(YQL.ERROR.missingBody, null);
    }
  }

  _httpRequest(config, handler) {
    return fetch(config).then(handler);
  }
}

const parseJSON = (str, callback) => {
  let result;
  let error;
  try {
    result = JSON.parse(str);
  } catch (e) {
    error = e;
  }

  return callback(error, result);
};

export default YQL;
