(function(angular) {
  'use strict';

angular.module('linagora.esn.admin')
  .component('adminWebserverSubheader', {
    template: require("./admin-webserver-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})(angular);
