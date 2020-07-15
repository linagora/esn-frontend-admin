(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .directive('adminMaintenanceModule', adminMaintenanceModule);

  function adminMaintenanceModule($compile) {
    function link(scope, element) {
      var template = '<' + scope.template + ' mode="{{mode}}" />';

      element.append($compile(template)(scope));
    }

    return {
      restrict: 'E',
      template: '',
      scope: {
        mode: '@',
        template: '='
      },
      link: link
    };
  }
})(angular);
