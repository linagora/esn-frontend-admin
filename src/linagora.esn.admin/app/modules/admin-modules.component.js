'use strict';

require('./form/admin-modules-form.component');
require('./displayer/config/james/james-config-form.component');
require('./displayer/config/inbox/inbox-config-form.component');
require('./displayer/config/contact/contact-config-form.component');

angular.module('linagora.esn.admin')

  .component('adminModules', {
    template: require('./admin-modules.pug'),
    controller: 'adminModulesController'
  });
