(function(angular) {
  angular.module('linagora.esn.admin')
    .component('adminSidebarItems', {
      template: require('./admin-sidebar-items.pug'),
      bindings: {
        items: '<'
      }
    });
})(angular);
