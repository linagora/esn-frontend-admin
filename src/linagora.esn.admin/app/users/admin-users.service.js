'use strict';

const _ = require('lodash');

require('./admin-users.constant.js');
require('../common/config/admin-domain-config.service.js');

angular.module('linagora.esn.admin')

  .factory('adminUsersService', function($rootScope, domainAPI, asyncAction, adminDomainConfigService, ADMIN_USERS_EVENTS) {

    return {
      createMember: createMember,
      isUserCreationEnabled: isUserCreationEnabled
    };

    function createMember(domainId, user) {
      var notificationMessages = {
        progressing: 'Creating user...',
        success: 'User created',
        failure: 'Failed to create user'
      };

      return asyncAction(notificationMessages, function() {
        return domainAPI.createMember(domainId, user);
      }).then(function(response) {
        $rootScope.$broadcast(ADMIN_USERS_EVENTS.CREATE, response.data);
      });
    }

    function isUserCreationEnabled(domainId) {
      return _isLDAPAuthenticationEnabled(domainId);
    }

    function _isLDAPAuthenticationEnabled(domainId) {
      return adminDomainConfigService.get(domainId, 'ldap')
        .then(function(data) {
          return data ? _isEnabledInConfiguration(_.isArray(data) ? data : [data]) : true;
        });

      function _isEnabledInConfiguration(configuration) {
        return !_.some(configuration, function(element) {
          return element && element.usage && element.usage.auth;
        });
      }
    }
  });
