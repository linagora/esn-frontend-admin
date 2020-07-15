'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminDomainsFormHostnames component', function() {
  var $rootScope, $compile;

  beforeEach(function() {
    module('jadeTemplates');
    module('linagora.esn.admin');
  });

  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  function initComponent(html, scope) {
    var $scope = scope || $rootScope.$new();
    var element = $compile(html)(scope);

    $scope.$digest();

    return element;
  }

  it('should add new hostname input field when user click on Add a new hostname button', function() {
    var scope = $rootScope.$new();

    scope.domain = {
      hostnames: ['openpaas']
    };

    var element = initComponent('<admin-domains-form domain="domain"/>', scope);

    expect(element.find('[ng-model="hostname.name"]').length).to.equal(1);

    element.find('[ng-click="$ctrl.addHostname()"]')[0].click();

    expect(element.find('[ng-model="hostname.name"]').length).to.equal(2);
  });

  it('should remove input field when user click on corresponding delete button', function() {
    var scope = $rootScope.$new();

    scope.domain = {
      hostnames: ['openpaas', 'linagora']
    };

    var element = initComponent('<admin-domains-form domain="domain"/>', scope);

    expect(element.find('[ng-model="hostname.name"]').length).to.equal(2);

    element.find('.mdi-minus-circle-outline')[1].click();

    expect(element.find('[ng-model="hostname.name"]').length).to.equal(1);
    expect(element.find('[name="hostname"]')[0].value).to.equal('openpaas');
  });

});
