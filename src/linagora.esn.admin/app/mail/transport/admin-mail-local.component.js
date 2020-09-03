'use strict';

angular.module('linagora.esn.admin')

  .component('adminMailLocal', {
    template: require('./admin-mail-local.pug'),
    bindings: {
      transport: '=',
      form: '='
    }
  });
