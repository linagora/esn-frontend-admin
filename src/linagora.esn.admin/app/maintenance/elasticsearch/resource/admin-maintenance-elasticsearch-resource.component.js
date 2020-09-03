(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminMaintenanceElasticsearchResource', {
      template: require('./admin-maintenance-elasticsearch-resource.pug'),
      bindings: {
        resource: '<'
      }
    });
})(angular);
