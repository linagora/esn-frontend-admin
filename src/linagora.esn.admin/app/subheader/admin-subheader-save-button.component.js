'use strict';

angular.module('linagora.esn.admin')

  .component('adminSubheaderSaveButton', {
    templateUrl: '/admin/app/subheader/admin-subheader-save-button.html',
    controller: 'adminSubheaderSaveButtonController',
    bindings: {
      onClick: '&',
      form: '<'
    }
  });
