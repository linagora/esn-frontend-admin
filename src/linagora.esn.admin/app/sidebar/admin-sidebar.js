(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminSidebar', {
      template: require("./admin-sidebar.pug"),
      controller: adminSidebarController
    });

    function adminSidebarController($scope, adminModeService, ADMIN_PAGES, ADMIN_MODE) {
      var self = this;

      self.$onInit = $onInit;

      function $onInit() {
        self.displayIn = adminModeService.isPlatformMode ? ADMIN_MODE.platform : ADMIN_MODE.domain;
        self.platformPages = getAvailablePages(ADMIN_MODE.platform);
        self.domainPages = getAvailablePages(ADMIN_MODE.domain);

        $scope.$watch(function() {
          return adminModeService.isPlatformMode();
        }, function(isPlatformMode) {
          self.displayIn = isPlatformMode ? ADMIN_MODE.platform : ADMIN_MODE.domain;
        });
      }

      function getAvailablePages(displayIn) {
        return angular.copy(ADMIN_PAGES).filter(function(page) {
          return page.displayIn[displayIn];
        });
      }
    }
})(angular);
