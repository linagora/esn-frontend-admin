(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminOauthSubheader', {
    template: require("./admin-oauth-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
