'use strict';

const _ = require('lodash');

require('./admin-users-states.constants.js');

angular.module('linagora.esn.admin')
  .factory('adminUsersStatesService', adminUsersStatesService);

function adminUsersStatesService(
  userAPI,
  ADMIN_USER_ACTIONS,
  ADMIN_USER_ACTION_STATES
) {
  return {
    getUserStates: getUserStates,
    setUserStates: setUserStates
  };

  function getUserStates(user) {
    return Object.keys(ADMIN_USER_ACTIONS).map(function(action) {
      var state = _.find(user.states || [], function(state) {
        return state.name === ADMIN_USER_ACTIONS[action].name;
      });

      state = state || {
        name: action,
        value: ADMIN_USER_ACTION_STATES.enabled
      };
      state.label = ADMIN_USER_ACTIONS[action].label;

      return state;
    });
  }

  function setUserStates(userId, states) {
    return userAPI.setUserStates(userId, states);
  }
}
