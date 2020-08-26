angular.module('esnApp', [
  'ui.router',
  'linagora.esn.admin',
  'esn.session',
  'esn.login',
  'esn.websocket'
]);

require('esn-frontend-common-libs/src/frontend/js/modules/session');
require('esn-frontend-common-libs/src/frontend/js/modules/websocket');
require('esn-frontend-common-libs/src/frontend/js/modules/login');

require('./app.config');
require('./app.run');
require('../linagora.esn.admin/app/app.module');
