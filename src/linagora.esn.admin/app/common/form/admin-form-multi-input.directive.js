'use-strict';

angular.module('linagora.esn.admin')

.directive('adminFormMultiInput', function() {

  return {
    restrict: 'E',
    template: require("./admin-form-multi-input.pug"),
    controller: 'adminFormMultiInputController',
    controllerAs: '$ctrl',
    scope: {
      ngModel: '=',
      availableTypes: '=',
      requiredTypes: '='
    }
  };
});
