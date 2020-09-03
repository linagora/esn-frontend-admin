(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

    .component('adminMaintenanceElasticsearch', {
      template: require('./admin-maintenance-elasticsearch.pug'),
      controller: 'adminMaintenanceElasticsearchController'
    });
})(angular);
