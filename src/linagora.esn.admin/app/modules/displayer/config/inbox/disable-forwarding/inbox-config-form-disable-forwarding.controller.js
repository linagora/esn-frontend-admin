'use strict';

require('../inbox-config-form.constants');

angular.module('linagora.esn.admin')
  .controller('InboxConfigFormDisableForwardingController', InboxConfigFormDisableForwardingController);

function InboxConfigFormDisableForwardingController($rootScope, INBOX_CONFIG_EVENTS) {
  this.cancelBtnClick = cancelBtnClick;

  function cancelBtnClick() {
    $rootScope.$broadcast(INBOX_CONFIG_EVENTS.DISABLE_FORWARDING_CANCELLED);
  }
}
