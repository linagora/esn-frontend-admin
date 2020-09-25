
'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsService', function() {

  var $rootScope;
  var domainAPI;
  var adminDomainsService;
  var ADMIN_DOMAINS_EVENTS;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(
      _$rootScope_,
      _adminDomainsService_,
      _domainAPI_,
      _ADMIN_DOMAINS_EVENTS_
    ) {
      $rootScope = _$rootScope_;
      adminDomainsService = _adminDomainsService_;
      domainAPI = _domainAPI_;
      ADMIN_DOMAINS_EVENTS = _ADMIN_DOMAINS_EVENTS_;
    });
  });

  describe('The create method', function() {
    it('should reject if domain is undefined', function(done) {
      adminDomainsService.create()
        .catch(function(err) {
          expect(err.message).to.equal('Domain is required');
          done();
        });

      $rootScope.$digest();
    });

    it('should call domainAPI to create domain', function() {
      domainAPI.create = sinon.stub().returns($q.when({ data: {} }));
      var domain = {};

      adminDomainsService.create(domain);

      $rootScope.$digest();

      expect(domainAPI.create).to.have.been.calledWith(domain);
    });

    it('should broadcast event with created domain on success', function() {
      var domain = { name: 'name ' };
      var createdDomain = { id: 123, name: 'name' };

      $rootScope.$broadcast = sinon.spy(function() {
        return true;
      });
      domainAPI.create = sinon.stub().returns($q.when({ data: createdDomain }));

      adminDomainsService.create(domain);

      $rootScope.$digest();

      expect($rootScope.$broadcast).to.have.been.calledWith(ADMIN_DOMAINS_EVENTS.DOMAIN_CREATED, createdDomain);
    });
  });

  describe('The update method', function() {
    it('should call domainAPI to update domain', function() {
      domainAPI.update = sinon.stub().returns($q.when());
      var modifiedDomain = {};

      adminDomainsService.update(modifiedDomain);

      $rootScope.$digest();

      expect(domainAPI.update).to.have.been.calledWith(modifiedDomain);
    });

    it('should broadcast event with updated domain on success', function() {
      var modifiedDomain = { name: 'modified' };

      $rootScope.$broadcast = sinon.spy(function() {
        return true;
      });
      domainAPI.update = sinon.stub().returns($q.when());

      adminDomainsService.update(modifiedDomain);

      $rootScope.$digest();

      expect($rootScope.$broadcast).to.have.been.calledWith(ADMIN_DOMAINS_EVENTS.DOMAIN_UPDATED, modifiedDomain);
    });
  });
});
