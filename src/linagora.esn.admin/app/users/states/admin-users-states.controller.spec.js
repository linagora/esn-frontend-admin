'use strict';

/* global chai, sinon: false */

var expect = chai.expect;

describe('The AdminUsersStatesController', function() {
  var $rootScope, $controller;
  var adminUsersStatesService;
  var userUtilsMock;

  beforeEach(function() {
    module('linagora.esn.admin');

    userUtilsMock = {
      displayNameOf: angular.noop
    };

    module(function($provide) {
      $provide.value('userUtils', userUtilsMock);
    });

    inject(function(
      _$rootScope_,
      _$controller_,
      _adminUsersStatesService_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      adminUsersStatesService = _adminUsersStatesService_;
    });
  });

  function initController(user) {
    var $scope = $rootScope.$new();
    var controller = $controller('AdminUsersStatesController', { $scope: $scope });

    $scope.$digest();

    controller.user = user;

    return controller;
  }

  describe('The init function', function() {
    it('should call userUtils service to build username', function() {
      var user = { firstname: 'firstname', lastname: 'lastname' };

      userUtilsMock.displayNameOf = sinon.spy(function(user) {
        return user.firstname + ' ' + user.lastname;
      });

      var controller = initController(user);

      controller.init();

      expect(userUtilsMock.displayNameOf).to.have.been.calledWith(user);
      expect(controller.username).to.equal(user.firstname + ' ' + user.lastname);
    });

    it('should get and qualify user states to view', function() {
      var states = [
        { name: 'action1', value: 'enabled', label: 'Action1' },
        { name: 'action2', value: 'disabled', label: 'Action2' }
      ];
      var user = { states: states };

      adminUsersStatesService.getUserStates = sinon.stub().returns(states);
      var controller = initController(user);

      controller.init();

      expect(adminUsersStatesService.getUserStates).to.have.been.calledWith(user);
      expect(controller.states).to.deep.equal([
        { name: 'action1', value: true, label: 'Action1' },
        { name: 'action2', value: false, label: 'Action2' }
      ]);
    });
  });

  describe('The updateUserStates function', function() {
    it('should call adminUsersStateService.setUserStates to update user states with qualified data', function() {
      var user = { _id: '123' };
      var controller = initController(user);

      controller.states = [
        { name: 'action1', value: true, label: 'Action1' },
        { name: 'action2', value: false, label: 'Action2' }
      ];

      adminUsersStatesService.setUserStates = sinon.stub().returns($q.when());
      controller.updateUserStates();
      $rootScope.$digest();

      expect(adminUsersStatesService.setUserStates).to.have.been.calledWith(
        user._id,
        [
          { name: 'action1', value: 'enabled' },
          { name: 'action2', value: 'disabled' }
        ]);
    });

    it('should apply new states to the user after update states successfully', function() {
      var user = { _id: '123' };
      var controller = initController(user);
      var newStates = [
        { name: 'action1', value: 'enabled' },
        { name: 'action2', value: 'disabled' }
      ];

      controller.states = [
        { name: 'action1', value: true, label: 'Action1' },
        { name: 'action2', value: false, label: 'Action2' }
      ];

      adminUsersStatesService.setUserStates = sinon.stub().returns($q.when());
      controller.updateUserStates();
      $rootScope.$digest();

      expect(adminUsersStatesService.setUserStates).to.have.been.calledWith(user._id, newStates);

      expect(controller.user.states).to.deep.equal(newStates);
    });
  });
});
