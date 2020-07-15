'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminDomainsCreateController', function() {
  var $controller, $rootScope, $scope;
  var adminDomainsService;

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _adminDomainsService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminDomainsService = _adminDomainsService_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();
    $scope.$hide = angular.noop;

    var controller = $controller('adminDomainsCreateController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The create fn', function() {
    it('should call adminDomainsService.create to create new domain', function(done) {
      var domain = {
        name: 'test',
        company_name: 'abc',
        administrator: {
          email: 'abc@email.com',
          password: 'secret'
        }
      };

      adminDomainsService.create = sinon.stub().returns($q.when());

      var controller = initController();

      controller.domain = domain;

      controller.create().then(function() {
        expect(adminDomainsService.create).to.have.been.calledWith(domain);

        done();
      });

      $rootScope.$digest();
    });
  });
});
