(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .controller('adminOauthController', function($stateParams, adminDomainConfigService, asyncAction, _, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS) {
    var self = this;
    var domainId = $stateParams.domainId;
    var CONFIG_NAME = 'oauth';

    self.$onInit = $onInit;
    self.save = save;
    self.status = ADMIN_LOADING_STATUS.loading;

    function $onInit() {
      self.enabledOauths = {};
      adminDomainConfigService.get(domainId, CONFIG_NAME)
        .then(function(config) {
          self.config = config;
          self.status = ADMIN_LOADING_STATUS.loaded;

          _.forEach(self.config, function(value, key) {
            self.enabledOauths[key] = !_.isEmpty(value);
          });
        })
        .catch(function() {
          self.status = ADMIN_LOADING_STATUS.error;
        });
    }

    function save() {
      _qualifyConfig(self.config);

      return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration);
    }

    function _qualifyConfig(config) {
      _.forEach(self.enabledOauths, function(value, key) {
        if (!self.enabledOauths[key]) {
          delete config[key];
        }
      });
    }

    function _saveConfiguration() {
      return adminDomainConfigService.set(domainId, CONFIG_NAME, self.config);
    }
  });
})(angular);
