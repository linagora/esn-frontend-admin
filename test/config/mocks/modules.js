'use strict';

angular.module('esn.router', ['ui.router'])
  .factory('session', function($q) {
    return {
      ready: $q.when(),
      user: {},
      domain: {},
      userIsDomainAdministrator: function() {
        return false;
      }
    };
  });
angular.module('esn.session', []);
angular.module('esn.subheader', []);
angular.module('esn.sidebar', []);
angular.module('esn.infinite-list', []);
angular.module('esn.form.helper', []);
angular.module('esn.async-action', [])
  .factory('asyncAction', function() {
    return function(message, action) {
      return action();
    };
  })
  .factory('rejectWithErrorNotification', function() {
    return function() {
      return $q.reject();
    };
  });
angular.module('esn.core', []);
angular.module('esn.people', [])
  .factory('esnPeopleAPI', function() {
    return {};
  });
angular.module('esn.http', [])
  .factory('httpErrorHandler', function() {
    return {
      redirectToLogin: angular.noop
    };
  })
  .factory('esnRestangular', function() {
    return {};
  });
angular.module('esn.domain', [])
  .factory('domainAPI', function() {
    return {};
  })
  .service('domainSearchMembersProvider', function() {
    return {};
  });
angular.module('esn.scroll', [])
  .factory('elementScrollService', function() {
    return {};
  });
angular.module('esn.user', [])
  .factory('userUtils', function() {
    return {
      displayNameOf: angular.noop
    };
  })
  .factory('userAPI', function() {
    return {};
  });

angular.module('esn.file-saver', [])
  .factory('esnFileSaver', function() {
    return {};
  });
angular.module('esn.module-registry', [])
  .factory('esnModuleRegistry', function() {
    return {};
  });
angular.module('esn.feature-registry', [])
  .factory('esnFeatureRegistry', function() {
    return {};
  });
angular.module('esn.i18n', ['pascalprecht.translate'])
  .filter('esnI18n', function() {
    return function(input) { return input; };
  })
  .factory('esnI18nService', function() {
    return {
      translate: function() {}
    };
  });
angular.module('esn.datetime', [])
  .filter('esnDatetime', function() {
    return function(input) { return input; };
  });

angular.module('esn.availability', [])
  .factory('esnAvailabilityService', function() {
    return {};
  });

angular.module('esn.technicaluser', [])
  .factory('esnTechnicalUserAPIClient', function() {
    return {};
  });

angular.module('esn.infinite-list', []);
angular.module('linagora.esn.test', [])
  .run(function($templateCache) {
    $templateCache.put('test-config.html', '<ng-form name="form"><input type="text" name="test" ng-model="$ctrl.configurations.test_config.value" /></ng-form>');
  })
  .component('testConfig', {
    // must be templateUrl otherwise the inner form will not be able to
    // change the parent form's dirty state
    templateUrl: 'test-config.html',
    bindings: {
      configurations: '='
    }
  });
