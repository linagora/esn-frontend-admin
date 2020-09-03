(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .factory('adminTechnicalUsersService', function() {

      return {
        qualifyTechnicalUser: qualifyTechnicalUser
      };

      function qualifyTechnicalUser(technicalUser) {
        var qualifiedData = {};

        technicalUser.data.forEach(function(pair) {
          qualifiedData[pair.key] = pair.value;
        });

        technicalUser.data = qualifiedData;

        return technicalUser;
      }
    });
})(angular);
