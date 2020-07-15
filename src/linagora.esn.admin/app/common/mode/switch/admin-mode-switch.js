(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminModeSwitch', {
      template: require("./admin-mode-switch.pug"),
      controller: adminmModeSwitchController
    });

  function adminmModeSwitchController(session, adminModeService) {
    var self = this;

    self.$onInit = $onInit;
    self.goToDomainMode = goToDomainMode;
    self.goToPlatformMode = goToPlatformMode;
    self.isPlatformMode = isPlatformMode;
    self.selectedChanged = selectedChanged;
    self.currentDomain = session.domain;

    function $onInit() {
      self.hasTwoAdminRoles = session.user.isPlatformAdmin && session.userIsDomainAdministrator();
    }

    function goToDomainMode() {
      return adminModeService.goToDomainMode();
    }

    function goToPlatformMode() {
      return adminModeService.goToPlatformMode();
    }

    function isPlatformMode() {
      return adminModeService.isPlatformMode();
    }

    function selectedChanged() {
      return self.selectedMode === 'platform' ? goToPlatformMode() : goToDomainMode();
    }
  }
})(angular);
