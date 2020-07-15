'use strict';

angular.module('linagora.esn.admin')

  .run(addEsnApplicationMenuDirective)
  .run(addTemplateCache);

  function addEsnApplicationMenuDirective(dynamicDirectiveService, session) {
    session.ready.then(function() {
      if (session.userIsDomainAdministrator() || session.user.isPlatformAdmin) {
        var admin = new dynamicDirectiveService.DynamicDirective(true, 'admin-application-menu', { priority: -10 });

        dynamicDirectiveService.addInjection('esn-application-menu', admin);
      }
    });
  }

  function addTemplateCache($templateCache) {
    $templateCache.put('/admin/app/sidebar/admin-aside.html', require('./sidebar/admin-aside.pug'));
    $templateCache.put('/admin/app/users/states/edit/admin-users-states-edit.html', require('./users/states/edit/admin-users-states-edit.pug'));
    $templateCache.put('/views/modules/auto-complete/attendees.html', require('esn-frontend-common-libs/src/frontend/views/modules/auto-complete/attendees.pug'));
  }
