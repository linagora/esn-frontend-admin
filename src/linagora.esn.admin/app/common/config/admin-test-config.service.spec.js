'use strict';

describe('The adminTestConfigService service', function() {

  var adminTestConfigService, ADMIN_MODE;
  var $httpBackend;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    angular.mock.inject(function(_$httpBackend_, _adminTestConfigService_, _ADMIN_MODE_) {
      $httpBackend = _$httpBackend_;
      adminTestConfigService = _adminTestConfigService_;
      ADMIN_MODE = _ADMIN_MODE_;
    });
  });

  describe('The testSendEmail fn', function() {

    it('should send POST request to send test email API endpoint', function(done) {
      var mailConfig = { key: 'value' };
      var domainId = 'domain123';
      var toEmail = 'to@email';

      $httpBackend.expectPOST('/admin/api/test/domains/' + domainId + '/sendEmail', {
        to: toEmail,
        config: mailConfig
      }).respond(200);

      adminTestConfigService.testSendEmail(domainId, toEmail, mailConfig)
        .then(function() {
          done();
        });

      $httpBackend.flush();
    });

    it('should send POST request to the right endpoint in case the user is in platform mode', function(done) {
      var mailConfig = { key: 'value' };
      var domainId = ADMIN_MODE.platform;
      var toEmail = 'to@email';

      $httpBackend.expectPOST('/admin/api/test/sendEmail', {
        to: toEmail,
        config: mailConfig
      }).respond(200);

      adminTestConfigService.testSendEmail(domainId, toEmail, mailConfig)
        .then(function() {
          done();
        });

      $httpBackend.flush();
    });
  });

  describe('The testAccessLdap fn', function() {

    it('should send POST request to /admin/api/test/domains/uuid/accessLdap', function(done) {
      var ldapConfig = { key: 'value' };
      var domainId = 'domain123';

      $httpBackend.expectPOST('/admin/api/test/domains/' + domainId + '/accessLdap', {
        config: ldapConfig
      }).respond(200);

      adminTestConfigService.testAccessLdap(domainId, ldapConfig)
        .then(done.bind(null, null));

      $httpBackend.flush();
    });
  });
});
