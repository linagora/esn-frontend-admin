'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The adminMaintenanceController', function() {
  let $controller, $rootScope, $scope;
  let adminModeService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _adminModeService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminModeService = _adminModeService_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    const controller = $controller('adminMaintenanceController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should get current  mode', function() {
      const mode = 'domain';

      adminModeService.getCurrentMode = sinon.stub().returns(mode);

      const controller = initController();

      expect(controller.mode).to.equal(mode);
      expect(adminModeService.getCurrentMode).to.have.been.calledOnce;
    });
  });
});
