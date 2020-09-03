'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminLdapTestController', function() {
  var $controller, $rootScope, $scope;
  var adminTestConfigService;
  var DOMAIN_ID = 'domain123';
  var ldapConfigMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _adminTestConfigService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminTestConfigService = _adminTestConfigService_;
    });

    ldapConfigMock = {};
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminLdapTestController', { $scope: $scope }, { domainId: DOMAIN_ID, ldapConfig: ldapConfigMock });

    $scope.$digest();

    return controller;
  }

  describe('The test fn', function() {
    it('should set message.status is error if failed to connect to LDAP server', function(done) {
      var controller = initController();

      adminTestConfigService.testAccessLdap = sinon.stub().returns($q.reject({ data: { error: { details: 'Something error' } } }));

      var expectMessage = {
        status: 'error',
        msg: 'Something error'
      };

      controller.test().then(function() {
        expect(adminTestConfigService.testAccessLdap).to.have.been.calledWith(controller.domainId, controller.config);
        expect(controller.message).to.deep.equal(expectMessage);
        done();
      });

      $scope.$digest();
    });

    it('should set message.status is success if test access successfully to ldap server', function(done) {
      var controller = initController();

      adminTestConfigService.testAccessLdap = sinon.stub().returns($q.when());

      var expectMessage = {
        status: 'success'
      };

      controller.test().then(function() {
        expect(adminTestConfigService.testAccessLdap).to.have.been.calledWith(controller.domainId, controller.config);
        expect(controller.message).to.deep.equal(expectMessage);
        done();
      });

      $scope.$digest();
    });
  });
});
