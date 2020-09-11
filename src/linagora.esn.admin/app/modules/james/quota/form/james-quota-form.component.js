'use strict';

require('./james-quota-form.controller');

angular.module('linagora.esn.admin')
  .component('jamesQuotaForm', {
    template: require('./james-quota-form.pug'),
    bindings: {
      quota: '='
    },
    controller: 'jamesQuotaFormController'
  });
