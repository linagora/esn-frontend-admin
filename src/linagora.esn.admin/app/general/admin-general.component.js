(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminGeneral', {
      template: require("./admin-general.pug"),
      controller: 'adminGeneralController'
    });
})(angular);
