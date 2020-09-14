'use strict';

/* global chai, sinon: false */

const { expect } = chai;
const contactApi = require('esn-api-client/src/api/contact');

describe('The adminMaintenanceContactDomainMembersController controller', function() {
  let $controller, $rootScope, $stateParams;
  let sandbox, domainMemberAddressbookMock;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin', function($provide) {
      $stateParams = {
        domainId: 'platform'
      };

      $provide.value('$stateParams', $stateParams);
    });

    angular.mock.inject(function(_$controller_, _$rootScope_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
    });
  });

  beforeEach(function() {
    sandbox = sinon.sandbox.create();

    domainMemberAddressbookMock = {
      synchronize: sinon.stub().returns(Promise.resolve()),
      synchronizeForDomain: sinon.stub().returns(Promise.resolve())
    };

    sandbox.stub(contactApi, 'default', function() {
      return {
        domainMemberAddressbook: domainMemberAddressbookMock
      };
    });
  });

  afterEach(function() {
    sandbox.restore();
  });

  function initController($scope) {
    $scope = $scope || $rootScope.$new();

    var controller = $controller('adminMaintenanceContactDomainMembersController', { $scope: $scope });

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('The $onInit function', function() {
    it('should get domain Id from the state parameter', function() {
      $stateParams.domainId = '123123';
      var controller = initController();

      expect(controller.domainId).to.equal('123123');
    });

    it('should set doman Id to an empty string if state parameter is null', function() {
      $stateParams.domainId = null;
      var controller = initController();

      expect(controller.domainId).to.equal('');
    });

    it('should set domain Id to an empty string if the state parameter value is platform', function() {
      var controller = initController();

      expect(controller.domainId).to.equal('');
    });
  });

  describe('The onSyncBtnClick method', function() {
    it('should call synchronizeForDomain and resolve if domain ID param is not platform', function(done) {
      $stateParams.domainId = 'somethingsomething';
      var controller = initController();

      controller.onSyncBtnClick()
        .then(function() {
          expect(domainMemberAddressbookMock.synchronize).to.not.have.been.called;
          expect(domainMemberAddressbookMock.synchronizeForDomain).to.have.been.calledOnce;
          done();
        })
        .catch(done);

      $rootScope.$digest();
    });

    it('should call synchronizeForDomain and reject if failed to synchronize domain members address book for domain', function(done) {
      domainMemberAddressbookMock.synchronizeForDomain = sinon.stub().returns($q.reject());
      $stateParams.domainId = 'somethingsomething';
      var controller = initController();

      controller.onSyncBtnClick()
        .then(function() {
          done(new Error('should not resolve'));
        })
        .catch(function() {
          expect(domainMemberAddressbookMock.synchronize).to.not.have.been.called;
          expect(domainMemberAddressbookMock.synchronizeForDomain).to.have.been.calledOnce;
          done();
        });

      $rootScope.$digest();
    });

    it('should reject if failed to synchronize domain members address books', function(done) {
      domainMemberAddressbookMock.synchronize = sinon.stub().returns($q.reject());

      var controller = initController();

      controller.onSyncBtnClick()
        .then(function() {
          done('should not resolve');
        })
        .catch(function() {
          expect(domainMemberAddressbookMock.synchronize).to.have.been.calledOnce;
          expect(domainMemberAddressbookMock.synchronizeForDomain).to.not.have.been.called;
          done();
        });

      $rootScope.$digest();
    });

    it('should resolve if success to synchronize domain members address books', function(done) {
      var controller = initController();

      controller.onSyncBtnClick()
        .then(function() {
          expect(domainMemberAddressbookMock.synchronize).to.have.been.calledOnce;
          expect(domainMemberAddressbookMock.synchronizeForDomain).to.not.have.been.called;
          done();
        })
        .catch(function(err) {
          done(err || 'should resolve');
        });

      $rootScope.$digest();
    });
  });
});
