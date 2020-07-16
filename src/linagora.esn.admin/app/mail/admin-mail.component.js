'use strict';

angular.module('linagora.esn.admin')

  .component('adminMail', {
    template: require("./admin-mail.pug"),
    controller: 'adminMailController'
  });
