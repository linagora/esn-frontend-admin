(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')

  .component('adminEmptyMessage', {
    template: require("./admin-empty-message.pug"),
    bindings: {
      message: '@',
      type: '@',
      icon: '@?'
    },
    controller: 'adminEmptyMessageController'
  });
})(angular);
