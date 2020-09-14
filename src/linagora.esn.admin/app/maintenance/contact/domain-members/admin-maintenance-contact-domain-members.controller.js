'use strict';

const contactApi = require('esn-api-client/src/api/contact');

angular.module('linagora.esn.admin')
  .controller('adminMaintenanceContactDomainMembersController', adminMaintenanceContactDomainMembersController);

function adminMaintenanceContactDomainMembersController(
  $stateParams,
  asyncAction,
  esnApiClient
) {
  const self = this;
  const contactApiClient = contactApi.default(esnApiClient);
  const notificationMessages = {
    progressing: 'Submitting request...',
    success: 'Request submitted',
    failure: 'Failed to submit request'
  };

  self.onSyncBtnClick = onSyncBtnClick;
  self.$onInit = $onInit;

  function $onInit() {
    self.domainId = $stateParams.domainId === 'platform' || !$stateParams.domainId ? '' : $stateParams.domainId;
  }

  function onSyncBtnClick() {
    return asyncAction(notificationMessages, function() {
      if (self.domainId) {
        return contactApiClient.domainMemberAddressbook.synchronizeForDomain(self.domainId);
      }

      return contactApiClient.domainMemberAddressbook.synchronize();
    });
  }
}
