'use strict';

angular.module('linagora.esn.admin')
  .component('calendarConfigForm', {
    template: require('./calendar-config-form.pug'),
    bindings: {
      configurations: '='
    }
  });

