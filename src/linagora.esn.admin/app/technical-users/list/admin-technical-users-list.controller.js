'use strict';

require('../admin-technical-users.constants.js');

angular.module('linagora.esn.admin')
  .controller('adminTechnicalUsersListController', function(
    $rootScope,
    $stateParams,
    $modal,
    esnTechnicalUserAPIClient,
    infiniteScrollHelper,
    ELEMENTS_PER_REQUEST,
    ADMIN_TECHNICAL_USERS_EVENTS
  ) {
    var self = this;
    var DEFAULT_LIMIT = ELEMENTS_PER_REQUEST || 20;
    var options = {
      offset: 0,
      limit: DEFAULT_LIMIT
    };

    self.domainId = $stateParams.domainId;
    self.showUpdateModal = showUpdateModal;
    self.showRemoveModal = showRemoveModal;
    self.$onInit = $onInit;

    function $onInit() {
      self.loadMoreElements = infiniteScrollHelper(self, _loadNextItems, null, DEFAULT_LIMIT);
      $rootScope.$on(ADMIN_TECHNICAL_USERS_EVENTS.ADDED, _onAddedTechnicalUser);
      $rootScope.$on(ADMIN_TECHNICAL_USERS_EVENTS.REMOVED, _onRemovedTechnicalUser);
      $rootScope.$on(ADMIN_TECHNICAL_USERS_EVENTS.UPDATED, _onUpdatedTechnicalUser);
    }

    function _loadNextItems() {
      options.offset = self.elements.length;

      return esnTechnicalUserAPIClient.list(self.domainId, options);
    }

    function _onAddedTechnicalUser(event, createdTechnicalUser) {
      self.elements.push(createdTechnicalUser);
    }

    function _onUpdatedTechnicalUser(event, updatedTechnicalUser) {
      self.elements = self.elements.map(function(element) {
        return element._id === updatedTechnicalUser._id ? updatedTechnicalUser : element;
      });
    }

    function _onRemovedTechnicalUser(event, removedTechnicalUserId) {
      self.elements = self.elements.filter(function(element) {
        return element._id !== removedTechnicalUserId;
      });
    }

    function showUpdateModal(technicalUser) {
      $modal({
        template: require("../update/admin-technical-users-update.pug"),
        backdrop: 'static',
        placement: 'center',
        controllerAs: '$ctrl',
        controller: 'adminTechnicalUsersUpdateController',
        locals: {
          technicalUser: technicalUser
        }
      });
    }

    function showRemoveModal(technicalUser) {
      $modal({
        template: require("../remove/admin-technical-users-remove.pug"),
        backdrop: 'static',
        placement: 'center',
        controllerAs: '$ctrl',
        controller: 'adminTechnicalUsersRemoveController',
        locals: {
          technicalUser: technicalUser
        }
      });
    }
  });
