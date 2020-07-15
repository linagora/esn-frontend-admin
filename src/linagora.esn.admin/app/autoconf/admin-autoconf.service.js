(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .factory('adminAutoconfService', adminAutoconfService);

  function adminAutoconfService(adminRestangular) {
    return {
      save: save
    };

    function save(domainId, config) {
      return adminRestangular.all('autoconf').customPUT(config, '', { domain_id: domainId });
    }
  }
})(angular);
