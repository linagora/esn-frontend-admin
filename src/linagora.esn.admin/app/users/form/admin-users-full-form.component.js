'use strict';

angular.module('linagora.esn.admin')

.component('adminUsersFullForm', {
  template: require("./admin-users-full-form.pug"),
  controller: 'adminUsersFullFormController',
  bindings: {
    user: '<'
  }
});
