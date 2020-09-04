'use strict';

angular.module('linagora.esn.admin')

  .component('adminLdapForm', {
    template: require('./admin-ldap-form.pug'),
    controller: 'adminLdapFormController',
    bindings: {
      ldapConfig: '='
    }
  });
