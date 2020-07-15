(function() {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminElasticsearchSubheader', {
    template: require("./admin-elasticsearch-subheader.pug"),
    bindings: {
      onFormSubmit: '&',
      form: '<'
    }
  });
})();
