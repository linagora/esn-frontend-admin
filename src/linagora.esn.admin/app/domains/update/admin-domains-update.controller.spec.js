'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainUpdateController', function() {
  var $controller, $rootScope, $scope;
  var adminDomainsServiceMock;
  var domain;

  beforeEach(function() {
    module('linagora.esn.admin');

    adminDomainsServiceMock = {};
    domain = {
      company_name: 'company_name'
    };

    angular.mock.module(function($provide) {
      $provide.value('adminDomainsService', adminDomainsServiceMock);
      $provide.value('domain', domain);
    });
  });

  beforeEach(function() {
    inject(function(_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminDomainUpdateController', { $scope: $scope });

    return controller;
  }

  describe('The update function', function() {
    it('should call adminDomainsService.update to update domain', function() {
      var modifiedDomain = {
        company_name: 'new_company_name'
      };

      adminDomainsServiceMock.update = sinon.stub().returns($q.when());

      var controller = initController();

      controller.domain = modifiedDomain;

      controller.update();

      expect(adminDomainsServiceMock.update).to.have.been.calledWith(modifiedDomain);
    });
  });
});
