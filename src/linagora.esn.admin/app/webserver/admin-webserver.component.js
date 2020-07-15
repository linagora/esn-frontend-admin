(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminWebserver', {
      template: require("./admin-webserver.pug"),
      controller: 'adminWebserverController'
    });
})(angular);
