'use strict';

angular.module('linagora.esn.admin')

.directive('adminApplicationMenu', function(applicationMenuTemplateBuilder) {
  return {
    restrict: 'E',
    replace: true,
    template: applicationMenuTemplateBuilder('/#/admin', { url: '/admin/images/admin-center-icon.svg' }, 'Administration')
  };
});
