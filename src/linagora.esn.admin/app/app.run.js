'use strict';

angular.module('linagora.esn.admin')

.run(function(dynamicDirectiveService, session) {
  session.ready.then(function() {
    if (session.userIsDomainAdministrator() || session.user.isPlatformAdmin) {
      var admin = new dynamicDirectiveService.DynamicDirective(true, 'admin-application-menu', { priority: -10 });

      dynamicDirectiveService.addInjection('esn-application-menu', admin);
    }
  });
});
