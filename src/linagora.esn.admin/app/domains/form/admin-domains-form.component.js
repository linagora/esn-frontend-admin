(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminDomainsForm', {
    template: require("./admin-domains-form.pug"),
    bindings: {
      updateMode: '<',
      domain: '='
    },
    controller: 'adminDomainsFormController'
  });
})(angular);
