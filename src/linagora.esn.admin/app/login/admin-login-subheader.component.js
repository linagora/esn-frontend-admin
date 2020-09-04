(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminLoginSubheader', {
      template: require('./admin-login-subheader.pug'),
      bindings: {
        onFormSubmit: '&',
        form: '<'
      }
    });
})(angular);
