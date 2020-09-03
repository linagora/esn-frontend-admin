(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminFeatures', {
      template: require('./admin-features.pug'),
      controller: 'adminFeaturesController'
    });
})(angular);
