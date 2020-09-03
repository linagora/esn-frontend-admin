'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminModulesController', function() {
  var $controller, $rootScope, $stateParams, $scope;
  var adminDomainConfigService, adminModulesService, modules, modulesConfig, moduleId;

  beforeEach(function() {
    moduleId = 'linagora.esn.community';
    modules = [{ id: moduleId, name: 'name', configurations: { key: 'key', value: 'value' } }];
    modulesConfig = [];
    adminDomainConfigService = {
      get: sinon.stub(),
      set: sinon.stub()
    };
    adminModulesService = {
      get: sinon.stub()
    };
  });

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin', function($provide) {
      $provide.value('adminDomainConfigService', adminDomainConfigService);
      $provide.value('adminModulesService', adminModulesService);
    });

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_, _adminModulesService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      adminModulesService = _adminModulesService_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminModulesController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should get Modules configurations from server', function() {
      adminModulesService.get.returns($q.when(modules));
      adminDomainConfigService.get.withArgs($stateParams.domainId, 'modules').returns($q.when(modulesConfig));

      var controller = initController();

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.modules).to.shallowDeepEqual(modules);
      expect(adminModulesService.get).to.have.been.calledWith($stateParams.domainId);
      expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, 'modules');
    });

    it('should set the enabled flag to undefined if module is not defined in configuration', function() {
      modulesConfig.push({
        id: 'I am not defined'
      });

      adminModulesService.get.returns($q.when(modules));
      adminDomainConfigService.get.withArgs($stateParams.domainId, 'modules').returns($q.when(modulesConfig));

      var controller = initController();

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.modules[0].enabled).to.be.undefined;
    });

    it('should set the enabled flag to false if module.enabled is false in configuration', function() {
      modulesConfig.push({
        id: moduleId,
        enabled: false
      });

      adminModulesService.get.returns($q.when(modules));
      adminDomainConfigService.get.withArgs($stateParams.domainId, 'modules').returns($q.when(modulesConfig));

      var controller = initController();

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.modules[0].enabled).to.be.false;
    });

    it('should set the enabled flag to undefined if module.enabled is undefined in configuration', function() {
      modulesConfig.push({
        id: moduleId
      });

      adminModulesService.get.returns($q.when(modules));
      adminDomainConfigService.get.withArgs($stateParams.domainId, 'modules').returns($q.when(modulesConfig));

      var controller = initController();

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.modules[0].enabled).to.be.undefined;
    });

    it('should set the enabled flag to true if module.enabled is true in configuration', function() {
      modulesConfig.push({
        id: moduleId,
        enabled: true
      });

      adminModulesService.get.returns($q.when(modules));
      adminDomainConfigService.get.withArgs($stateParams.domainId, 'modules').returns($q.when(modulesConfig));

      var controller = initController();

      controller.$onInit();
      $rootScope.$digest();

      expect(controller.modules[0].enabled).to.be.true;
    });
  });

  describe('The saveModuleEnabledState function', function() {
    it('should update the module configuration when already defined', function() {
      modulesConfig.push({ id: moduleId });
      adminDomainConfigService.get.returns($q.when(modulesConfig));
      adminDomainConfigService.set.returns($q.when());

      var value = 'The value';
      var module = { id: moduleId };
      var controller = initController();

      controller.saveModuleEnabledState(module, value);
      $rootScope.$digest();

      expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, 'modules');
      expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, 'modules', [{ id: moduleId, enabled: value }]);
    });

    it('should add the module configuration if not already defined', function() {
      adminDomainConfigService.get.returns($q.when(modulesConfig));
      adminDomainConfigService.set.returns($q.when());

      var value = 'The value';
      var module = { id: moduleId };
      var controller = initController();

      controller.saveModuleEnabledState(module, value);
      $rootScope.$digest();

      expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, 'modules');
      expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, 'modules', [{ id: moduleId, enabled: value }]);
    });
  });
});
