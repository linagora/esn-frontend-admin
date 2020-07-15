(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminMaintenanceController', adminMaintenanceController);

  function adminMaintenanceController(adminMaintenanceService, adminModeService) {
    var self = this;

    self.$onInit = $onInit;

    function $onInit() {
      self.mode = adminModeService.getCurrentMode();
      self.maintenanceModules = adminMaintenanceService.getMaintenanceModules().filter(function(module) {
        return module.maintenance.displayIn[self.mode];
      });
    }
  }
})(angular);
