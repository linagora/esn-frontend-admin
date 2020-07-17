'use strict';

angular.module('linagora.esn.admin')

  .component('adminModules', {
    template: require("./admin-modules.pug"),
    controller: 'adminModulesController'
  });
