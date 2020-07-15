(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminDomainsList', {
    template: require("./admin-domains-list.pug"),
    controller: 'adminDomainsListController'
  });
})(angular);
