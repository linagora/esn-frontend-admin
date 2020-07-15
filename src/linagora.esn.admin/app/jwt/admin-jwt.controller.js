'use strict';

angular.module('linagora.esn.admin')

.controller('adminJwtController', function(
  $stateParams,
  asyncAction,
  esnFileSaver,
  adminConfigApi,
  adminDomainConfigService,
  ADMIN_JWT_AVAILABLE_ALGORITHMS,
  ADMIN_DEFAULT_NOTIFICATION_MESSAGES,
  ADMIN_LOADING_STATUS,
  ADMIN_JWT_DOWNLOAD_FILE_TYPE
) {
  var self = this;
  var domainId = $stateParams.domainId;
  var CONFIG_NAME = 'jwt';
  var notificationMessages = {
    progressing: 'Generating new keys...',
    success: 'Keys generated',
    failure: 'Failed to generate keys'
  };

  self.status = ADMIN_LOADING_STATUS.loading;

  adminDomainConfigService.get(domainId, CONFIG_NAME)
    .then(function(data) {
      self.config = data || {};
      self.status = ADMIN_LOADING_STATUS.loaded;
    }, function() {
      self.status = ADMIN_LOADING_STATUS.error;
    });

  self.availableAlgorithms = ADMIN_JWT_AVAILABLE_ALGORITHMS;

  self.save = function() {
    return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, _saveConfiguration);
  };

  self.downloadPublicKey = function() {
    esnFileSaver.saveText(self.config.publicKey, 'publicKey.txt', ADMIN_JWT_DOWNLOAD_FILE_TYPE);
  };

  self.downloadPrivateKey = function() {
    esnFileSaver.saveText(self.config.privateKey, 'privateKey.txt', ADMIN_JWT_DOWNLOAD_FILE_TYPE);
  };

  self.generate = function(form) {
    return asyncAction(notificationMessages, _generateKeyPair)
      .then(function(resp) {
        self.config.publicKey = resp.data.publicKey;
        self.config.privateKey = resp.data.privateKey;
        form.$setDirty();
      });
  };

  function _saveConfiguration() {
    return adminDomainConfigService.set(domainId, CONFIG_NAME, self.config);
  }

  function _generateKeyPair() {
    return adminConfigApi.generateJwtKeyPair();
  }
});
