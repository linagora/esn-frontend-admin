(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminOauthFacebook', {
      template: require('./admin-oauth-facebook.pug'),
      bindings: {
        config: '=',
        isEnabled: '='
      }
    });
})(angular);
