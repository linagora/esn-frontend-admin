(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminOauthTwitter', {
      template: require('./admin-oauth-twitter.pug'),
      bindings: {
        config: '=',
        isEnabled: '='
      }
    });
})(angular);
