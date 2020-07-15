(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminUsersConfiguration', {
      template: require("./admin-users-configuration.pug"),
      controller: 'AdminUsersConfigurationController'
    });
})(angular);
