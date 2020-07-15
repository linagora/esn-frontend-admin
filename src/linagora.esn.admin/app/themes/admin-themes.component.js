(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminThemes', {
      template: require("./admin-themes.pug"),
      controller: 'adminThemesController'
    });

})(angular);
