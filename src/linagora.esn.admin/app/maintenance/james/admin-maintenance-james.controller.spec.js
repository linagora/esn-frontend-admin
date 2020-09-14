'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;
const jamesApi = require('esn-api-client/src/api/james');

describe('The adminMaintenanceJamesController', function() {
  let $controller, $rootScope, $scope;
  let jamesApiClient, sandbox;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
    angular.mock.module(function($provide) {
      $provide.factory('asyncAction', function() {
        return function(message, action) {
          action();
        };
      });
    });

    angular.mock.inject(function(
      _$controller_,
      _$rootScope_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    jamesApiClient = {};

    sandbox.stub(jamesApi, 'default', function() {
      return jamesApiClient;
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    const controller = $controller('adminMaintenanceJamesController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The synchronizeDomains fn', function() {
    it('should call James client to synchronize domains', function() {
      jamesApiClient.syncDomains = sinon.stub();

      const controller = initController();

      controller.synchronizeDomains();

      expect(jamesApiClient.syncDomains).to.have.been.calledOnce;
    });
  });
});
