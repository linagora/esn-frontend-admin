'use strict';

angular.module('linagora.esn.admin')
  .component('linshareConfigForm', {
    template: require('./linshare-config-form.pug'),
    bindings: {
      configurations: '='
    }
  });
  