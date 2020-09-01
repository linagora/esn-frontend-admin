'use strict';

require('./james-config-form.controller');
require('./quota/form/james-quota-form.component');
require('./quota/displayer/james-quota-displayer.component');

angular.module('linagora.esn.admin')
  .component('jamesConfigForm', {
    template: require('./james-config-form.pug'),
    controller: 'jamesConfigFormController',
    bindings: {
      configurations: '=',
      mode: '@',
      availableModes: '<',
      registerPostSaveHandler: '<'
    }
  });
