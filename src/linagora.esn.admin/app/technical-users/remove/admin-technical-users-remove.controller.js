(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminTechnicalUsersRemoveController', adminTechnicalUsersRemoveController);

  function adminTechnicalUsersRemoveController(
    $rootScope,
    $stateParams,
    asyncAction,
    esnTechnicalUserAPIClient,
    technicalUser,
    ADMIN_TECHNICAL_USERS_EVENTS
  ) {
    var self = this;

    self.domainId = $stateParams.domainId;
    self.technicalUser = technicalUser;
    self.onRemoveBtnClick = onRemoveBtnClick;

    function onRemoveBtnClick() {
      return asyncAction({
        progressing: 'Removing a technical user...',
        success: 'A technical user has been removed',
        failure: 'Failed to remove a technical user'
      }, function() {
        return _onRemovedTechnicalUser();
      });
    }

    function _onRemovedTechnicalUser() {
      return esnTechnicalUserAPIClient.remove(self.domainId, technicalUser)
        .then(function() {
          $rootScope.$emit(ADMIN_TECHNICAL_USERS_EVENTS.REMOVED, technicalUser._id);
        });
     }
  }
})(angular);

