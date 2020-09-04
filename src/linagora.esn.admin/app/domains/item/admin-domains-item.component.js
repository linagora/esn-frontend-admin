(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminDomainsItem', {
      template: require('./admin-domains-item.pug'),
      bindings: {
        domain: '<',
        onEditBtnClick: '&'
      }
    });
})(angular);
