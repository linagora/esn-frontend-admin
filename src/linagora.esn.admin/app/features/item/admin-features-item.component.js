(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminFeaturesItem', {
      template: require("./admin-features-item.pug"),
      bindings: {
        feature: '='
      }
    });
})(angular);
