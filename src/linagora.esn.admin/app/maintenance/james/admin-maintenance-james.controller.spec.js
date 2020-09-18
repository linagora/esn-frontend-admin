'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The adminMaintenanceJamesController', function() {
  let $controller, $rootScope, $scope;
  let jamesApiClientMock;

  beforeEach(function() {
    jamesApiClientMock = {};

    angular.mock.module('linagora.esn.admin');
    angular.mock.module(function($provide) {
      $provide.factory('asyncAction', function() {
        return function(message, action) {
          action();
        };
      });
      $provide.factory('jamesApiClient', function() { return jamesApiClientMock; });
    });

    angular.mock.inject(function(
      _$controller_,
      _$rootScope_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    const controller = $controller('adminMaintenanceJamesController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The synchronizeDomains fn', function() {
    it('should call James client to synchronize domains', function() {
      jamesApiClientMock.syncDomains = sinon.stub();

      const controller = initController();

      controller.synchronizeDomains();

      expect(jamesApiClientMock.syncDomains).to.have.been.calledOnce;
    });
  });
});
