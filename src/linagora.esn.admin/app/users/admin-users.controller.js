'use strict';

require('./admin-users.service.js');

angular.module('linagora.esn.admin')

  .controller('adminUsersController', function($log, $stateParams, adminUsersService) {
    var self = this;

    self.$onInit = $onInit;
    self.displayUserCreation = false;
    self.domainId = $stateParams.domainId;

    function $onInit() {
      adminUsersService.isUserCreationEnabled(self.domainId)
        .then(function(enabled) {
          self.displayUserCreation = enabled;
        })
        .catch(function(err) {
          $log.error('Can not check if user creation is enabled', err);
        });
    }
  });
