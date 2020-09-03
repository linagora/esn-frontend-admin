(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminLogin', {
      template: require('./admin-login.pug'),
      controller: 'adminLoginController'
    });
})(angular);
