'use strict';

angular.module('linagora.esn.admin')

.controller('adminRolesAdministratorListItem', function(asyncAction, adminRolesService, session, userUtils, esnI18nService) {
  var self = this;

  self.isMe = session.user._id === self.user._id;
  self.displayName = self.user.displayName || userUtils.displayNameOf(self.user);

  var notificationMessages = _getNotificationMessages(self.displayName);

  self.revoke = function() {
    return asyncAction(notificationMessages, function() {
      return adminRolesService.removeAdministrator(self.user);
    });
  };

  function _getNotificationMessages(displayName) {
    return {
      progressing: esnI18nService.translate('Revoking administration right for %s', displayName),
      success: esnI18nService.translate('Revoked administration right for %s', displayName),
      failure: esnI18nService.translate('Failed to revoke administration right for %s', displayName)
    };
  }
});
