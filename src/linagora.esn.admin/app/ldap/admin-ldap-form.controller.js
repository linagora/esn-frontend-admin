'use strict';

require('./admin-ldap-form.constant.js');

angular.module('linagora.esn.admin')
  .controller('adminLdapFormController', function($stateParams, ADMIN_LDAP_MAPPING) {
    var self = this;

    self.$onInit = $onInit;
    self.domainId = $stateParams.domainId;
    self.AVAILABLE_KEYS = ADMIN_LDAP_MAPPING;
    self.usernameField = usernameFieldGetter;

    function $onInit() {
      var defaultUsageConfig = {
        auth: true,
        search: true,
        autoProvisioning: true
      };

      self.ldapConfig.configuration = self.ldapConfig.configuration || {};
      self.ldapConfig.usage = self.ldapConfig.usage || defaultUsageConfig;

      adaptUsageConfig(self.ldapConfig.usage);
    }

    function adaptUsageConfig(usageConfig) {
      var verifiedUsageConfig = usageConfig;

      if (verifiedUsageConfig.autoProvisioning === undefined) {
        verifiedUsageConfig.autoProvisioning = true;
      }
    }

    self.delete = function(form) {
      self.ldapConfig.deleted = true;
      form.$setDirty();
    };

    self.undo = function() {
      self.ldapConfig.deleted = false;
    };

    function usernameFieldGetter(usernameField) {
      if (arguments.length) {
        usernameField = usernameField || '';

        self.ldapConfig.configuration.searchFilter = '(' + usernameField + '={{username}})';

        return usernameField;
      }

      return getUsernameField(self.ldapConfig.configuration.searchFilter);
    }

    function getUsernameField(ldapSearchFilter) {
      var matches = ldapSearchFilter && ldapSearchFilter.match(/\((.*)=\{\{username\}\}\)/);

      return matches ? matches[1] : null;
    }
  });
