'use strict';

angular.module('linagora.esn.admin')

.component('adminLdap', {
  template: require("./admin-ldap.pug"),
  controller: 'adminLdapController'
});
