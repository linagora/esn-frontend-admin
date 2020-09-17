'use strict';

/* global chai: false */
/* global sinon: false */

const { expect } = chai;

describe('The jamesConfigFormController', function() {
  let $controller, $rootScope, $scope;
  let session, jamesApiClientMock;

  beforeEach(function() {
    jamesApiClientMock = {
      getDomainQuota: sinon.stub().returns($q.when({ count: 10, size: 10000 })),
      setDomainQuota: sinon.stub().returns($q.when()),
      getPlatformQuota: sinon.stub().returns($q.when({ count: 50, size: 50000 })),
      setPlatformQuota: sinon.stub().returns($q.when())
    };

    angular.mock.module('linagora.esn.admin');
    angular.mock.module('esn.configuration', function($provide) {
      $provide.value('esnConfig', function() {});
    });
    angular.mock.module(function($provide) {
      $provide.factory('jamesApiClient', function() { return jamesApiClientMock; });
    });

    angular.mock.inject(function(
      _$controller_,
      _$rootScope_,
      _$q_,
      _session_
    ) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      session = _session_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('jamesConfigFormController', { $scope: $scope });

    controller.availableModes = {
      domain: 'domain',
      platform: 'platform'
    };

    controller.registerPostSaveHandler = sinon.spy();

    controller.configurations = {
      webadminApiFrontend: { value: 'http://james.webadmin.api' }
    };

    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should register post save handler', function() {
      var controller = initController();

      controller.$onInit();

      expect(controller.registerPostSaveHandler)
        .to.have.been.calledWith(sinon.match.func);
    });

    it('should try to connect when the webadminApiFrontend is defined', function() {
      var controller = initController();

      controller.$onInit();

      expect(controller.connectionStatus).to.equal('connecting');
    });

    it('should not try to connect when the webadminApiFrontend is not defined', function() {
      var controller = initController();

      controller.configurations.webadminApiFrontend.value = null;
      controller.$onInit();

      expect(controller.connectionStatus).to.be.undefined;
    });
  });

  describe('The post save handler (_saveJamesConfigurations fn)', function() {
    var postSaveHandler;
    var controller;

    beforeEach(function() {
      controller = initController();
      controller.registerPostSaveHandler = function(handler) {
        postSaveHandler = handler;
      };
      controller.$onInit();

      $rootScope.$digest();
    });

    it('should do nothing and resolve if the connection status is not "connected"', function(done) {
      controller.connectionStatus = 'foo';

      postSaveHandler().then(function() {
        expect(jamesApiClientMock.setPlatformQuota).to.not.have.been.called;
        expect(jamesApiClientMock.setDomainQuota).to.not.have.been.called;
        done();
      });

      $rootScope.$digest();
    });

    it('should call James API to set platform quota', function(done) {
      controller.connectionStatus = 'connected';
      controller.config = { quota: { count: 10, size: 12 } };

      postSaveHandler().then(function() {
        expect(jamesApiClientMock.setPlatformQuota).to.have.been.calledWith(controller.config.quota);
        done();
      });

      $rootScope.$digest();
    });

    it('should call James API to set domain quota', function(done) {
      var domain = { _id: '123' };

      session.domain = domain;
      controller.connectionStatus = 'connected';
      controller.config = { quota: { count: 10, size: 12 } };
      controller.mode = 'domain';

      postSaveHandler().then(function() {
        expect(jamesApiClientMock.setDomainQuota).to.have.been.calledWith(domain._id, controller.config.quota);
        done();
      });

      $rootScope.$digest();
    });

    it('should qualify quota configuration before saving', function(done) {
      controller.connectionStatus = 'connected';
      controller.config = { quota: { count: 0, size: -100 } };

      postSaveHandler().then(function() {
        expect(jamesApiClientMock.setPlatformQuota).to.have.been.calledWith({ count: null, size: null });
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('The onServerUrlChange fn', function() {
    var form;

    beforeEach(function() {
      form = { $setPristine: sinon.spy() };
    });

    it('should not try to connect when the webadminApiFrontend is not defined', function() {
      var controller = initController();

      controller.configurations.webadminApiFrontend.value = null;
      controller.onServerUrlChange(form);

      expect(controller.connectionStatus).to.be.undefined;
    });

    it('should make the given form pristine', function() {
      var controller = initController();

      controller.onServerUrlChange(form);

      expect(form.$setPristine).to.have.been.calledOnce;
    });

    it('should reset config and try to connect', function() {
      var controller = initController();

      controller.onServerUrlChange(form);

      expect(controller.connectionStatus).to.equal('connecting');
      expect(controller.config).to.be.empty;
    });

    it('should call James API to get config and assign to controller on success', function() {
      var controller = initController();

      jamesApiClientMock.getPlatformQuota = sinon.stub().returns($q.when({ size: 11, count: 12 }));
      controller.onServerUrlChange(form);

      $rootScope.$digest();

      expect(controller.config).to.shallowDeepEqual({ quota: { size: 11, count: 12 } });
      expect(controller.connectionStatus).to.equal('connected');
    });

    it('should call James API to get config of domain and assign to controller on success', function(done) {
      var controller = initController();

      controller.$onInit();

      controller.mode = 'domain';
      jamesApiClientMock.getDomainQuota = sinon.stub().returns($q.when({ size: 11, count: 12 }));
      controller.onServerUrlChange(form);

      $rootScope.$digest();

      expect(controller.config).to.shallowDeepEqual({ quota: { size: 11, count: 12 } });
      expect(controller.connectionStatus).to.equal('connected');
      done();
    });

    it('should qualify quota configuration before assigning to controller', function() {
      var controller = initController();

      jamesApiClientMock.getPlatformQuota = sinon.stub().returns($q.when({ size: -11, count: -12 }));
      controller.onServerUrlChange(form);

      $rootScope.$digest();

      expect(controller.config).to.shallowDeepEqual({ quota: { size: null, count: null } });
    });

    it('should set connectionStatus error on failure', function() {
      var controller = initController();

      jamesApiClientMock.getPlatformQuota = sinon.stub().returns($q.reject(new Error('an_error')));
      controller.onServerUrlChange(form);

      $rootScope.$digest();

      expect(controller.connectionStatus).to.equal('error');
    });
  });
});
