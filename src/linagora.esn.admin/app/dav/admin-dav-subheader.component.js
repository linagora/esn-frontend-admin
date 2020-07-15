'use strict';

angular.module('linagora.esn.admin')

.component('adminDavSubheader', {
  template: require("./admin-dav-subheader.pug"),
  bindings: {
    onFormSubmit: '&',
    form: '<'
  }
});
