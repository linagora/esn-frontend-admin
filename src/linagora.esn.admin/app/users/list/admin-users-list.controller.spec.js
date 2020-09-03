'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminUsersListController', function() {
  var $controller, $rootScope, $scope;
  var domainAPI, searchConfMock, usSpinnerServiceMock;
  var domainId = '123456';

  beforeEach(function() {
    searchConfMock = {
      searchLimit: 20
    };
    usSpinnerServiceMock = {
      spin: sinon.spy(),
      stop: sinon.spy()
    };

    angular.mock.module('linagora.esn.admin', function($provide) {
      $provide.value('memberSearchConfiguration', searchConfMock);
      $provide.value('usSpinnerService', usSpinnerServiceMock);
    });
  });

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _domainAPI_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      domainAPI = _domainAPI_;
    });
  });

  function initController(scope) {
    $scope = scope || $rootScope.$new();

    var controller = $controller('adminUsersListController', { $scope: $scope }, { domainId: domainId });

    $scope.$digest();

    return controller;
  }

  describe('loadMoreElements method', function() {
    var membersMock, searchMock;

    beforeEach(function() {
      membersMock = {
        length: 0
      };

      searchMock = {
        count: searchConfMock.searchLimit * (this.maxCount + 1)
      };
    });
    it('should call the domainAPI.getMembers() method with the right options', function(done) {
      this.callCount = 0;
      this.successfullCallsCount = 5;
      this.maxCount = 10;
      var self = this;

      domainAPI.getMembers = function(domain_id, opts) {
        self.callCount++;

        expect(domain_id).to.equal(domainId);
        expect(opts.limit).to.equal(searchConfMock.searchLimit);
        expect(opts.search).to.equal('');

        if (self.callCount <= self.successfullCallsCount) {
          expect(opts.offset).to.equal(searchConfMock.searchLimit * (self.callCount - 1));
        } else {
          expect(opts.offset).to.equal(searchConfMock.searchLimit * self.successfullCallsCount);
        }

        done();
      };

      var controller = initController();

      controller.members = membersMock;
      controller.search = searchMock;

      controller.loadMoreElements();
    });

    it('should spin when running and stop when finished', function(done) {
      var isSpinning = false;

      usSpinnerServiceMock.spin = function(id) {
        expect(id).to.equal('memberSpinner');
        isSpinning = true;
      };
      usSpinnerServiceMock.stop = function(id) {
        expect(isSpinning).to.be.true;
        expect(id).to.equal('memberSpinner');
        done();
      };

      domainAPI.getMembers = function() {
        return $q.when({
          headers: function() {}
        });
      };

      var controller = initController();

      controller.loadMoreElements();

      $scope.$digest();
    });

    it('should spin when running and stop when error', function(done) {
      var isSpinning = false;

      usSpinnerServiceMock.spin = function(id) {
        expect(id).to.equal('memberSpinner');
        isSpinning = true;
      };
      usSpinnerServiceMock.stop = function(id) {
        expect(isSpinning).to.be.true;
        expect(id).to.equal('memberSpinner');
        done();
      };

      domainAPI.getMembers = function() {
        return $q.reject({});
      };

      var controller = initController();

      controller.loadMoreElements();

      $scope.$digest();
    });
  });

  describe('The doSearch function', function() {
    it('should call the domainAPI.getMembers function with the correct query', function(done) {
      domainAPI.getMembers = function() {
        return $q.when({
          headers: function() {}
        });
      };
      initController();

      $scope.searchInput = 'testQuery';
      domainAPI.getMembers = function(domain_id, opts) {
        expect(domain_id).to.equal(domainId);
        expect(opts.limit).to.equal(searchConfMock.searchLimit);
        expect(opts.offset).to.equal(0);
        expect(opts.search).to.equal($scope.searchInput);
        done();
      };
      $scope.doSearch();
    });
  });
});
