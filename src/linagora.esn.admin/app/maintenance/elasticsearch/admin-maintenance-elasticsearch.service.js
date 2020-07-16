'use strict';

require('../../common/admin-restangular.service.js');

angular.module('linagora.esn.admin')

  .factory('adminMaintenanceElasticsearchService', adminMaintenanceElasticsearchService);

function adminMaintenanceElasticsearchService(asyncAction, adminRestangular) {
  var ACTIONS = {
    reindex: 'reindex',
    reconfigure: 'reconfigure'
  };

  return {
    getRegisteredResourceTypes: getRegisteredResourceTypes,
    reindex: reindex,
    reconfigure: reconfigure
  };

  function reindex(type) {
    var notificationMessages = {
      progressing: 'Submitting reindexing ' + type + ' request...',
      success: 'Request submitted',
      failure: 'Failed to submit request'
    };

    return asyncAction(notificationMessages, function() {
      var queryParams = {
        action: ACTIONS.reindex,
        resource_type: type
      };

      return _maintainElasticsearch(queryParams);
    });
  }

  function reconfigure(type) {
    var notificationMessages = {
      progressing: 'Submitting reconfiguration ' + type + ' index request...',
      success: 'Request submitted',
      failure: 'Failed to submit request'
    };

    return asyncAction(notificationMessages, function() {
      var queryParams = {
        action: ACTIONS.reconfigure,
        resource_type: type
      };

      return _maintainElasticsearch(queryParams);
    });
  }

  function getRegisteredResourceTypes() {
    return adminRestangular
      .all('maintenance')
      .one('elasticsearch')
      .get();
  }

  function _maintainElasticsearch(queryParams) {
    return adminRestangular
      .all('maintenance')
      .one('elasticsearch')
      .post(null, null, queryParams);
  }
}
