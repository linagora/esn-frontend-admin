/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The adminOidcController', function() {
  let $controller, $rootScope, $scope, $timeout, $elementMock, ADMIN_MODE;
  let adminDomainConfigService, elementScrollService;
  const CONFIG_NAME = 'openid-connect';

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    $elementMock = {
      find: function() {}
    };

    angular.mock.module(function($provide) {
      $provide.value('$element', $elementMock);
    });

    inject(function(_$controller_, _$rootScope_, _$timeout_, _adminDomainConfigService_, _elementScrollService_, _ADMIN_MODE_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      adminDomainConfigService = _adminDomainConfigService_;
      elementScrollService = _elementScrollService_;
      $timeout = _$timeout_;
      ADMIN_MODE = _ADMIN_MODE_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminOidcController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  it('should get OIDC configuration from server on init', function() {
    const configs = { clients: [{ key: 'value' }] };

    adminDomainConfigService.get = sinon.stub().returns($q.when(configs));

    const controller = initController();

    expect(controller.configs).to.deep.equal(configs.clients);
    expect(adminDomainConfigService.get).to.have.been.calledWith(ADMIN_MODE.platform, CONFIG_NAME);
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
      controller.save().then(function() {
        expect(adminDomainConfigService.set).to.have.been.calledWith(ADMIN_MODE.platform, CONFIG_NAME, { clients: controller.configs });
        done();
      });

      $scope.$digest();
    });
  });

  describe('The _qualifyConfigs fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = { clients: [{ client_id: 'test' }] };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should return old config object when saving fail', function(done) {
      var ctrl = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.reject());
      ctrl.configs[0].client_id = 'new name';
      ctrl.configs[0].deleted = false;

      ctrl.save()
        .then(() => done(new Error('Should not be called')))
        .catch(() => {
          expect(adminDomainConfigService.set).to.have.been.calledOnce;

          expect(ctrl.configs).to.deep.equal(configMock.clients);
          done();
        });

      $scope.$digest();
    });

    it('should return configs without any empty object and with deleted is true', function(done) {
      var ctrl = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.when());
      ctrl.configs = [null, {}, { client_id: 'OIDC1', deleted: true }, { client_id: 'OIDC2', deleted: false }];

      ctrl.save()
        .then(() => {
          expect(adminDomainConfigService.set).to.have.been.calledOnce;
          expect(ctrl.configs).to.shallowDeepEqual([{ client_id: 'OIDC2' }]);
          done();
        })
        .catch(() => done(new Error('Should not be called')));

      $scope.$digest();
    });
  });

  describe('The addForm fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = { clients: [{ key: 'value' }] };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };

      elementScrollService.scrollDownToElement = sinon.spy();
    });

    it('should add an empty object to configs', function() {
      var ctrl = initController();
      var newOIDCConfig = {};

      ctrl.configs = [];
      ctrl.addForm();

      expect(ctrl.configs).to.deep.equal([newOIDCConfig]);

      $timeout.flush();

      expect(elementScrollService.scrollDownToElement).to.have.been.calledOnce;
    });
  });

  describe('The showEmptyMessage fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = { clients: [{ key: 'value' }] };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should show empty message if OIDC configuration is undefined', function() {
      var controller = initController();

      controller.configs = undefined;
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should show empty message if have no OIDC configuration', function() {
      var controller = initController();

      controller.configs = [];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should show empty message if all empty OIDC configuration form have been deleted', function() {
      var controller = initController();

      controller.configs = [{ deleted: true }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.true;
    });

    it('should not show empty message if all OIDC configuration forms those contain a form that is not empty have been deleted', function() {
      var controller = initController();

      controller.configs = [{ client_id: 'client_id', deleted: true }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.false;
    });

    it('should not show empty message if having a OIDC configuration form has not been deleted', function() {
      var controller = initController();

      controller.configs = [{ client_id: 'client_id', deleted: false }];
      var isShowEmptyMessage = controller.showEmptyMessage(controller.configs);

      expect(isShowEmptyMessage).to.be.false;
    });
  });

});
