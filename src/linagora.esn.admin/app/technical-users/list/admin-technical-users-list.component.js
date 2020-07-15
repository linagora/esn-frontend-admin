(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminTechnicalUsersList', {
    template: require("./admin-technical-users-list.pug"),
    controller: 'adminTechnicalUsersListController'
  });

})(angular);
