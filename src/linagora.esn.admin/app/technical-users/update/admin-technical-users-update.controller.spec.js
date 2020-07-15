'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminTechnicalUsersUpdateController', function() {
  var $controller, $rootScope, $scope, $stateParams, esnTechnicalUserAPIClient;
  var technicalUserMock, bindings;
  var ADMIN_TECHNICAL_USERS_EVENTS;

  beforeEach(function() {
    technicalUserMock = {
      name: 'James',
      type: 'dav',
      data: [
        { key: 'a', value: 'a' },
        { key: 'b', value: 'b' }
      ]
    };

    bindings = {
      technicalUser: technicalUserMock
    };

    module('linagora.esn.admin');

    module(function($provide) {
      $provide.value('asyncAction', function(message, action) {
        return action();
      });
      $provide.value('technicalUser', technicalUserMock);
    });

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _esnTechnicalUserAPIClient_, _ADMIN_TECHNICAL_USERS_EVENTS_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      esnTechnicalUserAPIClient = _esnTechnicalUserAPIClient_;

      ADMIN_TECHNICAL_USERS_EVENTS = _ADMIN_TECHNICAL_USERS_EVENTS_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(bindings) {
    $scope = $rootScope.$new();

    var controller = $controller('adminTechnicalUsersUpdateController', { $scope: $scope }, bindings);

    $scope.$digest();

    return controller;
  }

  describe('onEditBtnClick fn', function() {
    it('should call esnTechnicalUserAPIClient update function', function() {
      esnTechnicalUserAPIClient.update = sinon.stub().returns($q.when([]));

      var controller = initController(bindings);

      controller.onEditBtnClick();

      expect(esnTechnicalUserAPIClient.update).to.have.been.calledOnce;
      expect(esnTechnicalUserAPIClient.update).to.have.been.calledWith($stateParams.domainId, technicalUserMock);
    });

    it('should emit ADMIN_TECHNICAL_USERS_EVENTS.UPDATED if success to update a technical user', function(done) {
      esnTechnicalUserAPIClient.update = sinon.stub().returns($q.when([]));
      $rootScope.$emit = sinon.spy();

      var controller = initController(bindings);

      controller.onEditBtnClick()
        .then(function() {
          expect($rootScope.$emit).to.have.been.calledOnce;
          expect($rootScope.$emit).to.have.been.calledWith(ADMIN_TECHNICAL_USERS_EVENTS.UPDATED, bindings.technicalUser);
          done();
        })
        .catch(function(err) {
          done(err || new Error('should resolve'));
        });
      $rootScope.$digest();
    });

    it('should reject if failed to update a technical user', function(done) {
      esnTechnicalUserAPIClient.update = sinon.stub().returns($q.reject(new Error('something wrong')));
      $rootScope.$emit = sinon.spy();

      var controller = initController(bindings);

      controller.onEditBtnClick()
        .then(function() {
          done(new Error('should not resolve'));
        })
        .catch(function(err) {
          expect($rootScope.$emit).to.not.have.been.called;
          expect(err.message).to.equal('something wrong');
          done();
        });

      $rootScope.$digest();
    });
  });

});
