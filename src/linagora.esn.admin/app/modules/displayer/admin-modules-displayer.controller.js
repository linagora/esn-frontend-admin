(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .controller('adminModulesDisplayerController', adminModulesDisplayerController);

  function adminModulesDisplayerController(
    $stateParams,
    $scope,
    $q,
    asyncAction,
    adminModulesService,
    adminModeService,
    ADMIN_MODE,
    ADMIN_FORM_EVENT,
    ADMIN_DEFAULT_NOTIFICATION_MESSAGES
  ) {
    var self = this;
    var domainId = $stateParams.domainId;
    var postSaveHandlers = [];

    self.$onInit = $onInit;
    self.registerPostSaveHandler = registerPostSaveHandler;
    self.switchEnabledState = switchEnabledState;

    function $onInit() {
      self.mode = adminModeService.getCurrentMode();
      self.availableModes = ADMIN_MODE;
      self.configurations = buildConfigurations(self.module);
      self.currentEnabledState = !!self.module.enabled;
      self.module.isSVG = (self.module.icon.match('(.*/)*.+.(svg)$'));

    }

    function buildConfigurations(module) {
      if (moduleHasConfigurations(module)) {
        var configurations = {};

        angular.forEach(module.config.configurations, function(config) {
          configurations[config.name] = config;
        });

        return configurations;
      }

      return false;
    }

    function moduleHasConfigurations(module) {
      return module.config && module.config.configurations && module.config.configurations.length > 0;
    }

    self.save = function() {
      return asyncAction(ADMIN_DEFAULT_NOTIFICATION_MESSAGES, function() {
        return adminModulesService.set(domainId, [self.module])
          .then(function() {
            return $q.all(postSaveHandlers.map(function(handler) {
              return handler();
            }));
          })
          .then(function() {
            $scope.$broadcast(ADMIN_FORM_EVENT.submit);
            $scope.form.$setPristine();
          });
      });
    };

    self.reset = function() {
      $scope.$broadcast(ADMIN_FORM_EVENT.reset);
      $scope.form.$setPristine();
    };

    function registerPostSaveHandler(handler) {
      postSaveHandlers.push(handler);
    }

    function switchEnabledState() {
      if (self.module.enabled !== self.currentEnabledState) {
        var currentEnabledState = self.currentEnabledState;

        self.currentEnabledState = self.module.enabled;

        return self.onModuleEnabledStateChange({ module: self.module, enabled: self.module.enabled })
          .catch(function() {
            self.currentEnabledState = currentEnabledState;
          });
      }
    }
  }
})(angular);
