'use strict';

require('../../app.constants.js');
require('../admin-restangular.service.js');

angular.module('linagora.esn.admin')

  .factory('adminTestConfigService', function(adminRestangular, ADMIN_MODE) {

    function testSendEmail(domainId, to, mailConfig) {
      var body = { to: to, config: mailConfig };
      var request = adminRestangular.all('test');

      if (domainId !== ADMIN_MODE.platform) {
        request = request.one('domains', domainId);
      }

      return request.one('sendEmail').customPOST(body);
    }

    function testAccessLdap(domainId, ldapConfig) {
      var body = { config: ldapConfig };

      return adminRestangular
        .all('test')
        .one('domains', domainId)
        .one('accessLdap')
        .customPOST(body);
    }

    return {
      testSendEmail: testSendEmail,
      testAccessLdap: testAccessLdap
    };
  });
