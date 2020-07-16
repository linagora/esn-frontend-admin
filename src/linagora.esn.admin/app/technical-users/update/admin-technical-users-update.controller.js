'use strict';

require('../admin-technical-users.service.js');
require('../admin-technical-users.constants.js');

angular.module('linagora.esn.admin')
  .controller('adminTechnicalUsersUpdateController', adminTechnicalUsersUpdateController);

function adminTechnicalUsersUpdateController(
  $rootScope,
  $stateParams,
  esnTechnicalUserAPIClient,
  asyncAction,
  adminTechnicalUsersService,
  ADMIN_TECHNICAL_USERS_EVENTS,
  technicalUser
) {
  var self = this;

  self.domainId = $stateParams.domainId;
  self.technicalUser = technicalUser;
  self.onEditBtnClick = onEditBtnClick;

  function onEditBtnClick() {
    return asyncAction({
      progressing: 'Editing a technical user...',
      success: 'A technical user has been edited',
      failure: 'Failed to edit a technical user'
    }, function() {
      return _editTechnicalUser();
    });
  }

  function _editTechnicalUser() {
    return esnTechnicalUserAPIClient.update(self.domainId, adminTechnicalUsersService.qualifyTechnicalUser(self.technicalUser))
      .then(function() {
        $rootScope.$emit(ADMIN_TECHNICAL_USERS_EVENTS.UPDATED, self.technicalUser);
      });
  }
}
