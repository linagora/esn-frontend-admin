'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The AdminUsersConfigurationController', function() {

  var $rootScope, $stateParams, $scope, $controller;
  var adminDomainConfigService;
  var configurationsMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;

      $stateParams.domainId = 'domain123';
    });

    configurationsMock = { membersCanBeSearched: true };
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('AdminUsersConfigurationController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should get a list of configurations from server on init', function() {
      adminDomainConfigService.getMultiple = sinon.stub().returns($q.when(configurationsMock));
      var controller = initController();

      expect(controller.configs).to.deep.equal(configurationsMock);
      expect(adminDomainConfigService.getMultiple).to.have.been.calledWith($stateParams.domainId, ['membersCanBeSearched']);
    });
  });

  describe('The save fn', function() {
    it('should call adminDomainConfigService.setMultiple to save configuration', function() {
      adminDomainConfigService.getMultiple = function() {
        return $q.when(configurationsMock);
      };
      adminDomainConfigService.setMultiple = sinon.stub().returns($q.when());

      var controller = initController();

      controller.configs.membersCanBeSearched = false;
      var expectConfigsToUpdate = [{ name: 'membersCanBeSearched', value: false }];

      controller.save();
      $scope.$digest();

      expect(adminDomainConfigService.setMultiple).to.have.been.calledWith($stateParams.domainId, expectConfigsToUpdate);
    });
  });
});
