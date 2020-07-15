(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminDomains', {
    template: require("./admin-domains.pug"),
    controller: 'adminDomainsController'
  });
})(angular);
