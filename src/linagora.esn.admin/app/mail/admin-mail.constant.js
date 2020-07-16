'use strict';

angular.module('linagora.esn.admin')

  .constant('ADMIN_MAIL_AVAILABLE_RESOLVERS', [{
    name: 'All',
    key: 'all',
    hasOptions: false
  }, {
    name: 'Whatsup',
    key: 'whatsup',
    hasOptions: true
  }])

  .constant('ADMIN_MAIL_TRANSPORT_TYPES', { local: 'Local', smtp: 'SMTP', gmail: 'Gmail' });
