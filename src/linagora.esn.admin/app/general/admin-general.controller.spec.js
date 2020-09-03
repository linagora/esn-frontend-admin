'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminGeneralController', function() {

  var $rootScope, $stateParams, $scope, $controller;
  var adminDomainConfigService, homePageService;
  var configuraionsMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_, _homePageService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      homePageService = _homePageService_;

      $stateParams.domainId = 'domain123';
    });

    configuraionsMock = { datetime: 'value' };
    var homePages = { a: 'a', f: 'f', b: 'b' };

    homePageService.getHomePageCandidates = sinon.stub().returns(homePages);
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminGeneralController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should get a list of domain configurations if in domain mode', function() {
      adminDomainConfigService.getMultiple = sinon.stub().returns($q.when(configuraionsMock));
      var controller = initController();

      expect(controller.configs).to.deep.equal(configuraionsMock);
      expect(adminDomainConfigService.getMultiple).to.have.been.calledWith($stateParams.domainId, ['homePage', 'businessHours', 'datetime', 'language']);
      expect(homePageService.getHomePageCandidates).to.have.been.calledOnce;
    });

    it('should get a list of platform configurations if in platform mode', function() {
      adminDomainConfigService.getMultiple = sinon.stub().returns($q.when(configuraionsMock));
      $stateParams.domainId = 'platform';
      var controller = initController();

      expect(controller.configs).to.deep.equal(configuraionsMock);
      expect(adminDomainConfigService.getMultiple).to.have.been.calledWith($stateParams.domainId, ['homePage', 'businessHours', 'datetime']);
      expect(homePageService.getHomePageCandidates).to.have.been.calledOnce;
    });
  });

  describe('The save fn', function() {
    it('should call adminDomainConfigService.setMultiple to save configuration', function() {
      adminDomainConfigService.getMultiple = function() {
        return $q.when(configuraionsMock);
      };
      adminDomainConfigService.setMultiple = sinon.stub().returns($q.when());

      var controller = initController();

      controller.configs.datetime = 'new value';
      var expectConfigsToUpdate = [{ name: 'datetime', value: 'new value' }];

      controller.save();
      $scope.$digest();

      expect(adminDomainConfigService.setMultiple).to.have.been.calledWith($stateParams.domainId, expectConfigsToUpdate);
    });
  });
});
