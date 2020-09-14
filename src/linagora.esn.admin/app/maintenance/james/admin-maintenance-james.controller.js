'use strict';

const jamesApi = require('esn-api-client/src/api/james');

angular.module('linagora.esn.james')
  .controller('adminMaintenanceJamesController', adminMaintenanceJamesController);

function adminMaintenanceJamesController(
  asyncAction,
  esnApiClient
) {
  const self = this;
  const jamesApiClient = jamesApi.default(esnApiClient);

  self.synchronizeDomains = synchronizeDomains;

  function synchronizeDomains() {
    const notificationMessages = {
      progressing: 'Synchronizing domains...',
      success: 'Domains synchronized',
      failure: 'Failed to synchronize domains'
    };

    return asyncAction(notificationMessages, function() {
      return jamesApiClient.syncDomains();
    });
  }
}
