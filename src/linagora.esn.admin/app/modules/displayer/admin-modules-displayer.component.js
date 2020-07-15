'use strict';

angular.module('linagora.esn.admin')

.component('adminModulesDisplayer', {
  template: require("./admin-modules-displayer.pug"),
  bindings: {
    module: '=',
    onModuleEnabledStateChange: '&'
  },
  controller: 'adminModulesDisplayerController'
});
