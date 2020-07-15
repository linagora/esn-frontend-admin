'use strict';

angular.module('linagora.esn.admin')

.directive('adminModulesForm', function($compile, ADMIN_FORM_EVENT) {
  function link(scope, element) {
    var template = '<' + scope.template + ' configurations="configurations" mode="{{mode}}", available-modes="availableModes" />';

    element.append($compile(template)(scope));

    var unmodifiedConfiguration = angular.copy(scope.configurations);

    scope.$on(ADMIN_FORM_EVENT.submit, function() {
      unmodifiedConfiguration = angular.copy(scope.configurations);
    });

    scope.$on(ADMIN_FORM_EVENT.reset, function() {
      scope.configurations = angular.copy(unmodifiedConfiguration);
    });
  }

  return {
    restrict: 'E',
    template: '',
    scope: {
      configurations: '=',
      mode: '@',
      availableModes: '=',
      template: '='
    },
    link: link
  };
});
