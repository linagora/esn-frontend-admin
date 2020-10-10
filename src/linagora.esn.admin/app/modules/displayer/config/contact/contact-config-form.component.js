'use strict';

angular.module('linagora.esn.admin')
  .component('contactConfigForm', {
    template: require('./contact-config-form.pug'),
    bindings: {
      configurations: '=',
      mode: '@',
      availableModes: '<',
      registerPostSaveHandler: '<'
    }
  });
