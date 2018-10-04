import YQL from '../YQL';

describe('YQL', () => {
  describe('constructor', () => {
    it('to return instance', () => {
      expect(new YQL('foo')).toBeInstanceOf(YQL);
    });

    it('should throw an exception if missing a query', () => {
      expect(() => {
        new YQL();
      }).toThrowError(YQL.ERROR.missingQuery);
    });

    it('should have a query property', () => {
      var myQuery = 'SHOW TABLES';
      expect(new YQL(myQuery).query).toBe(myQuery);
    });
    it('should have a config property with defaults', () => {
      expect(new YQL('SHOW TABLES').config).toEqual(YQL.DEFAULT_CONFIG);
    });

    it('should remember custom config properties', () => {
      expect(new YQL('SHOW TABLES', { foo: 'bar' }).config).toHaveProperty('foo');
    });
  });

  describe('#setParam', () => {
    const yql = new YQL('SHOW TABLES');

    it('should set a param', () => {
      yql.setParam('foo', 'bar');
      expect(yql.params).toEqual({ foo: 'bar' });
    });

    it('should return itself', () => {
      const value = yql.setParam('foo', 'bar');
      expect(value).toBe(yql);
    });
  });

  describe('#setParams', () => {
    var yql = new YQL('SHOW TABLES');

    it('should set multiple param', () => {
      const params = {
        foo: 'bar',
        baz: 'bop',
      };
      yql.setParams(params);
      expect(yql.params).toEqual(params);
    });

    it('should return itself', () => {
      const value = yql.setParams({});
      expect(value).toBe(yql);
    });
  });

  describe('#setConfig', () => {
    const yql = new YQL('SHOW TABLES');

    it('should set a config', () => {
      yql.setConfig('foo', 'bar');
      expect(yql.config).toHaveProperty('foo');
    });

    it('should return itself', () => {
      expect(yql.setConfig('foo', 'bar')).toBe(yql);
    });
  });

  describe('#setConfigs', () => {
    const yql = new YQL('SHOW TABLES');

    it('should set multiple configs', () => {
      yql.setConfigs({
        foo: 'bar',
        baz: 'bop',
      });

      expect(yql.config).toHaveProperty('foo');
    });

    it('should return itself', () => {
      expect(yql.setConfigs({})).toBe(yql);
    });
  });

  describe('#getURL', () => {
    it('should generate the correct HTTP URL', () => {
      const yql = new YQL('SHOW TABLES');
      expect(yql.getURL()).toBe(
        'http://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&q=SHOW%20TABLES'
      );
    });

    it('should generate the correct HTTPS URL', () => {
      const yql = new YQL('SHOW TABLES');
      yql.setConfig('ssl', true);
      expect(yql.getURL()).toBe(
        'https://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&q=SHOW%20TABLES'
      );
    });

    it('should replace the right params', () => {
      const query = new YQL(
        'select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text="(@latitude, @longitude)")'
      );
      query.setParam('latitude', 37.78583).setParam('longitude', -122.406417);

      expect(query.getURL()).toBe(
        'http://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(37.78583%2C%20-122.406417)%22)'
      );
    });
  });

  describe('#exec', () => {
    describe('without a response', () => {
      const yql = new YQL('SHOW TABLES');
      yql._httpRequest = jest.fn((config, callback) => {
        callback();
      });

      it('should throw an error', () => {
        expect(yql.exec.bind(yql)).toThrowError(new RegExp(YQL.ERROR.missingBody));
      });
    });

    describe('with an HTTP error', () => {
      const yql = new YQL('SHOW TABLES');
      yql._httpRequest = jest.fn((config, callback) => {
        callback('This is an error message');
      });

      it('should return an error', done => {
        yql.exec(error => {
          expect(error).toBe('This is an error message');
          done();
        });
      });
    });

    describe('with a parsing error', () => {
      const yql = new YQL('SHOW TABLES');
      yql._httpRequest = jest.fn((config, callback) => {
        callback(null, null, 'this is not valid json');
      });

      it('should respond with an error', done => {
        yql.exec((error, body) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('Unexpected token h in JSON at position 1');
          done();
        });
      });
    });

    describe('with a YQL error', () => {
      const yql = new YQL('SHOW TABLES');
      var response = {
        error: {
          description: 'This is a YQL error',
        },
      };

      yql._httpRequest = jest.fn((config, callback) => {
        const json = JSON.stringify(response);
        callback(null, null, json);
      });

      it('should respond with an error', done => {
        yql.exec((error, body) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe(response.error.description);
          done();
        });
      });
    });

    describe('with mocked response', () => {
      const yql = new YQL('SHOW TABLES');
      const response = {
        query: {
          results: {
            tables: [],
          },
        },
      };

      yql._httpRequest = jest.fn((config, callback) => {
        const json = JSON.stringify(response);
        callback(null, null, json);
      });

      it('should respond correctly', done => {
        yql.exec((error, body) => { //eslint-disable-line
          expect(body).toEqual(response);
          done();
        });
      });
    });
  });
});
