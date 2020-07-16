'use strict';

angular.module('linagora.esn.admin')

  .component('adminSubheaderCloseButton', {
    template: require("./admin-subheader-close-button.pug"),
    bindings: {
      backState: '@'
    }
  });
