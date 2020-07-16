const _ = require('lodash');

require('./admin-modules.service.js');
require('../common/config/admin-domain-config.service.js');
require('../app.constants.js');

'use strict';

angular.module('linagora.esn.admin')

  .controller('adminModulesController', function(
    $stateParams,
    adminModulesService,
    adminDomainConfigService,
    ADMIN_LOADING_STATUS
  ) {
    var self = this;
    var domainId = $stateParams.domainId;
    var MODULES_KEY = 'modules';

    self.$onInit = $onInit;
    self.saveModuleEnabledState = saveModuleEnabledState;

    function $onInit() {
      self.status = ADMIN_LOADING_STATUS.loading;

      adminModulesService.get(domainId)
        .then(setModuleEnabledState)
        .then(function(modules) {
          self.modules = modules;
          self.status = ADMIN_LOADING_STATUS.loaded;
        })
        .catch(function() {
          self.status = ADMIN_LOADING_STATUS.error;
        });

      function setModuleEnabledState(modules) {
        return adminDomainConfigService.get(domainId, MODULES_KEY).then(function(modulesConfig) {
          _.forEach(modules, function(module) {
            var predicate = { id: module.id };
            var moduleConfig = _.find(modulesConfig, predicate) || {};

            if (_.has(moduleConfig, 'enabled')) {
              module.enabled = moduleConfig.enabled;
            } else if (_.has(module, 'isDisplayedByDefault')) {
              module.enabled = module.isDisplayedByDefault;
            } else {
              module.enabled = undefined;
            }

          });

          return modules;
        });
      }
    }

    function saveModuleEnabledState(module, value) {
      return adminDomainConfigService.get(domainId, MODULES_KEY)
        .then(function(modulesConfig) {
          modulesConfig = modulesConfig || [];

          var predicate = { id: module.id };
          var moduleConfig = _.find(modulesConfig, predicate) || predicate;

          if (!_.find(modulesConfig, predicate)) {
            modulesConfig.push(moduleConfig);
          }

          moduleConfig.enabled = value;

          return adminDomainConfigService.set(domainId, MODULES_KEY, modulesConfig);
        });
    }
  });
