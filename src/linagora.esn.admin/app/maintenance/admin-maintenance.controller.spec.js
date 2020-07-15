'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminMaintenanceController', function() {
  var $controller, $rootScope, $scope;
  var adminMaintenanceService, adminModeService;

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _adminMaintenanceService_, _adminModeService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminMaintenanceService = _adminMaintenanceService_;
      adminModeService = _adminModeService_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminMaintenanceController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should get a filtered modules list based on current admin mode', function() {
      var maintenanceModules = [{
        title: 'foo',
        maintenance: {
          displayIn: { domain: true }
        }
      }, {
        title: 'bar',
        maintenance: {
          displayIn: { domain: false }
        }
      }];

      adminMaintenanceService.getMaintenanceModules = sinon.stub().returns(maintenanceModules);
      adminModeService.getCurrentMode = sinon.stub().returns('domain');

      var controller = initController();

      expect(controller.maintenanceModules).to.include(maintenanceModules[0]);
      expect(controller.maintenanceModules).to.not.include(maintenanceModules[1]);
      expect(adminMaintenanceService.getMaintenanceModules).to.have.been.calledOnce;
      expect(adminModeService.getCurrentMode).to.have.been.calledOnce;
    });
  });
});
