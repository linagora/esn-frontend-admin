'use strict';

require('./admin-maintenance-elasticsearch.service.js');

angular.module('linagora.esn.admin')
  .controller('adminMaintenanceElasticsearchController', adminMaintenanceElasticsearchController);

function adminMaintenanceElasticsearchController(adminMaintenanceElasticsearchService) {
  var self = this;

  self.$onInit = $onInit;

  function $onInit() {
    self.resources = [];

    adminMaintenanceElasticsearchService.getRegisteredResourceTypes()
      .then(function(response) {
        angular.forEach(response.data, (function(type) {
          self.resources.push({
            type: type,
            onReindexBtnClick: function() {
              return adminMaintenanceElasticsearchService.reindex(type);
            },
            onReconfigureBtnClick: function() {
              return adminMaintenanceElasticsearchService.reconfigure(type);
            }
          });
        }));
      });
  }
}
