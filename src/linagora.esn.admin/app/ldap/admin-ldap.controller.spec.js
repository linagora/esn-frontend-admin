'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminLdapController', function() {
  var $controller, $rootScope, $stateParams, $scope, $timeout, $elementMock;
  var adminDomainConfigService, elementScrollService;
  var CONFIG_NAME = 'ldap';

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    $elementMock = {
      find: function() {}
    };

    angular.mock.module(function($provide) {
      $provide.value('$element', $elementMock);
    });

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _$timeout_, _adminDomainConfigService_, _elementScrollService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      elementScrollService = _elementScrollService_;
      $timeout = _$timeout_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminLdapController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  it('should get LDAP configuration from server on init', function() {
    var configs = [{ key: 'value' }];

    adminDomainConfigService.get = sinon.stub().returns($q.when(configs));

    var controller = initController();

    expect(controller.configs).to.deep.equal(configs);
    expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME);
  });

  describe('The save fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = [{ name: 'name' }];

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should call adminDomainConfigService.set to save configuration', function(done) {
      var controller = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.when());
      controller.configs[0].name = 'new name';
      controller.save().then(function() {
        expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME, controller.configs);
        done();
      });

      $scope.$digest();
    });
  });

  describe('The _qualifyConfigs fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = [{ name: 'test' }];

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should return old config object when saving fail', function(done) {
      var ctrl = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.reject());
      ctrl.configs[0].name = 'new name';
      ctrl.configs[0].deleted = false;

      ctrl.save().catch(function() {
        expect(adminDomainConfigService.set).to.have.been.calledOnce;

        expect(ctrl.configs).to.deep.equal(configMock);
        done();
      });

      $scope.$digest();
    });

    it('should return configs without any empty object and with deleted is true', function(done) {
      var ctrl = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.when());
      ctrl.configs = [{}, { name: 'ldap1', deleted: true }, { name: 'ldap2', deleted: false }];

      ctrl.save().then(function() {
        expect(adminDomainConfigService.set).to.have.been.calledOnce;
        expect(ctrl.configs).to.deep.equal([{ name: 'ldap2' }]);
        done();
      });

      $scope.$digest();
    });
  });

  describe('The addForm fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = { key: 'value' };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };

      elementScrollService.scrollDownToElement = sinon.spy();
    });

    it('should add an empty object to configs', function() {
      var ctrl = initController();
      var newLdapConfig = {};

      ctrl.configs = [];
      ctrl.addForm();

      expect(ctrl.configs).to.deep.equal([newLdapConfig]);

      $timeout.flush();

      expect(elementScrollService.scrollDownToElement).to.have.been.calledOnce;
    });
  });

  describe('The showEmptyMessage fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = { key: 'value' };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should show empty message if LDAP configuration is undefined', function() {
      var controller = initController();

      controller.configs = undefined;
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should show empty message if have no LDAP configuration', function() {
      var controller = initController();

      controller.configs = [];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should show empty message if all empty LDAP configuration form have been deleted', function() {
      var controller = initController();

      controller.configs = [{ deleted: true }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should not show empty message if all LDAP configuration forms those contain a form that is not empty have been deleted', function() {
      var controller = initController();

      controller.configs = [{ name: 'some name', deleted: true }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.not.be.true;
    });

    it('should not show empty message if having a LDAP configuration form has not been deleted', function() {
      var controller = initController();

      controller.configs = [{ deleted: false }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.not.be.true;
    });
  });

});
