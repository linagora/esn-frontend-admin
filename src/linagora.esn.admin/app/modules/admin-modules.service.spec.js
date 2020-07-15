'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminModulesService service', function() {
  var $rootScope, adminModulesService, adminConfigApi, esnModuleRegistry;
  var ADMIN_MODE;
  var DOMAIN_ID = 'domain123';

  beforeEach(module('linagora.esn.admin'));

  beforeEach(function() {
    angular.mock.inject(function(_$rootScope_, _adminConfigApi_, _adminModulesService_, _esnModuleRegistry_, _ADMIN_MODE_) {
      $rootScope = _$rootScope_;
      adminConfigApi = _adminConfigApi_;
      adminModulesService = _adminModulesService_;
      esnModuleRegistry = _esnModuleRegistry_;
      ADMIN_MODE = _ADMIN_MODE_;
    });

    esnModuleRegistry.getAll = sinon.stub().returns({});
  });

  describe('The get fn', function() {
    var modulesmetadataMock;
    var module1, module2, module3;

    beforeEach(function() {
      module1 = {
        id: 'linagora.esn.module1',
        title: 'Module 1',
        homePage: 'module1'
      };
      module2 = {
        id: 'linagora.esn.module2',
        title: 'Module 2',
        homePage: 'module2',
        config: {
          displayIn: {
            platform: true,
            domain: false
          }
        }
      };
      module3 = {
        id: 'linagora.esn.module3',
        title: 'Module 3',
        homePage: 'module3',
        config: {
          displayIn: {
            platform: false,
            domain: true
          }
        }
      };

      modulesmetadataMock = {};
      modulesmetadataMock[module1.id] = module1;
      modulesmetadataMock[module2.id] = module2;
      modulesmetadataMock[module3.id] = module3;

      esnModuleRegistry.getAll = sinon.stub().returns(modulesmetadataMock);
    });

    it('should inspect only modules those have configurations (in domain mode)', function() {
      var domainId = 'domainId';

      adminConfigApi.inspect = sinon.stub().returns($q.when());

      adminModulesService.get(domainId);

      expect(esnModuleRegistry.getAll).to.have.been.calledOnce;
      expect(adminConfigApi.inspect).to.have.been.calledWith(domainId, [module3.id]);
    });

    it('should inspect only modules those have configurations (in platform mode)', function() {
      var domainId = ADMIN_MODE.platform;

      adminConfigApi.inspect = sinon.stub().returns($q.when());

      adminModulesService.get(domainId);

      expect(esnModuleRegistry.getAll).to.have.been.calledOnce;
      expect(adminConfigApi.inspect).to.have.been.calledWith(domainId, [module2.id]);
    });

    it('should return metadata of all modules and with inspected configurations', function(done) {
      var domainId = 'domainId';
      var response = [{
        name: module3.id,
        configurations: [{ name: 'a key', value: 'a value' }]
      }];

      adminConfigApi.inspect = function() {
        return $q.when(response);
      };

      adminModulesService
        .get(domainId)
        .then(function(modules) {
          var expectedModules = {};

          expectedModules[module1.id] = module1;
          expectedModules[module2.id] = module2;
          expectedModules[module3.id] = module3;
          module3.config.configurations = response[0].configurations;

          expect(modules).to.deep.equal(expectedModules);

          done();
        });

      $rootScope.$digest();
    });
  });

  describe('The set fn', function() {
    it('should set only writable configurations', function() {
      adminConfigApi.set = sinon.spy();

      var modulesToSet = [{
        id: 'linagora.esn.test',
        config: {
          configurations: [{
            name: 'config_unwritable',
            value: 'a value'
          }, {
            name: 'config_without_value',
            writable: true
          }, {
            name: 'config_writable',
            writable: true,
            value: 'a value'
          }]
        }
      }];

      adminModulesService.set(DOMAIN_ID, modulesToSet);

      expect(adminConfigApi.set).to.have.been.calledOnce;
      expect(adminConfigApi.set).to.have.been.calledWith(DOMAIN_ID, [{
        name: 'linagora.esn.test',
        configurations: [{
          name: 'config_writable',
          value: 'a value'
        }]
      }]);
    });

    it('should not be called if there are not any writable configurations', function() {
      adminConfigApi.set = sinon.spy();

      var modulesToSet = [{
        id: 'linagora.esn.test1',
        config: {
          configurations: [{
            name: 'config_unwritable',
            value: 'a value'
          }]
        }
      },
      {
        id: 'linagora.esn.test2',
        config: {
          configurations: [{
            name: 'config_unwritable',
            value: 'a value'
          }]
        }
      }];

      adminModulesService.set(DOMAIN_ID, modulesToSet);

      expect(adminConfigApi.set).to.not.have.been.called;
    });
  });
});
