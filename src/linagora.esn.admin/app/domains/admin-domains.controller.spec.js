'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsController', function() {

  var $rootScope, $scope, $controller;

  var $modalMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    $modalMock = sinon.spy();

    angular.mock.module(function($provide) {
      $provide.value('$modal', $modalMock);
    });
  });

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$rootScope_, _$controller_) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
    });

  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();
    $scope.$hide = angular.noop;

    var controller = $controller('adminDomainsController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The openCreateForm function', function() {
    it('should open add form modal', function() {
      var controller = initController();

      controller.openCreateForm();
      $rootScope.$digest();

      expect($modalMock).to.have.been.calledOnce;
    });
  });
});
