'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;
const inboxAPi = require('esn-api-client/src/api/inbox');

describe('The InboxConfigFormController controller', function() {
  let $rootScope, $controller, $scope, $stateParams;
  let INBOX_CONFIG_EVENTS, inboxAPiMock, sandbox;

  beforeEach(function() {


    angular.mock.module('linagora.esn.admin');
 
    angular.mock.inject(function(
      _$rootScope_,
      _$controller_,
      _$stateParams_,
      _INBOX_CONFIG_EVENTS_
    ) {
      $rootScope = _$rootScope_;
      $controller = _$controller_;
      $stateParams = _$stateParams_;
      INBOX_CONFIG_EVENTS = _INBOX_CONFIG_EVENTS_;
    });
  });

beforeEach(function(){
sandbox=sinon.sandbox.create();
  inboxAPiMock={
    updateForwardingConfigurations: sinon.stub().returns(Promise.resolve())
  }

  sandbox.stub(inboxAPi, 'default', function () {
    return {
        inboxForwarding: inboxAPiMock
    };
  });
});
  afterEach(function () {
    sandbox.restore();
  });

  function initController() {
    $scope = $rootScope.$new();

    var controller = $controller('InboxConfigFormController', { $scope: $scope });

    controller.configurations = {
      forwarding: {},
      isLocalCopyEnabled: {}
    };
    controller.availableModes = {
      domain: 'domain'
    };
    controller.mode = 'domain';

    controller.registerPostSaveHandler = sinon.spy();


    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should copy configs from configurations', function() {
      var controller = initController();

      controller.$onInit();

      expect(controller.forwardingConfigs).to.deep.equal(controller.configurations);
    });

    it('should register post save handler', function() {
      var controller = initController();

      controller.$onInit();

      expect(controller.registerPostSaveHandler)
        .to.have.been.calledWith(sinon.match.func);
    });

    it('should not register post save handler if not in domain mode', function() {
      var controller = initController();

      controller.mode = 'not-domain-mode';
      controller.$onInit();

      expect(controller.forwardingConfigs).to.be.undefined;
      expect(controller.registerPostSaveHandler)
        .to.not.have.been.called;
    });
  });

  describe('The post save handler (_updateForwardingConfigurations function)', function() {
    var postSaveHandler;
    var controller;

    beforeEach(function() {
      controller = initController();
      controller.registerPostSaveHandler = function(handler) {
        postSaveHandler = handler;
      };
      controller.configurations = {
        forwarding: { value: true },
        isLocalCopyEnabled: { value: false }
      };
      controller.$onInit();

      $rootScope.$digest();
    });

    it('should call inboxApi.updateForwardingConfigurations to update forwarding configurations', function(done) {
      $stateParams.domainId = 'domain-id';
      var configs = {
        forwarding: controller.forwardingConfigs.forwarding.value,
        isLocalCopyEnabled: controller.forwardingConfigs.isLocalCopyEnabled.value
      };


      postSaveHandler().then(function() {
        expect(inboxAPiMock.updateForwardingConfigurations).to.have.been.calledWith($stateParams.domainId, configs);
        done();
      });

      $rootScope.$digest();
    });

    it('should revert configs if failed to update forwarding configurations', function(done) {
      controller.forwardingConfigs.forwarding.value = !controller.configurations.forwarding.value;
      controller.forwardingConfigs.isLocalCopyEnabled.value = !controller.configurations.isLocalCopyEnabled.value;

      inboxAPiMock.updateForwardingConfigurations = sinon.stub().returns($q.when());

      postSaveHandler().then(function() {
        expect(controller.forwardingConfigs.forwarding.value).to.equal(!controller.configurations.forwarding.value);
        expect(controller.forwardingConfigs.isLocalCopyEnabled.value).to.equal(!controller.configurations.isLocalCopyEnabled.value);

        controller.forwardingConfigs.forwarding.value = controller.configurations.forwarding.value;
        controller.forwardingConfigs.isLocalCopyEnabled.value = controller.configurations.isLocalCopyEnabled.value;

        inboxAPiMock.updateForwardingConfigurations = sinon.stub().returns($q.reject('update failed'));

        postSaveHandler().catch(function() {
          expect(controller.forwardingConfigs.forwarding.value).to.equal(!controller.configurations.forwarding.value);
          expect(controller.forwardingConfigs.isLocalCopyEnabled.value).to.equal(!controller.configurations.isLocalCopyEnabled.value);
          done();
        });
      });

      $rootScope.$digest();
    });
  });

  it('should revert forwarding value and isLocalCopyEnabled value if need when INBOX_CONFIG_EVENTS.DISABLE_FORWARDING_CANCELLED event fire', function() {
    var controller = initController();

    controller.configurations.forwarding.value = true;
    controller.configurations.isLocalCopyEnabled.value = true;

    controller.$onInit();
    $rootScope.$digest();

    controller.forwardingConfigs.forwarding.value = false;
    controller.forwardingConfigs.isLocalCopyEnabled.value = false;

    $rootScope.$broadcast(INBOX_CONFIG_EVENTS.DISABLE_FORWARDING_CANCELLED);

    expect(controller.forwardingConfigs.forwarding.value).to.be.true;
    expect(controller.forwardingConfigs.isLocalCopyEnabled.value).to.be.true;
  });

  it('should not revert isLocalCopyEnabled value if it is currently false when INBOX_CONFIG_EVENTS.DISABLE_FORWARDING_CANCELLED event fire', function() {
    var controller = initController();

    controller.configurations.forwarding.value = true;
    controller.configurations.isLocalCopyEnabled.value = false;

    controller.$onInit();
    $rootScope.$digest();

    controller.forwardingConfigs.forwarding.value = false;

    $rootScope.$broadcast(INBOX_CONFIG_EVENTS.DISABLE_FORWARDING_CANCELLED);

    expect(controller.forwardingConfigs.forwarding.value).to.be.true;
    expect(controller.forwardingConfigs.isLocalCopyEnabled.value).to.be.false;
  });

  it('should revert isLocalCopyEnabled value when INBOX_CONFIG_EVENTS.DISABLE_LOCAL_COPY_CANCELLED event fire', function() {
    var controller = initController();

    controller.configurations.isLocalCopyEnabled.value = true;

    controller.$onInit();
    $rootScope.$digest();

    controller.forwardingConfigs.isLocalCopyEnabled.value = false;

    $rootScope.$broadcast(INBOX_CONFIG_EVENTS.DISABLE_LOCAL_COPY_CANCELLED);

    expect(controller.forwardingConfigs.isLocalCopyEnabled.value).to.be.true;
  });
});
