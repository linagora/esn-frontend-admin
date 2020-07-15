'use strict';

angular.module('linagora.esn.admin')

.component('adminUsersQuickForm', {
  template: require("./admin-users-quick-form.pug"),
  controller: 'adminUsersQuickFormController',
  bindings: {
    domainId: '='
  }
});
