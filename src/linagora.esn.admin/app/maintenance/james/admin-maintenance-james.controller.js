'use strict';

angular.module('linagora.esn.james')
  .controller('adminMaintenanceJamesController', adminMaintenanceJamesController);

function adminMaintenanceJamesController(
  asyncAction,
  jamesApiClient
) {
  const self = this;

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
