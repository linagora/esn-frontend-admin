'use strict';

angular.module('linagora.esn.admin')

  .component('adminElasticsearch', {
    template: require('./admin-elasticsearch.pug'),
    controller: 'adminElasticsearchController'
  });
