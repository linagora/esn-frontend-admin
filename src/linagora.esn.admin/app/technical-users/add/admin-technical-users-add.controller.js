(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminTechnicalUsersAddController', adminTechnicalUsersAddController);

  function adminTechnicalUsersAddController(
    $rootScope,
    $stateParams,
    esnTechnicalUserAPIClient,
    adminTechnicalUsersService,
    asyncAction,
    ADMIN_TECHNICAL_USERS_EVENTS
  ) {
    var self = this;

    self.domainId = $stateParams.domainId;
    self.onAddBtnClick = onAddBtnClick;

    function onAddBtnClick() {
      return asyncAction({
        progressing: 'Creating a technical user...',
        success: 'A technical user has been created',
        failure: 'Failed to create a technical user'
      }, function() {
        return _addTechnicalUser();
      });
    }

    function _addTechnicalUser() {
      return esnTechnicalUserAPIClient.add(self.domainId, adminTechnicalUsersService.qualifyTechnicalUser(self.technicalUser))
        .then(function(createdTechnicalUser) {
          $rootScope.$emit(ADMIN_TECHNICAL_USERS_EVENTS.ADDED, createdTechnicalUser);
        });
    }
  }
})(angular);
