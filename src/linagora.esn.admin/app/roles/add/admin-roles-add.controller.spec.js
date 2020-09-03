'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminRolesAddFormController', function() {
  var $controller, $rootScope, $scope;
  var adminRolesService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _adminRolesService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminRolesService = _adminRolesService_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();
    $scope.$hide = angular.noop;

    var controller = $controller('adminRolesAddController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The add fn', function() {
    it('should reject if array of new administrators is empty', function(done) {
      adminRolesService.addAdministrators = sinon.stub().returns($q.when());

      var controller = initController();

      controller.newAdministrators = [];
      controller.add().catch(function() {
        expect(adminRolesService.addAdministrators).to.have.not.been.called;

        done();
      });

      $rootScope.$digest();
    });

    it('should call adminRolesService.addAdministrators to add new administrators', function(done) {
      var newAdministrators = [{ id: 'admin3' }];

      adminRolesService.addAdministrators = sinon.stub().returns($q.when());

      var controller = initController();

      controller.newAdministrators = newAdministrators;

      controller.add().then(function() {
        expect(adminRolesService.addAdministrators).to.have.been.calledWith(newAdministrators);

        done();
      });

      $rootScope.$digest();
    });
  });
});
