'use strict';

angular.module('linagora.esn.admin')

  .component('adminMailTest', {
    template: require('./admin-mail-test.pug'),
    controller: 'adminMailTestController',
    bindings: {
      config: '<',
      transportType: '=',
      isMailConfigValid: '='
    }
  });
