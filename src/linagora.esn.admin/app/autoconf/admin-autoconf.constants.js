(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .constant('ADMIN_AUTOCONF_SOCKET_TYPES', [
      { label: 'None', key: '0' },
      { label: 'STARTTLS', key: '2' },
      { label: 'SSL', key: '3' }
    ]);
})(angular);
