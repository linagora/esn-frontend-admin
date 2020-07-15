'use strict';

angular.module('linagora.esn.admin')

.component('adminUsersCreateSubheader', {
  template: require("./admin-users-create-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
