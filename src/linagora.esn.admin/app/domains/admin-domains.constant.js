(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .constant('ADMIN_DOMAINS_EVENTS', {
      DOMAIN_CREATED: 'admin:domains:domain:created',
      DOMAIN_UPDATED: 'admin:domains:domain:updated'
    });
})(angular);
