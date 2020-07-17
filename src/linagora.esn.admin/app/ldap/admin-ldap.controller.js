'use strict';

const _ = require('lodash');

require('../common/config/admin-domain-config.service.js');
require('../app.constants.js');

angular.module('linagora.esn.admin')

  .controller('adminLdapController', function($stateParams, $element, $timeout, elementScrollService, adminDomainConfigService, asyncAction, ADMIN_DEFAULT_NOTIFICATION_MESSAGES, ADMIN_LOADING_STATUS) {
    var self = this;
    var domainId = $stateParams.domainId;
    var CONFIG_NAME = 'ldap';

    self.$onInit = $onInit;
    self.save = save;
    self.addForm = addForm;
    self.showEmptyMessage = showEmptyMessage;
    self.status = ADMIN_LOADING_STATUS.loading;

    function $onInit() {
      adminDomainConfigService.get(domainId, CONFIG_NAME)
        .then(function(data) {
          if (!data) {
            self.configs = [];
          } else if (!_.isArray(data)) {
            self.configs = [data];
          } else {
            self.configs = data;
          }
          self.status = ADMIN_LOADING_STATUS.loaded;
        })
        .catch(function() {
          self.status = ADMIN_LOADING_STATUS.error;
        });
    }

    function save() {
      var configs = _qualifyConfigs();

      return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, function() {
        return _saveConfiguration(configs);
      })
        .then(function() {
          self.configs = configs;
        });
    }

    function addForm() {
      var newLdapConfig = {};

      self.configs.push(newLdapConfig);
      $timeout(function() {
        var lastAdminLdapForm = _.last($element.find('admin-ldap-form'));

        elementScrollService.scrollDownToElement($(lastAdminLdapForm));
      }, 0);
    }

    function showEmptyMessage(ldapConfigs) {
      if (!ldapConfigs) {
        return true;
      }

      return !ldapConfigs.some(function(ldapConfig) {
        return ldapConfig.name || !ldapConfig.deleted;
      });
    }

    function _qualifyConfigs() {
      var currentConfigs = self.configs;

      if (currentConfigs && currentConfigs.length) {
        return currentConfigs.filter(function(configObject) {
          if (configObject && configObject.name && !configObject.deleted) {
            delete configObject.deleted;

            return configObject;
          }
        });
      }
    }

    function _saveConfiguration(configs) {
      return adminDomainConfigService.set(domainId, CONFIG_NAME, configs);
    }
  });
