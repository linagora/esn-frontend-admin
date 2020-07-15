'use strict';

angular.module('linagora.esn.admin')

.component('adminMailSubheader', {
  template: require("./admin-mail-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
