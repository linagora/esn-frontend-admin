'use strict';

angular.module('linagora.esn.admin')

  .component('adminRolesAdministratorListItem', {
    template: require('./admin-roles-administrator-list-item.pug'),
    bindings: {
      user: '='
    },
    controller: 'adminRolesAdministratorListItem'
  });
