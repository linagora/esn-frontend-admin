'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminRolesAutoCompleteController', function() {
  var $controller, $rootScope, $scope, $elementMock;
  var elementScrollService, adminRolesService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    $elementMock = {
      find: function() {}
    };

    angular.mock.module(function($provide) {
      $provide.value('$element', $elementMock);
    });

    inject(function(_$controller_, _$rootScope_, _elementScrollService_, _adminRolesService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      elementScrollService = _elementScrollService_;
      adminRolesService = _adminRolesService_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminRolesAutoCompleteController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should add the current administrators to the excludes list', function() {
      adminRolesService.getAdministrators = function() {
        return $q.when([{ id: 'admin1' }, { id: 'admin2' }]);
      };

      var controller = initController();

      expect(controller.excludes).to.include({ id: 'admin1', objectType: 'user' });
      expect(controller.excludes).to.include({ id: 'admin2', objectType: 'user' });

      $scope.$digest();
    });
  });

  describe('The onTagAdded fn', function() {
    beforeEach(function() {
      adminRolesService.getAdministrators = function() { return $q.when([]); };
    });

    it('should add the new tag to the excludes list', function() {
      elementScrollService.autoScrollDown = angular.noop;

      var controller = initController();

      controller.onTagAdded({ id: 'user', objectType: 'user' });

      expect(controller.excludes).to.include({ id: 'user', objectType: 'user' });
    });

    it('should call elementScrollService.autoScrollDown', function() {
      elementScrollService.autoScrollDown = sinon.spy();

      var controller = initController();

      controller.onTagAdded({});

      expect(elementScrollService.autoScrollDown).to.have.been.calledOnce;
    });
  });

  describe('The onTagRemoved method', function() {
    beforeEach(function() {
      adminRolesService.getAdministrators = function() { return $q.when([]); };
    });

    it('should remove the removed tag in excludes list', function() {
      var controller = initController();
      var tag = { id: '123', objectType: 'bar' };

      controller.excludes = [tag];
      controller.onTagRemoved(tag);

      expect(controller.excludes).to.not.include(tag);
    });
  });
});
