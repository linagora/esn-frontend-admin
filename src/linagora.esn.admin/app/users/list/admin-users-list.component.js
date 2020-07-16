'use strict';

angular.module('linagora.esn.admin')

  .component('adminUsersList', {
    template: require("./admin-users-list.pug"),
    controller: 'adminUsersListController',
    bindings: {
      domainId: '='
    }
  });
