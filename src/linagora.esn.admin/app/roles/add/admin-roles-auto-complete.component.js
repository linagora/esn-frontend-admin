'use strict';

angular.module('linagora.esn.admin')

.component('adminRolesAutoComplete', {
  template: require("./admin-roles-auto-complete.pug"),
  controller: 'adminRolesAutoCompleteController',
  bindings: {
    newAdministrators: '='
  }
});
