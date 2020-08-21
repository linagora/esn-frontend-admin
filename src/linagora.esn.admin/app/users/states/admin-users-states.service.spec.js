'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The adminUsersStatesService', function() {
  var $rootScope, userAPI, adminUsersStatesService;
  var ADMIN_USER_ACTIONS_MOCK;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    ADMIN_USER_ACTIONS_MOCK = {
      action1: {
        name: 'action1',
        label: 'Action1'
      },
      action2: {
        name: 'action2',
        label: 'Action2'
      },
      action3: {
        name: 'action3',
        label: 'Action3'
      }
    };

    angular.mock.module(function($provide) {
      $provide.constant('ADMIN_USER_ACTIONS', ADMIN_USER_ACTIONS_MOCK);
    });

    inject(function(
      _$rootScope_,
      _userAPI_,
      _adminUsersStatesService_
    ) {
      $rootScope = _$rootScope_;
      userAPI = _userAPI_;
      adminUsersStatesService = _adminUsersStatesService_;
    });
  });

  describe('The getUserStates function', function() {
    it('should return states of a user', function() {
      var user = {
        states: [
          { name: 'action1', value: 'enabled' },
          { name: 'action2', value: 'disabled' }
        ]
      };
      var states = adminUsersStatesService.getUserStates(user);

      expect(states).to.deep.equal([
        { name: 'action1', value: 'enabled', label: 'Action1' },
        { name: 'action2', value: 'disabled', label: 'Action2' },
        { name: 'action3', value: 'enabled', label: 'Action3' }
      ]);
    });
  });

  describe('The setUserStates function', function() {
    it('should reject if failed to update user states', function() {
      var userId = '123';
      var states = [{ name: 'foo', value: 'enabled' }];

      userAPI.setUserStates = sinon.stub().returns($q.reject());

      adminUsersStatesService.setUserStates(userId, states)
        .catch(function() {
          expect(userAPI.setUserStates).to.have.been.calledWith(userId, states);
        });

      $rootScope.$digest();
    });

    it('should resolve if success to update user states', function() {
      var userId = '123';
      var states = [{ name: 'foo', value: 'enabled' }];

      userAPI.setUserStates = sinon.stub().returns($q.when());

      adminUsersStatesService.setUserStates(userId, states);

      $rootScope.$digest();

      expect(userAPI.setUserStates).to.have.been.calledWith(userId, states);
    });
  });
});
