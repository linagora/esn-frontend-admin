(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminFeaturesSubheader', {
      template: require('./admin-features-subheader.pug'),
      bindings: {
        onFormSubmit: '&',
        form: '<'
      }
    });
})(angular);
