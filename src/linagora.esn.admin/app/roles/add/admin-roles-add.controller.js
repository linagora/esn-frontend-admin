'use strict';

angular.module('linagora.esn.admin')

.controller('adminRolesAddController', function($q, esnI18nService, asyncAction, adminRolesService) {
  var self = this;

  self.newAdministrators = [];
  self.add = function() {
    if (self.newAdministrators.length === 0) {
      return $q.reject();
    }

    var promotedTime = Date.now();
    var notificationMessages = _getNotificationMessages(self.newAdministrators.length);

    self.newAdministrators.forEach(function(administrator) {
      administrator.role = {
        timestamps: {
          creation: promotedTime
        }
      };
    });

    return asyncAction(notificationMessages, function() {
      return adminRolesService.addAdministrators(self.newAdministrators);
    });
  };

  function _getNotificationMessages(length) {
    var context = length > 1 ? 'administrators' : 'administrator';
    var result = {
      progessing: esnI18nService.translate('Adding %s ' + context, length),
      success: esnI18nService.translate('Added %s ' + context, length),
      failure: 'Failed to add ' + context
    };

    return result;
  }
});
