'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminModeSwitch component', function() {
  var $rootScope, $compile, session;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });

  beforeEach(inject(function(_$rootScope_, _$compile_, _session_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    session = _session_;

    session.userIsDomainAdministrator = function() { return true; };
    session.user = { isPlatformAdmin: true };
  }));

  function initComponent() {
    var scope = $rootScope.$new();
    var element = $compile('<admin-mode-switch />')(scope);

    scope.$digest();

    return element;
  }

  it('should display when current user has two admin roles', function() {
    var element = initComponent();

    expect(element.find('md-select:not([disabled])')).to.have.length(1);
  });

  it('should not display when current user is only domain admin', function() {
    session.user = { isPlatformAdmin: false };

    var element = initComponent();

    expect(element.find('md-select[disabled]')).to.have.length(1);
  });

  it('should not display when current user is only platform admin', function() {
    session.userIsDomainAdministrator = function() { return false; };

    var element = initComponent();

    expect(element.find('md-select[disabled]')).to.have.length(1);
  });
});
