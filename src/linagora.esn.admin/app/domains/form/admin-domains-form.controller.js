(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminDomainsFormController', adminDomainsFormController);

  function adminDomainsFormController($q, domainAPI, esnAvailabilityService) {
    var self = this;

    self.$onInit = $onInit;
    self.uniqueDomainName = uniqueDomainName;
    self.isEmailAvailable = isEmailAvailable;

    function $onInit() {
      if (!self.domain) {
        self.domain = {};
      }
    }

    function uniqueDomainName(domainName) {
      if (!domainName) {
        return $q.reject(new Error('Domain name required'));
      }

      return domainAPI.getByName(domainName)
        .then(function(domain) {
          if (domain) {
            return $q.reject(new Error('Domain already exists'));
          }
        });
    }

    function isEmailAvailable(email) {
      return esnAvailabilityService.checkEmailAvailability(email)
        .then(function(result) {
          return result.available;
        });
    }
  }
})(angular);
