'use strict';

const _ = require('lodash');

require('../app.constants.js');
require('../common/mode/admin-mode.service.js');

angular.module('linagora.esn.admin')
  .controller('adminGeneralController', adminGeneralController);

function adminGeneralController(
  $stateParams,
  adminDomainConfigService,
  asyncAction,
  adminModeService,
  homePageService,
  ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
  ADMIN_LOADING_STATUS
) {
  var self = this;
  var CONFIGURATIONS_LIST = {
    domain: ['homePage', 'businessHours', 'datetime', 'language'],
    platform: ['homePage', 'businessHours', 'datetime']
  };

  self.$onInit = $onInit;
  self.save = save;
  self.status = ADMIN_LOADING_STATUS.loading;

  function $onInit() {
    adminDomainConfigService.getMultiple(
      $stateParams.domainId,
      adminModeService.isPlatformMode() ? CONFIGURATIONS_LIST.platform : CONFIGURATIONS_LIST.domain
    )
      .then(function(data) {
        self.mode = adminModeService.getCurrentMode();
        self.configs = data;
        self.status = ADMIN_LOADING_STATUS.loaded;
        self.mode = adminModeService.getCurrentMode();
      })
      .catch(function() {
        self.status = ADMIN_LOADING_STATUS.error;
      });

    self.homePages = homePageService.getHomePageCandidates();
  }

  function save() {
    return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration);
  }

  function _saveConfiguration() {
    var qualifiedConfigs = _qualifyConfigs(self.configs);

    return adminDomainConfigService.setMultiple($stateParams.domainId, qualifiedConfigs);
  }

  function _qualifyConfigs(configs) {
    var qualifiedConfigs = [];

    _.forEach(configs, function(value, key) {
      qualifiedConfigs.push({ name: key, value: value });
    });

    return qualifiedConfigs;
  }
}
