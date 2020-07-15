(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminAutoconfSubheader', {
    template: require("./admin-autoconf-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
