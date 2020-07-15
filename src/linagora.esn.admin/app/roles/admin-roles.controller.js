'use strict';

angular.module('linagora.esn.admin')

.controller('adminRolesController', function($scope, $stateParams, $modal, adminRolesService, ADMIN_LOADING_STATUS) {
  var self = this;
  var domainId = $stateParams.domainId;

  self.status = ADMIN_LOADING_STATUS.loading;

  init();

  function init() {
    adminRolesService.init(domainId);

    adminRolesService.getAdministrators().then(function(administrators) {
      self.administrators = administrators;
      self.status = ADMIN_LOADING_STATUS.loaded;
    })
    .catch(function() {
      self.status = ADMIN_LOADING_STATUS.error;
    });
  }

  self.openAddForm = function() {
    $modal({
      template: require("./add/admin-roles-add.pug"),
      backdrop: 'static',
      placement: 'center',
      controllerAs: '$ctrl',
      controller: 'adminRolesAddController'
    });
  };

  $scope.$on('$destroy', function() {
    adminRolesService.reset();
  });
});
