'use strict';

require('../admin-restangular.service.js');
require('../../app.constants.js');

angular.module('linagora.esn.admin')

  .factory('adminConfigApi', adminConfigApi);

function adminConfigApi($q, adminRestangular, esnConfigApi, ADMIN_MODE) {
  return {
    get: get,
    set: set,
    inspect: inspect,
    generateJwtKeyPair: generateJwtKeyPair,
    generateJwtToken: generateJwtToken
  };

  function get(domainId, configsToGet) {
    if (!configsToGet.length) {
      return $q.when([]);
    }

    if (domainId !== ADMIN_MODE.platform) {
      return esnConfigApi.getDomainConfigurations(domainId, configsToGet);
    }

    return esnConfigApi.getPlatformConfigurations(configsToGet);
  }

  function set(domainId, configsToSet) {
    if (!configsToSet.length) {
      return $q.when();
    }

    if (domainId !== ADMIN_MODE.platform) {
      return esnConfigApi.setDomainConfigurations(domainId, configsToSet);
    }

    return esnConfigApi.setPlatformConfigurations(configsToSet);
  }

  function inspect(domainId, modules) {
    if (!modules.length) {
      return $q.when([]);
    }

    if (domainId !== ADMIN_MODE.platform) {
      return esnConfigApi.inspectDomainConfigurations(domainId, modules);
    }
    return esnConfigApi.inspectPlatformConfigurations(modules);
  }
  

  function generateJwtKeyPair() {
    return adminRestangular
      .all('configuration')
      .one('generateJwtKeyPair')
      .post();
  }

  function generateJwtToken() {
    return adminRestangular
      .all('configuration')
      .one('generateJwtToken')
      .post();
  }
}
