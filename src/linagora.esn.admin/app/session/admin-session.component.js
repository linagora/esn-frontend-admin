(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminSession', {
      template: require('./admin-session.pug'),
      controller: 'adminSessionController'
    });
})(angular);
