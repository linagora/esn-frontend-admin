(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminSessionSubheader', {
    template: require("./admin-session-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
