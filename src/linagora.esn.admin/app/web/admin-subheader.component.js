'use strict';

angular.module('linagora.esn.admin')

.component('adminWebSubheader', {
  template: require("./admin-web-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
