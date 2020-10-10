'use strict';

require('./admin-modules-form.controller');

angular.module('linagora.esn.admin')
  .component('adminModulesForm', {
    controller: 'adminModulesFormController',
    bindings: {
      configurations: '=',
      mode: '@',
      availableModes: '=',
      template: '=',
      registerPostSaveHandler: '<'
    }
  });
