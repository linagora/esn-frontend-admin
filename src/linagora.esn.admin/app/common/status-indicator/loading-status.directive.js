(function() {
  'use strict';

  angular.module('linagora.esn.admin')

    .directive('adminLoadingStatus', adminStatusIndicator);

  function adminStatusIndicator() {
    return {
      restrict: 'AE',
      template: require('./loading-status.pug'),
      transclude: true
    };
  }
})();

