(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .factory('adminMaintenanceService', adminMaintenanceService);

  function adminMaintenanceService(esnModuleRegistry) {
    return {
      getMaintenanceModules: getMaintenanceModules
    };

    function getMaintenanceModules() {
      var maintenanceModules = [];

      angular.forEach(esnModuleRegistry.getAll(), function(module) {
        if (module.maintenance) {
          maintenanceModules.push(module);
        }
      });

      return maintenanceModules;
    }
  }
})(angular);
