'use strict';

angular.module('linagora.esn.admin')

.controller('adminUsersListController', function($scope, memberSearchConfiguration, domainAPI, usSpinnerService, ADMIN_USERS_EVENTS, ADMIN_LOADING_STATUS) {
  var self = this;

  self.spinnerKey = 'memberSpinner';
  var opts = {
    offset: 0,
    limit: memberSearchConfiguration.searchLimit,
    includesDisabledSearchable: true,
    ignoreMembersCanBeSearchedConfiguration: true,
    search: ''
  };

  self.search = {
    running: false
  };
  self.members = [];
  self.restActive = false;
  self.error = false;
  self.status = ADMIN_LOADING_STATUS.loading;

  function _updateMembersList() {
    self.error = false;

    if (self.restActive) {
      return;
    }

    self.restActive = true;
    self.search.running = true;
    self.search.count = 0;
    usSpinnerService.spin('memberSpinner');

    domainAPI.getMembers(self.domainId, opts)
      .then(function(data) {
        self.search.count = parseInt(data.headers('X-ESN-Items-Count'), 10);
        self.members = self.members.concat(data.data);
        self.status = ADMIN_LOADING_STATUS.loaded;
      }, function() {
        self.error = true;
        self.status = ADMIN_LOADING_STATUS.error;
      }).finally(function() {
        self.search.running = false;
        self.restActive = false;
        usSpinnerService.stop('memberSpinner');
    });
  }

  self.init = function() {
    //initializes the view with a list of users of the domain
    _updateMembersList();
  };

  $scope.doSearch = function() {
    self.members = [];
    opts.offset = 0;
    opts.search = $scope.searchInput;
    _updateMembersList();
  };

  self.loadMoreElements = function() {
    if (self.members.length === 0 || self.members.length < self.search.count) {
      opts.offset = self.members.length;
      _updateMembersList();
    }
  };

  $scope.$on(ADMIN_USERS_EVENTS.CREATE, function(event, user) {
    user.emails = user.accounts[0].emails;
    self.members.unshift(user);
  });

  self.init();
});
