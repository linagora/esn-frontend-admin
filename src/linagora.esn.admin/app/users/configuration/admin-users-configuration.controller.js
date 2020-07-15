(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('AdminUsersConfigurationController', AdminUsersConfigurationController);

  function AdminUsersConfigurationController(
    $stateParams,
    _,
    asyncAction,
    adminDomainConfigService,
    ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
    ADMIN_LOADING_STATUS
  ) {
    var self = this;
    var domainId = $stateParams.domainId;
    var originConfigs;

    self.$onInit = $onInit;
    self.save = save;
    self.status = ADMIN_LOADING_STATUS.loading;

    function $onInit() {
      adminDomainConfigService.getMultiple(domainId, ['membersCanBeSearched'])
        .then(function(data) {
          originConfigs = angular.copy(data);
          self.configs = data;
          self.configs.membersCanBeSearched = self.configs.membersCanBeSearched !== false; // membersCanBeSearched is enabled if there's no config for it.
          self.status = ADMIN_LOADING_STATUS.loaded;
        })
        .catch(function() {
          self.status = ADMIN_LOADING_STATUS.error;
        });
    }

    function save() {
      return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration).catch(function() {
        self.configs = angular.copy(originConfigs);
      });
    }

    function _saveConfiguration() {
      var qualifiedConfigs = _qualifyConfigs(self.configs);

      return adminDomainConfigService.setMultiple(domainId, qualifiedConfigs);
    }

    function _qualifyConfigs(configs) {
      var qualifiedConfigs = [];

      _.forEach(configs, function(value, key) {
        qualifiedConfigs.push({ name: key, value: value });
      });

      return qualifiedConfigs;
    }
  }

})(angular);
