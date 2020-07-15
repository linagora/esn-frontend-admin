(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminDomainsListController', adminDomainsListController);

  function adminDomainsListController(
    $modal,
    $scope,
    _,
    domainAPI,
    infiniteScrollHelper,
    ADMIN_DOMAINS_EVENTS
  ) {
    var self = this;
    var DEFAULT_LIMIT = 20;

    var options = {
      offset: 0,
      limit: DEFAULT_LIMIT
    };

    self.$onInit = $onInit;
    self.showEditDomainForm = showEditDomainForm;

    function $onInit() {
      self.loadMoreElements = infiniteScrollHelper(self, _loadNextItems);
      $scope.$on(ADMIN_DOMAINS_EVENTS.DOMAIN_CREATED, function(event, domain) {
        _onDomainCreated(domain);
      });

      $scope.$on(ADMIN_DOMAINS_EVENTS.DOMAIN_UPDATED, function(event, updatedDomain) {
        _onDomainUpdated(updatedDomain);
      });
    }

    function showEditDomainForm(domain) {
      var updateDomainModal = $modal({
        template: require("../update/admin-domains-update.pug"),
        backdrop: 'static',
        placement: 'center',
        controller: 'adminDomainUpdateController',
        controllerAs: '$ctrl',
        locals: {
          domain: domain
        },
        show: false
      });

      // ensure template has been loaded
      updateDomainModal.$promise.then(updateDomainModal.show);
    }

    function _loadNextItems() {
      options.offset = self.elements.length;

      return domainAPI.list(options)
        .then(function(response) {
          return response.data;
        });
    }

    function _onDomainCreated(newDomain) {
      if (!newDomain) {
        return;
      }

      self.elements.unshift(newDomain);
    }

    function _onDomainUpdated(updatedDomain) {
     if (!updatedDomain || !updatedDomain.id) {
       return;
     }

     var index = _.findIndex(self.elements, { id: updatedDomain.id });

     if (index !== -1) {
       self.elements[index] = updatedDomain;
     }
   }
  }
})(angular);
