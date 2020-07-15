'use strict';

angular.module('linagora.esn.admin')

.component('adminJwtSubheader', {
  template: require("./admin-jwt-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
