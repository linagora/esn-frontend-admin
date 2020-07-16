'use strict';

angular.module('linagora.esn.admin')

  .component('adminMailGmail', {
    template: require("./admin-mail-gmail.pug"),
    bindings: {
      transportConfig: '=',
      form: '='
    }
  });
