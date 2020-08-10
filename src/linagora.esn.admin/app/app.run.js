'use strict';

angular.module('linagora.esn.admin')

  .run(addTemplateCache);

  function addTemplateCache($templateCache) {
    $templateCache.put('/admin/app/sidebar/admin-aside.html', require('./sidebar/admin-aside.pug'));
    $templateCache.put('/admin/app/users/states/edit/admin-users-states-edit.html', require('./users/states/edit/admin-users-states-edit.pug'));
    $templateCache.put('/views/modules/auto-complete/attendees.html', require('esn-frontend-common-libs/src/frontend/views/modules/auto-complete/attendees.pug'));
  }
