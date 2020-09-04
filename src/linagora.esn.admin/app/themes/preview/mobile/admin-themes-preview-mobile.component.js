(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminThemesPreviewMobile', {
      template: require('./admin-themes-preview-mobile.pug'),
      bindings: {
        colors: '<',
        logos: '<'
      }
    });

})(angular);
