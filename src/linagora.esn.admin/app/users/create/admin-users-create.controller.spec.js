'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminUsersCreateController', function() {
  var $controller, $rootScope, $stateParams, $scope;
  var domainAPI;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _$stateParams_, _domainAPI_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      $stateParams = _$stateParams_;
      domainAPI = _domainAPI_;

      $stateParams.domainId = 'domain123';
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminUsersCreateController', { $scope: $scope });

    $scope.$digest();

    return controller;
  }

  describe('The save fn', function() {
    var userMock;

    beforeEach(function() {
      userMock = {
        password: 'password',
        accounts: [{
          type: 'email',
          emails: ['email0']
        }],
        domains: [
          { domain_id: $stateParams.domainId }
        ]
      };
    });

    it('shoud call domainAPI.createMember to create member of domain', function(done) {
      var controller = initController();

      domainAPI.createMember = sinon.stub().returns($q.when({data: 'value'}));
      controller.user = userMock;

      controller.save().then(function() {
        expect(domainAPI.createMember).to.have.been.calledWith($stateParams.domainId, userMock);
        done();
      });

      $scope.$digest();
    });
  });
});
