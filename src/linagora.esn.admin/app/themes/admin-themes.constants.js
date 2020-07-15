(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .constant('ADMIN_THEMES_COLOR_VARIABLES', [
      { apiVariable: 'primaryColor', displayText: 'Primary color', default: '#2196F3' },
      { apiVariable: 'accentColor', displayText: 'Accent color', default: '#FFC107' },
      { apiVariable: 'bodyBgColor', displayText: 'Background color', default: '#f7f7f7' },
      { apiVariable: 'textPrimaryColor', displayText: 'Text primary color', default: '#ffffff' },
      { apiVariable: 'textColor', displayText: 'Text color', default: '#333' }
    ])
    .constant('ADMIN_THEMES_LOGO_VARIABLES', [
      { apiVariable: 'logo', displayText: 'Logo', default: '/images/white-logo.svg' },
      { apiVariable: 'favicon', displayText: 'Favicon', default: '/images/logo-tiny.png' }
    ]);
})(angular);
