'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsCreateController', function() {
  var $controller, $rootScope, $scope;
  var domainAPI;
  var domainName;
  var esnAvailabilityService;

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _domainAPI_, _esnAvailabilityService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      domainAPI = _domainAPI_;
      esnAvailabilityService = _esnAvailabilityService_;
    });

    domainName = 'abc.com';
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminDomainsFormController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The uniqueDomainName method', function() {
    it('should reject if domain name is not provided', function(done) {
      var controller = initController();

      controller.uniqueDomainName()
        .catch(function(err) {
          expect(err.message).to.equal('Domain name required');
          done();
        });

      $scope.$digest();
    });

    it('should reject if domain exists already', function(done) {
      domainAPI.getByName = sinon.stub().returns($q.when({ name: domainName }));

      var controller = initController();

      controller.uniqueDomainName(domainName)
        .catch(function(err) {
          expect(err.message).to.equal('Domain already exists');
          expect(domainAPI.getByName).to.have.been.calledWith(domainName);
          done();
        });

      $scope.$digest();
    });

    it('should resolve if domain already exist', function(done) {
      domainAPI.getByName = sinon.stub().returns($q.when());

      var controller = initController();

      controller.uniqueDomainName(domainName)
        .then(function() {
          expect(domainAPI.getByName).to.have.been.calledWith(domainName);
          done();
        });

      $scope.$digest();
    });
  });

  describe('The isEmailAvailable method', function() {
    it('should call esnAvailabilityService to get email availability', function(done) {
      var controller = initController();

      esnAvailabilityService.checkEmailAvailability = sinon.stub().returns($q.when({ available: true }));

      controller.isEmailAvailable()
        .then(function(availability) {
          expect(esnAvailabilityService.checkEmailAvailability).to.have.been.called;
          expect(availability).to.be.true;

          done();
        });

      $scope.$digest();
    });
  });
});
