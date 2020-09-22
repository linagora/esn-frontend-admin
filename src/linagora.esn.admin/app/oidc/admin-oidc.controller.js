const { last, isEmpty } = require('lodash');
const CONFIG_NAME = 'openid-connect';

require('../common/config/admin-domain-config.service.js');

angular.module('linagora.esn.admin').controller('adminOidcController', adminOidcController);

function adminOidcController($element, $timeout, elementScrollService, asyncAction, adminDomainConfigService, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS, ADMIN_MODE) {
  const self = this;

  self.$onInit = $onInit;
  self.save = save;
  self.addForm = addForm;
  self.showEmptyMessage = showEmptyMessage;
  self.status = ADMIN_LOADING_STATUS.loading;

  function $onInit() {
    adminDomainConfigService.get(ADMIN_MODE.platform, CONFIG_NAME)
      .then(data => {
        self.configs = data && data.clients || [];
        self.status = ADMIN_LOADING_STATUS.loaded;
      })
      .catch(() => {
        self.status = ADMIN_LOADING_STATUS.error;
      });
  }

  function save() {
    const configs = _qualifyConfigs();

    return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, () => _saveConfiguration(configs))
      .then(() => {
        self.configs = configs;
      });
  }

  function addForm() {
    const newOidcConfig = {};

    self.configs.push(newOidcConfig);

    $timeout(() => {
      elementScrollService.scrollDownToElement($(last($element.find('admin-oidc-form'))));
    }, 0);
  }

  function showEmptyMessage(oidcConfigs) {
    if (!oidcConfigs) {
      return true;
    }

    return !oidcConfigs.some(oidcConfigs => oidcConfigs.client_id || !oidcConfigs.deleted);
  }

  function _qualifyConfigs() {
    return (self.configs || [])
      .filter(oidc => !isEmpty(oidc))
      .filter(oidc => !oidc.deleted)
      .map(oidc => ({
        client_id: oidc.client_id,
        client_secret: oidc.client_secret,
        issuer_url: oidc.issuer_url
      }));
  }

  function _saveConfiguration(configs) {
    return adminDomainConfigService.set(ADMIN_MODE.platform, CONFIG_NAME, { clients: configs });
  }
}
