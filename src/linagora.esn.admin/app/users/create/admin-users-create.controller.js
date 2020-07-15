'use strict';

angular.module('linagora.esn.admin')

.controller('adminUsersCreateController', function($stateParams, adminUsersService) {
  var self = this;
  var domainId = $stateParams.domainId;
  var USER_TEMPLATE = {
    accounts: [{
      type: 'email',
      emails: []
    }],
    domains: [
      { domain_id: domainId }
    ]
  };

  self.user = $stateParams.user || angular.copy(USER_TEMPLATE);

  self.save = function() {
    return adminUsersService.createMember(domainId, self.user)
      .then(function() {
        // Reset form state
        self.user = angular.copy(USER_TEMPLATE);
      });
  };
});
