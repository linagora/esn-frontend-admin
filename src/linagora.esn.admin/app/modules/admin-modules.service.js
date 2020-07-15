'use strict';

angular.module('linagora.esn.admin')

.factory('adminModulesService', function($q, adminConfigApi, esnModuleRegistry, _, ADMIN_MODE) {
  return {
    get: get,
    set: set
  };

  function get(domainId) {
    var inPlatformMode = domainId === ADMIN_MODE.platform;
    var modulesMetadata = cloneModulesMetadata();
    var modulesThatHasConfig = _.values(modulesMetadata)
      .filter(function(module) {
        return moduleHasConfig(inPlatformMode, module);
      })
      .map(function(module) {
        return module.id;
      });

    return adminConfigApi
      .inspect(domainId, modulesThatHasConfig)
      .then(function(modules) {
        modules.forEach(function(module) {
          modulesMetadata[module.name].config.configurations = module.configurations;
        });

        return modulesMetadata;
      });
  }

  function moduleHasConfig(inPlatformMode, module) {
    if (inPlatformMode) {
      return module.config && module.config.displayIn.platform;
    }

    return module.config && module.config.displayIn.domain;
  }

  function set(domainId, modules) {
    var configsToSet = modules.map(function(module) {
      var writableConfigs = module.config.configurations
        .filter(function(config) {
          return config.writable && angular.isDefined(config.value);
        })
        .map(function(config) {
          return {
            name: config.name,
            value: config.value
          };
        });

      return {
        name: module.id,
        configurations: writableConfigs
      };
    });

    var hasConfigToSet = configsToSet.some(function(config) {
      return config.configurations.length > 0;
    });

    if (hasConfigToSet) {
      return adminConfigApi.set(domainId, configsToSet);
    }

    return $q.when();
  }

  function cloneModulesMetadata() {
    return _.cloneDeep(esnModuleRegistry.getAll());
  }
});
