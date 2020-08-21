'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminSidebar component', function() {
  var $rootScope, $compile, adminModeService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin', function($provide) {
      $provide.constant('ADMIN_PAGES', [{
        id: 'domain',
        name: 'Domain',
        icon: 'mdi-domain',
        displayIn: {
          domain: true,
          platform: false
        }
      }, {
        id: 'platform',
        name: 'Platform',
        icon: 'mdi-platform',
        displayIn: {
          domain: false,
          platform: true
        }
      }]);
    });
  });

  beforeEach(inject(function(_$rootScope_, _$compile_, _adminModeService_) {
    $rootScope = _$rootScope_;
    $compile = _$compile_;
    adminModeService = _adminModeService_;
  }));

  function initComponent() {
    var scope = $rootScope.$new();
    var element = $compile('<admin-sidebar />')(scope);

    scope.$digest();

    return element;
  }

  it('should show only platform pages when user is in platform mode', function() {
    adminModeService.isPlatformMode = function() { return true; };

    var element = initComponent();

    expect(element.find('a.lv-item')).to.have.length(1);
    expect(element.find('a.lv-item').html()).to.contain('Platform');
  });

  it('should show only domain pages when user is in domain mode', function() {
    adminModeService.isPlatformMode = function() { return false; };

    var element = initComponent();

    expect(element.find('a.lv-item')).to.have.length(1);
    expect(element.find('a.lv-item').html()).to.contain('Domain');
  });

  it('should listen on mode change to display the right pages', function() {
    adminModeService.isPlatformMode = function() { return true; };

    var element = initComponent();

    expect(element.find('a.lv-item')).to.have.length(1);
    expect(element.find('a.lv-item').html()).to.contain('Platform');

    adminModeService.isPlatformMode = function() { return false; };

    element.scope().$digest();

    expect(element.find('a.lv-item')).to.have.length(1);
    expect(element.find('a.lv-item').html()).to.contain('Domain');
  });

});
