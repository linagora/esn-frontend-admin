'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminTechnicalUsersListController', function() {
  var $controller, $rootScope, $scope;
  var infiniteScrollHelperMock;
  var ELEMENTS_PER_REQUEST_MOCK;

  beforeEach(function() {
    module('linagora.esn.admin');

    infiniteScrollHelperMock = sinon.stub().returns();

    module(function($provide) {
      $provide.constant('ELEMENTS_PER_REQUEST', ELEMENTS_PER_REQUEST_MOCK);
      $provide.value('infiniteScrollHelper', infiniteScrollHelperMock);
    });

    inject(function(_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });
  });

  function initController() {
    $scope = $rootScope.$new();

    var controller = $controller('adminTechnicalUsersListController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('$onInit function', function() {
    it('should call infiniteScrollHelper with correct arguments when ELEMENTS_PER_REQUEST constant is defined', function() {
      ELEMENTS_PER_REQUEST_MOCK = 20;
      initController();

      expect(infiniteScrollHelperMock).to.have.been.called;
      expect(infiniteScrollHelperMock.getCall(0).args[3] === ELEMENTS_PER_REQUEST_MOCK).to.be.true;
    });

    it('should call infiniteScrollHelper with correct arguments when ELEMENTS_PER_REQUEST constant is undefined', function() {
        ELEMENTS_PER_REQUEST_MOCK = undefined;
        initController();

        expect(infiniteScrollHelperMock).to.have.been.called;
        expect(infiniteScrollHelperMock.getCall(0).args[3] === 20).to.be.true;
    });
  });
});
