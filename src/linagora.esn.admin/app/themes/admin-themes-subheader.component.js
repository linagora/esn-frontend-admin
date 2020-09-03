(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminThemesSubheader', {
      template: require('./admin-themes-subheader.pug'),
      bindings: {
        onFormSubmit: '&',
        form: '<',
        reset: '&'
      }
    });
})(angular);
