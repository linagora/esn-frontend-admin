'use strict';

angular.module('linagora.esn.admin')

  .component('adminModulesSaveButton', {
    template: require("./admin-modules-save-button.pug"),
    controller: 'adminModulesSaveButtonController',
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
