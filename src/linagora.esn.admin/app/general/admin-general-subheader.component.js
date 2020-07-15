(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminGeneralSubheader', {
    template: require("./admin-general-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
