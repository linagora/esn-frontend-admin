(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .constant('ADMIN_TECHNICAL_USERS_EVENTS', {
      ADDED: 'admin:technical:user:events:added',
      UPDATED: 'admin:technical:user:events:updated',
      REMOVED: 'admin:technical:user:events:removed'
    });
})(angular);
