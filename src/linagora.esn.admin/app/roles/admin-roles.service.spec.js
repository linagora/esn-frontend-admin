'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminRolesService', function() {
  var $rootScope;
  var adminRolesService, domainAPI, attendeeService;
  var ADMIN_SEARCH_LIMIT;
  var DOMAIN_ID = '123456';

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$rootScope_, _adminRolesService_, _domainAPI_, _attendeeService_, _ADMIN_SEARCH_LIMIT_) {
      $rootScope = _$rootScope_;
      adminRolesService = _adminRolesService_;
      domainAPI = _domainAPI_;
      attendeeService = _attendeeService_;
      ADMIN_SEARCH_LIMIT = _ADMIN_SEARCH_LIMIT_;
    });
  });

  describe('The getAdministrators fn', function() {
    it('should call domainAPI.getAdministrators', function(done) {
      domainAPI.getAdministrators = sinon.stub().returns($q.when({data: []}));

      adminRolesService.init(DOMAIN_ID);

      adminRolesService.getAdministrators()
        .then(function() {
          expect(domainAPI.getAdministrators).to.have.been.calledWith(DOMAIN_ID);
          done();
        });

      $rootScope.$digest();
    });
  });

  describe('The addAdministrators fn', function() {
    it('should call domainAPI.addAdministrators', function(done) {
      var _administrators = [{ id: 'user1' }, { id: 'user2' }];

      adminRolesService.init(DOMAIN_ID);

      domainAPI.getAdministrators = function() {
        return $q.when({data: []});
      };
      domainAPI.addAdministrators = sinon.stub().returns($q.when());

      adminRolesService.getAdministrators().then(function() {
        adminRolesService.addAdministrators(_administrators)
          .then(function() {
            expect(domainAPI.addAdministrators).to.have.been.calledWith(DOMAIN_ID, ['user1', 'user2']);
            done();
          });
      });

      $rootScope.$digest();
    });
  });

  describe('The removeAdministrator fn', function() {

    it('should call domainAPI to remove administrator and remove him from cache on success', function(done) {
      var admin1 = { _id: 1 };
      var admin2 = { _id: 2 };

      domainAPI.getAdministrators = function() {
        return $q.when({ data: [admin1, admin2] });
      };
      domainAPI.removeAdministrator = sinon.stub().returns($q.when());

      adminRolesService.init(DOMAIN_ID);

      adminRolesService.getAdministrators()
        .then(function() {
          return adminRolesService.removeAdministrator(admin1);
        })
        .then(adminRolesService.getAdministrators)
        .then(function(cachedAdministrators) {
          expect(cachedAdministrators.length).to.equal(1);
          expect(cachedAdministrators[0]).to.deep.equal(admin2);

          expect(domainAPI.removeAdministrator).to.have.been.calledWith(DOMAIN_ID, admin1._id);
          done();
        });

      $rootScope.$digest();
    });

  });

  describe('The searchAdministratorCandidates fn', function() {
    it('should call attendeeService', function(done) {
      var query = 'abc';

      adminRolesService.init(DOMAIN_ID);

      attendeeService.getAttendeeCandidates = sinon.stub().returns($q.when([]));

      adminRolesService.searchAdministratorCandidates(query)
        .then(function() {
          expect(attendeeService.getAttendeeCandidates).to.have.been.calledWith(query, ADMIN_SEARCH_LIMIT, ['user']);
          done();
        });

      $rootScope.$digest();
    });

    it('should return an empty array in case of attendeeService.getAttendeeCandidates fails', function(done) {
      var query = 'abc';

      adminRolesService.init(DOMAIN_ID);

      attendeeService.getAttendeeCandidates = sinon.stub().returns($q.reject());

      adminRolesService.searchAdministratorCandidates(query)
        .then(function(res) {
          expect(res).to.be.empty;
          done();
        })
        .catch(done);

      $rootScope.$digest();
    });
  });
});
