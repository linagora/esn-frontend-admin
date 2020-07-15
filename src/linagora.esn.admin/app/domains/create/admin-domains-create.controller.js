(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminDomainsCreateController', adminDomainsCreateController);

  function adminDomainsCreateController(adminDomainsService) {
    var self = this;

    self.create = create;

    function create() {
      return adminDomainsService.create(self.domain);
    }
  }

})(angular);
