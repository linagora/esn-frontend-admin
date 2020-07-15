'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminMailController', function() {
  var $controller, $rootScope, $stateParams, $scope;
  var adminDomainConfigService, adminMailService;
  var CONFIG_NAME = 'mail';

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _adminDomainConfigService_, _adminMailService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      adminDomainConfigService = _adminDomainConfigService_;
      adminMailService = _adminMailService_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminMailController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  it('should get Mail configuration from server on init', function() {
    var config = { mail: { noreply: 'value' }, transport: { module: 'module' } };

    adminDomainConfigService.get = sinon.stub().returns($q.when(config));

    var controller = initController();

    expect(controller.config).to.deep.equal(config);
    expect(adminDomainConfigService.get).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME);
  });

  describe('The save fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = {
        mail: {
          noreply: 'value'
        },
        transport: {
          module: 'value',
          config: {
            dir: 'value',
            browser: true
          }
        }
      };

      adminDomainConfigService.get = function() {
        return $q.when(configMock);
      };
    });

    it('should call adminDomainConfigService.set to save configuration', function(done) {
      var controller = initController();

      controller.config.transport.config.dir = 'new value';

      adminDomainConfigService.set = sinon.stub().returns($q.when());
      controller.save().then(function() {
        var config = adminMailService.qualifyTransportConfig(controller.transportType, controller.config);

        expect(adminDomainConfigService.set).to.have.been.calledWith($stateParams.domainId, CONFIG_NAME, config);
        done();
      });

      $scope.$digest();
    });
  });

});
