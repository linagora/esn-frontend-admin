(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminOauthUsageOptions', {
    template: require("./admin-oauth-usage-options.pug"),
    bindings: {
      options: '='
    }
  });
})(angular);
