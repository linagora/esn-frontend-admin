'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminAutoconfController', function() {

  var $controller, $rootScope, $stateParams, $scope;
  var adminDomainConfigService, adminAutoconfService;
  var config;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_, _adminAutoconfService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      adminAutoconfService = _adminAutoconfService_;

      $stateParams.domainId = 'domain123';
      config = {
        addons: [],
        accounts: [
          {
            foo: 'bar'
          }
        ]
      };
    });

  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminAutoconfController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should get the first account from the full configuration', function() {
      adminDomainConfigService.get = sinon.stub().returns($q.when(config));

      var controller = initController();

      expect(controller.account).to.deep.equal(config.accounts[0]);
    });
  });

  describe('The save function', function() {
    it('should call adminAutoconfService.save to save configuration', function(done) {
      adminAutoconfService.save = sinon.stub().returns($q.when());
      adminDomainConfigService.get = function() { return $q.when(config); };

      var controller = initController();

      controller.save().then(function() {
        expect(adminAutoconfService.save).to.have.been.calledWith($stateParams.domainId, controller.account);
        done();
      }).catch(done);

      $scope.$digest();
    });
  });
});
