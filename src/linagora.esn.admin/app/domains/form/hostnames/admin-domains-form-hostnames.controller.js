(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminDomainsHostnamesController', adminDomainsHostnamesController);

  function adminDomainsHostnamesController($q, domainAPI) {
    var self = this;

    self.$onInit = $onInit;
    self.addHostname = addHostname;
    self.deleteHostname = deleteHostname;
    self.ensureUniqueHostname = ensureUniqueHostname;
    self.qualifyHostnames = qualifyHostnames;

    function $onInit() {
      self.hostnames = (self.domain.hostnames || []).map(function(hostname) {
        return { name: hostname };
      });
    }

    function qualifyHostnames() {
      self.domain.hostnames = self.hostnames.map(function(hostname) {
        return hostname.name;
      });
    }

    function addHostname() {
      self.hostnames.push({ name: '' });
    }

    function deleteHostname(index) {
      self.hostnames.splice(index, 1);
      self.qualifyHostnames();
    }

    function ensureUniqueHostname(hostname) {
      if (!hostname) {
        return $q.reject(new Error('Hostname is required'));
      }

      if (!self.form.$dirty) {
        return $q.resolve();
      }

      var isUsedByThisDomain = self.hostnames.some(function(domainHostname) { return hostname === domainHostname.name; });

      if (isUsedByThisDomain) {
        return $q.reject(new Error('Hostname is already in use by this domain'));
      }

      return domainAPI.list({ hostname: hostname }).then(function(domainList) {
        var domain = domainList.data[0];

        if (domain && (domain.id !== self.domain.id)) {
          return $q.reject(new Error('Hostname is already in use by another domain'));
        }
      });
    }
  }
})(angular);

