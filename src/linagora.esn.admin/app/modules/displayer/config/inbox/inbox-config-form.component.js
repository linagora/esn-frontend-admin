'use strict';
require('./inbox-config-form.constants');
require('./inbox-config-form.controller');
require('./disable-local-copy/inbox-config-form-disable-local-copy.pug');
require('./disable-forwarding/inbox-config-form-disable-forwarding.pug');

angular.module('linagora.esn.admin')
  .component('inboxConfigForm', {
    template: require("./inbox-config-form.pug"),
    controller: 'InboxConfigFormController',
    bindings: {
      configurations: '<',
      mode: '@',
      availableModes: '<',
      registerPostSaveHandler: '<'
    }
   
  });
