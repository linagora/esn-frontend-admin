'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminUsersService', function() {
  var adminUsersService, adminDomainConfigService, ADMIN_USER_EVENTS, domainAPI;
  var $rootScope;
  var domainId;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    angular.mock.inject(function(_$rootScope_, _adminUsersService_, _adminDomainConfigService_, _ADMIN_USERS_EVENTS_, _domainAPI_) {
      $rootScope = _$rootScope_;
      adminUsersService = _adminUsersService_;
      adminDomainConfigService = _adminDomainConfigService_;
      ADMIN_USER_EVENTS = _ADMIN_USERS_EVENTS_;
      domainAPI = _domainAPI_;

      domainId = '123456';
    });
  });

  describe('The createMember fn', function() {
    var userMock;

    beforeEach(function() {
      userMock = {key: 'value'};
    });

    it('should call domainAPI.createMember to create member', function(done) {
      domainAPI.createMember = sinon.stub().returns($q.when({data: userMock}));
      $rootScope.$broadcast = sinon.spy();

      adminUsersService.createMember(domainId, userMock)
        .then(function() {
          expect(domainAPI.createMember).to.have.been.calledWith(domainId, userMock);
          expect($rootScope.$broadcast).to.have.been.calledWith(ADMIN_USER_EVENTS.CREATE, userMock);
          done();
        });

      $rootScope.$digest();
    });
  });

  describe('The isUserCreationEnabled function', function() {
    it('should return true if ldap configuration is not defined', function(done) {
      adminDomainConfigService.get = sinon.stub().returns($q.when());

      adminUsersService.isUserCreationEnabled(domainId)
      .then(function(enabled) {
        expect(enabled).to.be.true;
        done();
      })
      .catch(done);

      $rootScope.$digest();
    });

    it('should return true if ldap configuration.usage is not defined', function(done) {
      adminDomainConfigService.get = sinon.stub().returns($q.when({}));

      adminUsersService.isUserCreationEnabled(domainId)
      .then(function(enabled) {
        expect(enabled).to.be.true;
        done();
      })
      .catch(done);

      $rootScope.$digest();
    });

    it('should return true if ldap configuration.usage.auth is not defined', function(done) {
      adminDomainConfigService.get = sinon.stub().returns($q.when({usage: {}}));

      adminUsersService.isUserCreationEnabled(domainId)
      .then(function(enabled) {
        expect(enabled).to.be.true;
        done();
      })
      .catch(done);

      $rootScope.$digest();
    });

    it('should return false if ldap configuration.usage.auth is true', function(done) {
      adminDomainConfigService.get = sinon.stub().returns($q.when({usage: {auth: true}}));

      adminUsersService.isUserCreationEnabled(domainId)
      .then(function(enabled) {
        expect(enabled).to.be.false;
        done();
      })
      .catch(done);

      $rootScope.$digest();
    });

    it('should return false if at least one ldap configuration.usage.auth is true', function(done) {
      adminDomainConfigService.get = sinon.stub().returns($q.when([
        {usage: {auth: false}},
        {usage: {auth: false}},
        {usage: {auth: true}}
      ]));

      adminUsersService.isUserCreationEnabled(domainId)
      .then(function(enabled) {
        expect(enabled).to.be.false;
        done();
      })
      .catch(done);

      $rootScope.$digest();
    });
  });
});
