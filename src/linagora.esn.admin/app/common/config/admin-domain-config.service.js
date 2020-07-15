(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .factory('adminDomainConfigService', adminDomainConfigService);

  function adminDomainConfigService(adminConfigApi, _) {
    var DEFAULT_MODULE = 'core';

    return {
      get: get,
      set: set,
      getMultiple: getMultiple,
      setMultiple: setMultiple
    };

    function get(domainId, key) {
      var keys = [key];

      return getMultiple(domainId, keys).then(function(configurations) {
        return configurations[key];
      });
    }

    function getMultiple(domainId, keys) {
      var query = [{
        name: DEFAULT_MODULE,
        keys: keys
      }];

      return adminConfigApi.get(domainId, query).then(function(modules) {
        var module = _.find(modules, { name: DEFAULT_MODULE });
        var configurations = {};

        if (module) {
          _.forEach(module.configurations, function(config) {
            configurations[config.name] = config.value;
          });
        }

        return configurations;
      });
    }

    function set(domainId, key, value) {
      var configurations = [{ name: key, value: value }];

      return setMultiple(domainId, configurations);
    }

    function setMultiple(domainId, configurations) {
      var query = [{
        name: DEFAULT_MODULE,
        configurations: configurations
      }];

      return adminConfigApi.set(domainId, query);
    }
  }
})(angular);
