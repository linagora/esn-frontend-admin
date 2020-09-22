/* global chai: false */

var expect = chai.expect;

describe('The adminOidcFormController', function() {

  var $rootScope, $scope, $controller;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  function initController(scope, bindings) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminOidcFormController', { $scope: $scope }, bindings);

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit fn', function() {
    it('should return default configuration values when configuration is undefined', function() {
      var bindings = {
        oidcConfig: {}
      };

      var controller = initController(null, bindings);

      expect(controller.oidcConfig).to.deep.equal({});
    });

    it('should return existing configuration values ', function() {
      var bindings = {
        oidcConfig: {
          config1: 'value1',
          config2: 'value2'
        }
      };

      var controller = initController(null, bindings);

      expect(controller.oidcConfig).to.deep.equal({ config1: 'value1', config2: 'value2' });
    });
  });
});
