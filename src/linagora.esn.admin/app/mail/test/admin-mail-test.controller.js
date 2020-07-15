'use strict';

angular.module('linagora.esn.admin')

.controller('adminMailTestController', function($stateParams, adminMailService, adminTestConfigService, $q) {
  var self = this;
  var domainId = $stateParams.domainId;

  self.test = function(form) {
    if (!self.isMailConfigValid) {
      self.message = { status: 'invalidMailConfig' };

      return $q.reject();
    }

    if (form && form.$valid) {
      var config = adminMailService.qualifyTransportConfig(self.transportType, self.config);

      self.message = { status: 'isSending' };

      return _testConfiguration(config).then(function(res) {
        self.message = { status: 'success', mailto: res.config.data.to };
      }, function(err) {
        self.message = { status: 'error', msg: err.data.error.details };
      });
    }

    return $q.reject();
  };

  function _testConfiguration(config) {
    return adminTestConfigService.testSendEmail(domainId, self.mailto, config);
  }
});
