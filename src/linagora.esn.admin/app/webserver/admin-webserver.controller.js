'use strict';

require('../common/config/admin-domain-config.service.js');
require('../app.constants.js');

angular.module('linagora.esn.admin')
  .controller('adminWebserverController', adminWebserverController);

function adminWebserverController(adminDomainConfigService, asyncAction, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS, ADMIN_MODE) {
  var self = this;
  var CONFIG_NAME = ['webserver', 'maxSizeUpload'];

  self.$onInit = $onInit;
  self.save = save;

  function $onInit() {
    self.status = ADMIN_LOADING_STATUS.loading;

    adminDomainConfigService.getMultiple(ADMIN_MODE.platform, CONFIG_NAME)
      .then(function(data) {
        self.config = data;
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
    return adminDomainConfigService.setMultiple(ADMIN_MODE.platform, [{ name: CONFIG_NAME[0], value: self.config.webserver }, { name: CONFIG_NAME[1], value: self.config.maxSizeUpload }]);
  }
}
