'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminRolesAdministratorListItem', function() {

  var $controller, $rootScope, $stateParams, $scope;
  var adminRolesService, session, userUtils;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });
  
  beforeEach(inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminRolesService_, _session_, _userUtils_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $stateParams = _$stateParams_;
    adminRolesService = _adminRolesService_;
    session = _session_;
    userUtils = _userUtils_;

    $stateParams.domainId = 'domain123';
    session.user = {};
  }));

  function initController(scope, bindings) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminRolesAdministratorListItem', { $scope: $scope }, bindings);

    $scope.$digest();

    return controller;
  }

  describe('The isMe property', function() {

    it('should be true if administrator is current logged in user', function() {
      var administrator = { _id: 'uid' };

      session.user = administrator;

      var controller = initController(null, { user: administrator });

      expect(controller.isMe).to.be.true;
    });

    it('should be false if administrator is not current logged in user', function() {
      var administrator = { _id: 'uid' };

      session.user = { _id: 'other_uid' };

      var controller = initController(null, { user: administrator });

      expect(controller.isMe).to.be.false;
    });

  });

  describe('The displayName property', function() {

    it('should be displayName of the administrator', function() {
      var displayName = 'some_name';
      var administrator = { _id: 'uid' };

      userUtils.displayNameOf = sinon.stub().returns(displayName);

      var controller = initController(null, { user: administrator });

      expect(userUtils.displayNameOf).to.have.been.calledWith(administrator);
      expect(controller.displayName).to.equal(displayName);
    });

  });

  describe('The revoke fn', function() {

    it('should call adminRolesService to remove the administrator', function(done) {
      var administrator = { _id: 'uid' };
      var controller = initController(null, { user: administrator });

      adminRolesService.removeAdministrator = sinon.stub().returns($q.when());

      controller.revoke().then(function() {
        expect(adminRolesService.removeAdministrator).to.have.been.calledWith(administrator);
        done();
      });

      $rootScope.$digest();
    });

  });

});
