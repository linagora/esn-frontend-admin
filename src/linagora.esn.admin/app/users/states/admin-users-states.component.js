(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminUsersStates', {
      template: require('./admin-users-states.pug'),
      bindings: {
        user: '='
      },
      controller: 'AdminUsersStatesController'
    });
})(angular);
