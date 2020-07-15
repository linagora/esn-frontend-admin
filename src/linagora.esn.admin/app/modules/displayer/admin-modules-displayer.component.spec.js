'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminModulesDisplayer component', function() {
  var $rootScope, $compile;
  var testModule, testConfig;
  var $httpBackend;

  beforeEach(function() {
    module('jadeTemplates');
    module('linagora.esn.admin', function() {});
    angular.module('linagora.esn.test', [])
      .run(function($templateCache) {
        $templateCache.put('test-config.html', '<ng-form name="form"><input type="text" name="test" ng-model="$ctrl.configurations.test_config.value" /></ng-form>');
      })
      .component('testConfig', {
        // must be templateUrl otherwise the inner form will not be able to
        // change the parent form's dirty state
        templateUrl: 'test-config.html',
        bindings: {
          configurations: '='
        }
      });
    module('linagora.esn.test');
  });

  beforeEach(inject(function(_$rootScope_, _$compile_, _$httpBackend_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(function() {
    testConfig = {
      name: 'test_config',
      value: 'test_value'
    };
    testModule = {
      id: 'linagora.esn.test',
      title: 'Test module',
      icon: '/test/images/test-icon.svg',
      config: {
        template: 'test-config',
        displayIn: {
          domain: true,
          platform: false
        },
        configurations: [testConfig]
      }
    };
  });

  function initComponent(data) {
    var scope = $rootScope.$new();

    $httpBackend.expectGET(testModule.icon).respond();

    data = data || { module: testModule};
    scope.module = data.module;

    var element = $compile('<admin-modules-displayer module="module" />')(scope);

    scope.$digest();

    return element;
  }

  it('should display the module title', function() {
    var element = initComponent();

    expect(element.find('h2 > span').html()).to.equal(testModule.title);
  });

  it('should display the module icon', function() {
    var element = initComponent();

    expect(element.find('.icon')).to.exist;
  });

  it('should make the card clickable when module has configurations', function() {
    var element = initComponent();

    expect(element.find('.card').hasClass('clickable')).to.be.true;
  });

  it('should not make the card clickable when module has no configuration', function() {
    delete testModule.config.configurations;

    var element = initComponent();

    expect(element.find('.card').hasClass('clickable')).to.be.false;
  });

  it('should collapse (hide) the configuration form by default', function() {
    var element = initComponent();

    expect(element.find('.form').hasClass('ng-hide')).to.be.true;
  });

  it('should expand (show) the configuration form on click', function() {
    var element = initComponent();

    element.find('.card-header').click();

    expect(element.find('.form').hasClass('ng-hide')).to.be.false;
  });

  it('should display the configuration form using the module template', function() {
    var element = initComponent();

    expect(element.find('input[name="test"]')).to.have.length(1);
  });

  describe('The save button', function() {
    it('should be disabled when nothing changed', function() {
      var element = initComponent();

      expect(element.find('admin-modules-save-button button').attr('disabled')).to.equal('disabled');
    });

    it('should be enabled when form is changed', function() {
      var element = initComponent();

      element.find('input[name="test"]')
        .trigger('focus')
        .val('new value')
        .trigger('input')
        .trigger('blur');

      expect(element.find('admin-modules-save-button button').attr('disabled')).to.not.exist;
    });
  });
});
