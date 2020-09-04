(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminTechnicalUsersForm', {
      template: require('./admin-technical-users-form.pug'),
      controller: 'adminTechnicalUsersFormController',
      bindings: {
        technicalUser: '='
      }
    });

})(angular);
