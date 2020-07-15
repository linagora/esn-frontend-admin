'use strict';

angular.module('linagora.esn.admin')

.component('adminMailSmtp', {
  template: require("./admin-mail-smtp.pug"),
  bindings: {
    transportConfig: '=',
    form: '='
  }
});
