(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminAutoconf', {
    template: require("./admin-autoconf.pug"),
    controller: 'adminAutoconfController'
  });
})(angular);
