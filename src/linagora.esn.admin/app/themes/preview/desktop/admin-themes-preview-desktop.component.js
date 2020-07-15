(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminThemesPreviewDesktop', {
      template: require("./admin-themes-preview-desktop.pug"),
      bindings: {
        colors: '<',
        logos: '<'
      }
    });

})(angular);
