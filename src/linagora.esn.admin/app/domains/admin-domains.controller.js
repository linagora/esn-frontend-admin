(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminDomainsController', adminDomainsController);

  function adminDomainsController($modal) {
    var self = this;

    self.openCreateForm = openCreateForm;

    function openCreateForm() {
      $modal({
        template: require('./create/admin-domains-create.pug'),
        backdrop: 'static',
        placement: 'center',
        controllerAs: '$ctrl',
        controller: 'adminDomainsCreateController'
      });
    }
  }
})(angular);
