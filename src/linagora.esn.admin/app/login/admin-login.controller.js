(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminLoginController', adminGeneralController);

  function adminGeneralController(
    $stateParams,
    adminDomainConfigService,
    asyncAction,
    ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
    ADMIN_LOADING_STATUS
  ) {
    var self = this;
    var domainId = $stateParams.domainId;

    self.$onInit = $onInit;
    self.save = save;
    self.status = ADMIN_LOADING_STATUS.loading;

    function $onInit() {
      adminDomainConfigService.get(domainId, 'login')
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
      return adminDomainConfigService.set(domainId, 'login', self.config);
    }
  }
})(angular);
