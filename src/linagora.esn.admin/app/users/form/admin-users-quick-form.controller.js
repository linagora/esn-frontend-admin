(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminUsersQuickFormController', adminUsersQuickFormController);

  function adminUsersQuickFormController(
    adminUsersFormService,
    adminUsersService,
    rejectWithErrorNotification
  ) {
    var self = this;

    var USER_TEMPLATE = {
      accounts: [{
        type: 'email',
        emails: []
      }],
      domains: [
        { domain_id: self.domainId }
      ]
    };

    self.emailAvailabilityChecker = adminUsersFormService.emailAvailabilityChecker;
    self.save = save;

    self.user = angular.copy(USER_TEMPLATE);

    function save(form) {
      if (form && form.$valid) {
        return adminUsersService.createMember(self.domainId, self.user)
          .then(function() {
            // Reset form state
            self.user = angular.copy(USER_TEMPLATE);
            form.$setPristine();
          });
      }

      form.$setSubmitted();

      return rejectWithErrorNotification('Form is invalid!');
    }
  }
})(angular);
