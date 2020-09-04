(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminTechnicalUsers', {
      template: require('./admin-technical-users.pug'),
      controller: 'adminTechnicalUsersController'
    });

})(angular);
