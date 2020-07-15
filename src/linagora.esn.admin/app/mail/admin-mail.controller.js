'use strict';

angular.module('linagora.esn.admin')

.constant('ADMIN_MAIL_TRANSPORT_TYPES', { local: 'Local', smtp: 'SMTP', gmail: 'Gmail' })

.controller('adminMailController', function($stateParams, adminDomainConfigService, adminMailService, asyncAction, ADMIN_MAIL_TRANSPORT_TYPES, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS) {
  var self = this;
  var domainId = $stateParams.domainId;
  var CONFIG_NAME = 'mail';

  self.transportTypes = ADMIN_MAIL_TRANSPORT_TYPES;
  self.status = ADMIN_LOADING_STATUS.loading;

  adminDomainConfigService.get(domainId, CONFIG_NAME)
    .then(function(data) {
      self.config = data || {};
      self.transportType = adminMailService.getTransportType(self.config);
      self.status = ADMIN_LOADING_STATUS.loaded;
    })
    .catch(function() {
      self.status = ADMIN_LOADING_STATUS.error;
    });

  self.save = function() {
    var config = adminMailService.qualifyTransportConfig(self.transportType, self.config);

    return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, function() {
      return _saveConfiguration(config);
    });
  };

  function _saveConfiguration(config) {
    return adminDomainConfigService.set(domainId, CONFIG_NAME, config);
  }
});
