'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainConfigService service', function() {

  var adminDomainConfigService, adminConfigApi;
  var $rootScope;
  var DEFAULT_MODULE = 'core';
  var DOMAIN_ID = 'domain123';

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });

  beforeEach(function() {
    angular.mock.inject(function(_$rootScope_, _adminDomainConfigService_, _adminConfigApi_) {
      $rootScope = _$rootScope_;
      adminDomainConfigService = _adminDomainConfigService_;
      adminConfigApi = _adminConfigApi_;
    });
  });

  describe('The get fn', function() {

    it('should reject on failure', function(done) {
      var key = 'some_key';

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: [key]
        }]);

        return $q.reject(new Error('some_error'));
      };

      adminDomainConfigService.get(DOMAIN_ID, key).catch(function(err) {
        expect(err.message).to.equal('some_error');
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve nothing if configuration module is not found', function(done) {
      var key = 'some_key';
      var value = 'some_value';

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: [key]
        }]);

        return $q.when([{
          name: 'other_module',
          configurations: [{
            name: key,
            value: value
          }]
        }]);
      };

      adminDomainConfigService.get(DOMAIN_ID, key).then(function(data) {
        expect(data).to.not.be.defined;
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve nothing if configuration module is found but the coressponding configuration is not found', function(done) {
      var key = 'some_key';
      var value = 'some_value';

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: [key]
        }]);

        return $q.when([{
          name: DEFAULT_MODULE,
          configurations: [{
            name: 'other_key',
            value: value
          }]
        }]);
      };

      adminDomainConfigService.get(DOMAIN_ID, key).then(function(data) {
        expect(data).to.not.be.defined;
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve configuration value when it is found', function(done) {
      var key = 'some_key';
      var value = 'some_value';

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: [key]
        }]);

        return $q.when([{
          name: DEFAULT_MODULE,
          configurations: [{
            name: key,
            value: value
          }]
        }]);
      };

      adminDomainConfigService.get(DOMAIN_ID, key).then(function(data) {
        expect(data).to.equal(value);
        done();
      });

      $rootScope.$digest();
    });

  });

  describe('The getMultiple fn', function() {
    it('should reject on failure', function(done) {
      var keys = ['a', 'b'];

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: keys
        }]);

        return $q.reject(new Error('some_error'));
      };

      adminDomainConfigService.getMultiple(DOMAIN_ID, keys).catch(function(err) {
        expect(err.message).to.equal('some_error');
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve a list configurations when they are found', function(done) {
      var keys = ['a', 'b'];
      var configurations = [
        { name: 'a', value: 'value a' },
        { name: 'b', value: 'value b' }
      ];
      var expectResult = { a: 'value a', b: 'value b' };

      adminConfigApi.get = function(domainId, query) {
        expect(domainId).to.equal(DOMAIN_ID);
        expect(query).to.deep.equal([{
          name: DEFAULT_MODULE,
          keys: keys
        }]);

        return $q.when([{
          name: DEFAULT_MODULE,
          configurations: configurations
        }]);
      };

      adminDomainConfigService.getMultiple(DOMAIN_ID, keys).then(function(data) {
        expect(data).to.deep.equal(expectResult);
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The set fn', function() {

    it('should update a single configuration by sending the right parameters to adminConfigApi', function(done) {
      var key = 'some_key';
      var value = 'some_value';
      var expectedQuery = [{
        name: DEFAULT_MODULE,
        configurations: [{
          name: key,
          value: value
        }]
      }];

      adminConfigApi.set = sinon.stub().returns($q.when());

      adminDomainConfigService.set(DOMAIN_ID, key, value).then(function() {
        expect(adminConfigApi.set).to.have.been.calledWith(DOMAIN_ID, sinon.match(expectedQuery));
        done();
      });

      $rootScope.$digest();
    });

  });

  describe('The setMultiple fn', function() {
    it('should update multiple configurations by sending the right parameters to adminConfigApi', function(done) {
      var configurations = [
        { name: 'a', value: 'value a' },
        { name: 'b', value: 'value b' }
      ];
      var expectedQuery = [{
        name: DEFAULT_MODULE,
        configurations: configurations
      }];

      adminConfigApi.set = sinon.stub().returns($q.when());

      adminDomainConfigService.setMultiple(DOMAIN_ID, configurations).then(function() {
        expect(adminConfigApi.set).to.have.been.calledWith(DOMAIN_ID, sinon.match(expectedQuery));
        done();
      });

      $rootScope.$digest();
    });
  });
});
