'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminMaintenaceService', function() {
  var adminMaintenanceService, esnModuleRegistryMock;

  beforeEach(function() {
    module('linagora.esn.admin');

    esnModuleRegistryMock = {};

    module(function($provide) {
      $provide.value('esnModuleRegistry', esnModuleRegistryMock);
    });

    inject(function(_adminMaintenanceService_) {
      adminMaintenanceService = _adminMaintenanceService_;
    });
  });

  describe('The getMaintenanceModules method', function() {
    it('should return an array of maintenance modules', function() {
      var modules = [{
        title: 'module1',
        maintenance: {
          template: 'foo'
        }
      }, {
        title: 'module2'
      }, {
        title: 'module3',
        maintenance: {
          template: 'bar'
        }
      }];

      esnModuleRegistryMock.getAll = sinon.stub().returns(modules);

      expect(adminMaintenanceService.getMaintenanceModules()).to.deep.equal([
        modules[0],
        modules[2]
      ]);
      expect(esnModuleRegistryMock.getAll).to.have.been.calledOnce;
    });
  });
});
