'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminRolesController', function() {
  var $controller, $rootScope, $stateParams, $scope;
  var adminRolesService;
  var $modalMock;

  beforeEach(function() {
    module('linagora.esn.admin');

    $modalMock = sinon.spy();

    module(function($provide) {
      $provide.value('$modal', $modalMock);
    });

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminRolesService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminRolesService = _adminRolesService_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminRolesController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  it('should get adminitrator list on init', function() {
    var administrators = ['admin1', 'admin2'];

    adminRolesService.getAdministrators = sinon.stub().returns($q.when(administrators));

    var controller = initController();

    expect(controller.administrators).to.deep.equal(administrators);
    expect(adminRolesService.getAdministrators).to.have.been.calledOnce;
  });

  describe('The openAddForm fn', function() {
    it('should open modal', function() {
      adminRolesService.getAdministrators = function() {
        return $q.when([]);
      };

      var controller = initController();

      controller.openAddForm();

      expect($modalMock).to.have.been.calledOnce;
    });
  });
});
