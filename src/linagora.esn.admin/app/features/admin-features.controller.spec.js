'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminFeaturesController', function() {

  var $rootScope, $stateParams, $scope, $controller;
  var adminDomainConfigService, adminFeaturesService;
  var configurationsMock;

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_, _adminFeaturesService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      adminFeaturesService = _adminFeaturesService_;

      $stateParams.domainId = 'domain123';
    });

    configurationsMock = { featureConfig: true };
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();
    var controller = $controller('adminFeaturesController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should include featursMetaData on successfully gotten configuration', function() {
      adminFeaturesService.includeFeaturesMetadata = sinon.spy();
      adminDomainConfigService.get = sinon.stub().returns($q.when(configurationsMock));

      initController();

      expect(adminFeaturesService.includeFeaturesMetadata).to.have.been.calledWith(configurationsMock);
      expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, 'features');
    });
  });

  describe('The save fn', function() {
    it('should call adminFeaturesService.getFeaturesConfigValue to get savable config object', function() {
      var expectedConfig = {feature1: true};
      var featuresMetadata = [{name: 'feature1'}];

      adminDomainConfigService.get = function() {
        return $q.when(configurationsMock);
      };
      adminFeaturesService.includeFeaturesMetadata = function() {
        return featuresMetadata;
      };
      adminDomainConfigService.set = sinon.stub().returns($q.when());
      adminFeaturesService.getFeaturesConfigValue = sinon.stub().returns(expectedConfig);

      var controller = initController();

      controller.save();
      $scope.$digest();

      expect(adminFeaturesService.getFeaturesConfigValue).to.have.been.calledWith(featuresMetadata);
      expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, 'features', expectedConfig);
    });
  });
});
