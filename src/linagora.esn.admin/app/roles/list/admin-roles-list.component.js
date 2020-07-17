'use strict';

angular.module('linagora.esn.admin')

  .component('adminRolesList', {
    template: require("./admin-roles-list.pug"),
    bindings: {
      users: '=',
      template: '@',
      title: '@'
    }
  });
