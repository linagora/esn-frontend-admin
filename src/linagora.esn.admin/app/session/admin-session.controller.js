'use strict';

require('../common/config/admin-domain-config.service.js');
require('../app.constants.js');

angular.module('linagora.esn.admin')

  .controller('adminSessionController', function(
    $stateParams,
    adminDomainConfigService,
    asyncAction,
    ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
    ADMIN_LOADING_STATUS
  ) {
    var self = this;
    var domainId = $stateParams.domainId;
    var CONFIG_NAME = 'session';

    self.status = ADMIN_LOADING_STATUS.loading;

    adminDomainConfigService.get(domainId, CONFIG_NAME)
      .then(function(data) {
        self.config = data;
        self.status = ADMIN_LOADING_STATUS.loaded;
      })
      .catch(function() {
        self.status = ADMIN_LOADING_STATUS.error;
      });

    self.save = function() {
      return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration);
    };

    function _saveConfiguration() {
      return adminDomainConfigService.set(domainId, CONFIG_NAME, self.config);
    }
  });
