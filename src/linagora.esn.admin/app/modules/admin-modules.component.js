'use strict';

require('./form/admin-modules-form.component');
require('./james/james-config-form.component');

angular.module('linagora.esn.admin')

  .component('adminModules', {
    template: require('./admin-modules.pug'),
    controller: 'adminModulesController'
  });
