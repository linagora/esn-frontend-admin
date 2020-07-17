'use strict';

require('./admin-users-form.service.js');

angular.module('linagora.esn.admin')
  .controller('adminUsersFullFormController', adminUsersFullFormController);

function adminUsersFullFormController(
  adminUsersFormService
) {
  var self = this;

  self.emailAvailabilityChecker = adminUsersFormService.emailAvailabilityChecker;
}
