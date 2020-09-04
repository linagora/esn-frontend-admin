(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminOauthGithub', {
      template: require('./admin-oauth-github.pug'),
      bindings: {
        config: '=',
        isEnabled: '='
      }
    });
})(angular);
