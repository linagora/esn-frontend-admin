(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .controller('adminTechnicalUsersController', function($log, $scope, $stateParams, $modal) {
    var self = this;

    $scope.domainId = $stateParams.domainId;

    self.openAddForm = function() {
      $modal({
        template: require("./add/admin-technical-users-add.pug"),
        backdrop: 'static',
        placement: 'center',
        controllerAs: '$ctrl',
        controller: 'adminTechnicalUsersAddController'
      });
    };
  });

})(angular);
