(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminDomainsFormHostnames', {
      template: require('./admin-domains-form-hostnames.pug'),
      bindings: {
        domain: '=',
        form: '<'
      },
      controller: 'adminDomainsHostnamesController'
    });
})(angular);
