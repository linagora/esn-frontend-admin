'use strict';

require('../app.constants.js');
require('./admin-features.service.js');
require('../common/config/admin-domain-config.service.js');

angular.module('linagora.esn.admin')
  .controller('adminFeaturesController', adminFeaturesController);

function adminFeaturesController(
  $stateParams,
  asyncAction,
  adminFeaturesService,
  adminDomainConfigService,
  ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
  ADMIN_LOADING_STATUS
) {
  var self = this;
  var domainId = $stateParams.domainId;
  var CONFIG_NAME = 'features';

  self.$onInit = $onInit;
  self.save = save;
  self.status = ADMIN_LOADING_STATUS.loading;

  function $onInit() {
    adminDomainConfigService.get(domainId, CONFIG_NAME)
      .then(function(config) {
        self.features = adminFeaturesService.includeFeaturesMetadata(config);
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
    var featuresConfig = adminFeaturesService.getFeaturesConfigValue(self.features);

    return adminDomainConfigService.set(domainId, CONFIG_NAME, featuresConfig);
  }
}
