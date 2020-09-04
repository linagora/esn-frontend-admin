(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminOauth', {
      template: require('./admin-oauth.pug'),
      controller: 'adminOauthController'
    });
})(angular);
