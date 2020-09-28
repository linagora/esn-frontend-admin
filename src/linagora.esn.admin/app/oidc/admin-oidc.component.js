require('./admin-oidc.controller');

angular.module('linagora.esn.admin')
  .component('adminOidc', {
    template: require('./admin-oidc.pug'),
    controller: 'adminOidcController'
  });
