(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminMaintenance', {
      template: require('./admin-maintenance.pug'),
      controller: 'adminMaintenanceController'
    });
})(angular);
