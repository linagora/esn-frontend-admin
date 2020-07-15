'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminOauthController', function() {

  var $controller, $rootScope, $stateParams, $scope;
  var adminDomainConfigService, configMock;
  var CONFIG_NAME = 'oauth';

  beforeEach(function() {
    configMock = {
      twitter: {
        consumer_secret: 'secret',
        consumer_key: 'key'
      }
    };

    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;

      adminDomainConfigService.get = sinon.stub().returns($q.when(configMock));
      $stateParams.domainId = 'platform';
    });

  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminOauthController', { $scope: $scope });

    controller.$onInit();

    $scope.$digest();

    return controller;
  }

  it('should get oauth configuration from server on init', function() {
    var expectEnabledOauths = { twitter: true };
    var controller = initController();

    expect(controller.config).to.deep.equal(configMock);
    expect(controller.enabledOauths).to.deep.equal(expectEnabledOauths);
    expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME);
  });

  describe('The save fn', function() {
    it('should call adminDomainConfigService.set to save configuration', function(done) {
      var controller = initController();

      adminDomainConfigService.set = sinon.stub().returns($q.when());
      controller.config.twitter.consumer_key = 'new key';
      controller.config.twitter.consumer_secret = 'new secret';
      controller.save().then(function() {
        expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME, controller.config);
        done();
      });

      $scope.$digest();
    });
  });

});
