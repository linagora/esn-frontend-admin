'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminTechnicalUsersAddController', function() {
  var $controller, $rootScope, $scope, $stateParams, esnTechnicalUserAPIClient;
  var technicalUser;
  var ADMIN_TECHNICAL_USERS_EVENTS;

  beforeEach(function() {
    technicalUser = {
      name: 'James',
      type: 'dav',
      data: [
        { key: 'a', value: 'a' },
        { key: 'b', value: 'b' }
      ]
    };

    module('linagora.esn.admin');

    module(function($provide) {
      $provide.value('asyncAction', function(message, action) {
        return action();
      });
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

    var controller = $controller('adminTechnicalUsersAddController', { $scope: $scope }, bindings);

    $scope.$digest();

    return controller;
  }

  describe('onAddBtnClick fn', function() {
    it('should call esnTechnicalUserAPIClient add function', function() {
      var bindings = {
        technicalUser: technicalUser
      };

      esnTechnicalUserAPIClient.add = sinon.stub().returns($q.when([]));

      var controller = initController(bindings);

      controller.onAddBtnClick();

      expect(esnTechnicalUserAPIClient.add).to.have.been.calledOnce;
      expect(esnTechnicalUserAPIClient.add).to.have.been.calledWith($stateParams.domainId, technicalUser);
    });

    it('should emit onAddedTechnicalUser if success to add a technical user', function(done) {
      var bindings = {
          technicalUser: technicalUser
      };

      var createdTechnicalUser = {};

      esnTechnicalUserAPIClient.add = sinon.stub().returns($q.when(createdTechnicalUser));
      $rootScope.$emit = sinon.spy();

      var controller = initController(bindings);

      controller.onAddBtnClick()
        .then(function() {
          expect($rootScope.$emit).to.have.been.calledOnce;
          expect($rootScope.$emit).to.have.been.calledWith(ADMIN_TECHNICAL_USERS_EVENTS.ADDED, createdTechnicalUser);
          done();
        })
        .catch(function(err) {
            done(err || new Error('should resolve'));
        });

      $rootScope.$digest();
    });

    it('should reject if failed to add new technical user', function(done) {
      var bindings = {
          technicalUser: technicalUser
      };

      esnTechnicalUserAPIClient.add = sinon.stub().returns($q.reject(new Error('something wrong')));
      $rootScope.$emit = sinon.spy();

      var controller = initController(bindings);

      controller.onAddBtnClick()
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
