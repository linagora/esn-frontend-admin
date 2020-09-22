require('./admin-oidc-form.controller');

angular.module('linagora.esn.admin')
  .component('adminOidcForm', {
    template: require('./admin-oidc-form.pug'),
    controller: 'adminOidcFormController',
    bindings: {
      oidcConfig: '='
    }
  });
