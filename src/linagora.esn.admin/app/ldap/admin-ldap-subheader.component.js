'use strict';

angular.module('linagora.esn.admin')

.component('adminLdapSubheader', {
  template: require("./admin-ldap-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
