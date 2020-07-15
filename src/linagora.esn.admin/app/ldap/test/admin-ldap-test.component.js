'use strict';

angular.module('linagora.esn.admin')

.component('adminLdapTest', {
  template: require("./admin-ldap-test.pug"),
  controller: 'adminLdapTestController',
  bindings: {
    domainId: '=',
    config: '<',
    disabled: '<'
  }
});
