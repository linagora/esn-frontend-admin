(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminOauthGoogle', {
    template: require("./admin-oauth-google.pug"),
    bindings: {
      config: '=',
      isEnabled: '='
    }
  });
})(angular);
