(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .factory('adminUsersFormService', adminUsersFormService);

  function adminUsersFormService(
    $q,
    esnAvailabilityService
  ) {
    return {
      emailAvailabilityChecker: emailAvailabilityChecker
    };

    function emailAvailabilityChecker(email) {
      return esnAvailabilityService.checkEmailAvailability(email).then(function(result) {
        if (!result.available) {
          return $q.reject(new Error(result.message));
        }
      });
    }
  }
})(angular);
