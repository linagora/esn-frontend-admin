'use strict';

angular.module('esnApp')
  .config(function($urlRouterProvider) {
    $urlRouterProvider.otherwise(function() {
      return '/admin';
    });
  })

  .config(function($stateProvider) {
    $stateProvider.state('logout', {
      url: '/logout',
      controller: 'logoutController'
    });
  });
