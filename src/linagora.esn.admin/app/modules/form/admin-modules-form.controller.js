'use strict';

require('../../common/form/admin-form.constant.js');

angular.module('linagora.esn.admin')
  .controller('adminModulesFormController', function($compile, $element, $scope, ADMIN_FORM_EVENT) {
    const self = this;
    let unmodifiedConfiguration;

    self.$onInit = function() {
      const angularElement = angular.element('<' + self.template + ' configurations="$ctrl.configurations" mode="{{$ctrl.mode}}", available-modes="$ctrl.availableModes", register-post-save-handler="$ctrl.registerPostSaveHandler" />');

      unmodifiedConfiguration = angular.copy(self.configurations);

      $compile($element.append(angularElement).contents())($scope);
    };

    $scope.$on(ADMIN_FORM_EVENT.submit, function() {
      unmodifiedConfiguration = angular.copy(self.configurations);
    });

    $scope.$on(ADMIN_FORM_EVENT.reset, function() {
      self.configurations = angular.copy(unmodifiedConfiguration);
    });
  });
