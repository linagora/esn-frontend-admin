'use strict';

angular.module('linagora.esn.admin')

  .component('adminJwt', {
    template: require("./admin-jwt.pug"),
    controller: 'adminJwtController'
  });
