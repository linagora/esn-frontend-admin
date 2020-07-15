'use strict';

angular.module('linagora.esn.admin')

.controller('adminLdapTestController', function(adminTestConfigService) {
  var self = this;

  self.test = function() {
    self.message = { status: 'testing' };

    return _testConfiguration().then(function() {
      self.message = { status: 'success' };
    }, function(response) {
      var err = response.data.error;

      self.message = { status: 'error', msg: err.details };
    });
  };

  function _testConfiguration() {
    return adminTestConfigService.testAccessLdap(self.domainId, self.config);
  }
});
