(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .component('adminThemesPreview', {
      template: require('./admin-themes-preview.pug'),
      bindings: {
        colors: '<',
        logos: '<'
      }
    });

})(angular);
