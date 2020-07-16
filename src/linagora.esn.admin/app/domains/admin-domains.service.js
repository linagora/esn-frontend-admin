'use strict';

require('./admin-domains.constant.js');

angular.module('linagora.esn.admin')
  .factory('adminDomainsService', adminDomainsService);

function adminDomainsService(
  $rootScope,
  $q,
  asyncAction,
  domainAPI,
  ADMIN_DOMAINS_EVENTS
) {

  return {
    create: create,
    update: update
  };

  function create(domain) {
    if (!domain) {
      return $q.reject(new Error('Domain is required'));
    }

    var notificationMessages = {
      progressing: 'Creating domain...',
      success: 'Domain created',
      failure: 'Failed to create domain'
    };

    return asyncAction(notificationMessages, function() {
      return _createDomain(domain);
    }).then(function(createdDomain) {
      $rootScope.$broadcast(ADMIN_DOMAINS_EVENTS.DOMAIN_CREATED, createdDomain);
    });
  }

  function update(domain) {
    var notificationMessages = {
      progressing: 'Updating domain...',
      success: 'Domain updated',
      failure: 'Failed to update domain'
    };

    return asyncAction(notificationMessages, function() {
      return domainAPI.update(domain);
    }).then(function() {
      $rootScope.$broadcast(ADMIN_DOMAINS_EVENTS.DOMAIN_UPDATED, domain);
    });
  }

  function _createDomain(domain) {
    return domainAPI.create(domain)
      .then(function(response) {
        return response.data;
      });
  }
}
