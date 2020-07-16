'use strict';

require('./admin-users-states.constants.js');
require('./admin-users-states.service.js');

angular.module('linagora.esn.admin')
  .controller('AdminUsersStatesController', AdminUsersStatesController);

function AdminUsersStatesController(
  asyncAction,
  userUtils,
  adminUsersStatesService,
  ADMIN_USER_ACTION_STATES
) {
  var self = this;

  self.init = init;
  self.updateUserStates = updateUserStates;

  function init() {
    self.username = userUtils.displayNameOf(self.user);
    self.states = _qualifyStatesToView(adminUsersStatesService.getUserStates(self.user));
  }

  function updateUserStates() {
    var notificationMessages = {
      progressing: 'Updating user states...',
      success: 'User states updated',
      failure: 'Failed to update user states'
    };

    return asyncAction(notificationMessages, function() {
      var statesToUpdate = _qualifyStatesToUpdate(self.states);

      return adminUsersStatesService.setUserStates(self.user._id, statesToUpdate)
        .then(function() {
          self.user.states = statesToUpdate;
        });
    });
  }

  function _qualifyStatesToUpdate(states) {
    return states.map(function(state) {
      return {
        name: state.name,
        value: state.value ? ADMIN_USER_ACTION_STATES.enabled : ADMIN_USER_ACTION_STATES.disabled
      };
    });
  }

  function _qualifyStatesToView(states) {
    var statesToView = angular.copy(states);

    return statesToView.map(function(state) {
      state.value = state.value === ADMIN_USER_ACTION_STATES.enabled;

      return state;
    });
  }
}
