'use strict';

require('./admin-autoconf.constants.js');
require('./admin-autoconf.service.js');
require('../common/config/admin-domain-config.service.js');

angular.module('linagora.esn.admin')
  .controller('adminAutoconfController', adminAutoconfController);

function adminAutoconfController($stateParams, adminDomainConfigService, adminAutoconfService, asyncAction, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS, ADMIN_AUTOCONF_SOCKET_TYPES) {
  var self = this;
  var domainId = $stateParams.domainId;

  self.$onInit = $onInit;
  self.save = save;
  self.status = ADMIN_LOADING_STATUS.loading;

  function $onInit() {
    adminDomainConfigService.get(domainId, 'autoconf')
      .then(function(data) {
        self.account = data && data.accounts && data.accounts.length && data.accounts[0];
        self.ADMIN_AUTOCONF_SOCKET_TYPES = ADMIN_AUTOCONF_SOCKET_TYPES;
        self.status = ADMIN_LOADING_STATUS.loaded;
      })
      .catch(function() {
        self.status = ADMIN_LOADING_STATUS.error;
      });
  }

  function save() {
    return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration);
  }

  function _saveConfiguration() {
    return adminAutoconfService.save(domainId, self.account);
  }
}
