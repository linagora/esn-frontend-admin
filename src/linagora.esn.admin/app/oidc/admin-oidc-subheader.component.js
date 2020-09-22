angular.module('linagora.esn.admin')

  .component('adminOidcSubheader', {
    template: require('./admin-oidc-subheader.pug'),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
