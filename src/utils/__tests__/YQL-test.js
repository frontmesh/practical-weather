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
    var yql = new YQL('SHOW TABLES');

    it('should generate the correct HTTP URL', () => {
      expect(yql.getURL()).toBe(
        'http://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&q=SHOW%20TABLES'
      );
    });

    it('should generate the correct HTTPS URL', () => {
      yql.setConfig('ssl', true);
      expect(yql.getURL()).toBe(
        'https://query.yahooapis.com/v1/public/yql?format=json&env=http%3A%2F%2Fdatatables.org%2Falltables.env&q=SHOW%20TABLES'
      );
    });
  });

  describe('#exec', () => {
    describe('without a response', () => {
      const yql = new YQL('SHOW TABLES');
      yql._httpRequest = jest.fn();

      it('should throw an error', () => {
        expect(yql.exec.bind(yql)).toThrowError(new RegExp(YQL.ERROR.missingBody));
      });
    });
  });
});
