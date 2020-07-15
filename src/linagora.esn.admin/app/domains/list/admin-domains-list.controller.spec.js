'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsListController', function() {

  var $rootScope, $scope, $controller, $modalMock;
  var domainAPI;
  var infiniteScrollHelperMock;
  var loadNextItemFn;
  var ADMIN_DOMAINS_EVENTS;

  beforeEach(function() {
    infiniteScrollHelperMock = sinon.spy(function(ctrl, loadNextItem) {
      loadNextItemFn = loadNextItem;
    });
    $modalMock = sinon.stub();

    angular.mock.module('linagora.esn.admin', function($provide) {
      $provide.value('infiniteScrollHelper', infiniteScrollHelperMock);
      $provide.value('$modal', $modalMock);
    });
  });

  beforeEach(inject(function(
    _$rootScope_,
    _$controller_,
    _domainAPI_,
    _ADMIN_DOMAINS_EVENTS_
  ) {
    $rootScope = _$rootScope_;
    $controller = _$controller_;
    domainAPI = _domainAPI_;
    ADMIN_DOMAINS_EVENTS = _ADMIN_DOMAINS_EVENTS_;
  }));

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminDomainsListController', { $scope: $scope }, { elements: [] });

    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should call infiniteScrollHelper to load elements', function() {
      var controller = initController();

      controller.$onInit();

      expect(infiniteScrollHelperMock).to.have.been.called;
    });

    it('should have load next items function to list domain', function() {
      var controller = initController();
      var response = { data: ['domain1', 'domain2'] };

      domainAPI.list = sinon.stub().returns($q.when({ response: response }));

      controller.$onInit();
      loadNextItemFn();
      $rootScope.$digest();

      expect(domainAPI.list).to.have.been.calledWith({ limit: 20, offset: 0 });
    });
  });

  describe('on DOMAIN_CREATED event', function() {
    it('should add domain to the top of the element list', function() {
      domainAPI.list = sinon.stub().returns($q.when([]));

      var domain1 = { id: 1, name: 'domain1.org', company_name: 'c1' };
      var domain2 = { id: 2, name: 'domain2.org', company_name: 'c2' };
      var domain3 = { id: 3, name: 'domain3.org', company_name: 'c3' };
      var controller = initController();
      var expectResult = [domain3, domain1, domain2];

      controller.elements = [domain1, domain2];
      controller.$onInit();

      $rootScope.$broadcast(ADMIN_DOMAINS_EVENTS.DOMAIN_CREATED, domain3);
      $rootScope.$digest();

      expect(controller.elements).to.deep.equal(expectResult);
    });
  });

  describe('on DOMAIN_UPDATED event', function() {
    it('should update the corresponding domain in the list', function() {
      var domain1 = { id: 1, name: 'domain1.org', company_name: 'c1' };
      var domain2 = { id: 2, name: 'domain2.org', company_name: 'c2' };
      var controller = initController();
      var updatedDomain = { id: 2, name: 'domain2.org', company_name: 'c22' };
      var expectResult = [domain1, updatedDomain];

      controller.elements = [domain1, domain2];
      controller.$onInit();

      $rootScope.$broadcast(ADMIN_DOMAINS_EVENTS.DOMAIN_UPDATED, updatedDomain);
      $rootScope.$digest();

      expect(controller.elements).to.deep.equal(expectResult);
    });
  });

  describe('The showEditDomainForm fn', function() {
    it('should open the edit modal', function() {
      var controller = initController();

      $modalMock.returns({ $promise: $q.when() });
      controller.showEditDomainForm();

      expect($modalMock).to.have.been.calledOnce;
    });
  });
});
