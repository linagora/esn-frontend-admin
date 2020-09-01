'use strict';

angular.module('linagora.esn.admin')
  .component('jamesQuotaDisplayer', {
    template: require('./james-quota-displayer.pug'),
    bindings: {
      quota: '<'
    }
  });
