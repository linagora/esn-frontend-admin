'use strict';

require('../common/mode/admin-mode.service.js');

angular.module('linagora.esn.admin')
  .controller('adminMaintenanceController', adminMaintenanceController);

function adminMaintenanceController(adminModeService) {
  var self = this;

  self.$onInit = $onInit;

  function $onInit() {
    self.mode = adminModeService.getCurrentMode();
  }
}
