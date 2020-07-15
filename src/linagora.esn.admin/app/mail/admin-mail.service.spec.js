'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminMailService', function() {

  var adminMailService;
  var ADMIN_MAIL_TRANSPORT_TYPES;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    angular.mock.inject(function(_adminMailService_, _ADMIN_MAIL_TRANSPORT_TYPES_) {
      adminMailService = _adminMailService_;
      ADMIN_MAIL_TRANSPORT_TYPES = _ADMIN_MAIL_TRANSPORT_TYPES_;
    });
  });

  describe('The getTransportType fn', function() {

    it('should return Local transport type if config object has module in transport attribute', function() {
      var config = { transport: {module: 'module', key: 'value'} };
      var transportType = adminMailService.getTransportType(config, ADMIN_MAIL_TRANSPORT_TYPES);

      expect(transportType).to.equal(ADMIN_MAIL_TRANSPORT_TYPES.local);
    });

    it('should return SMTP transport type if config object has host and port attribute in config attribute', function() {
      var config = { transport: {key: 'value', config: {host: '', port: 25} } };
      var transportType = adminMailService.getTransportType(config, ADMIN_MAIL_TRANSPORT_TYPES);

      expect(transportType).to.equal(ADMIN_MAIL_TRANSPORT_TYPES.smtp);
    });

    it('should return Gmail transport type if config has service equal gmail', function() {
      var config = { transport: {key: 'value', config: {service: 'gmail'} } };
      var transportType = adminMailService.getTransportType(config, ADMIN_MAIL_TRANSPORT_TYPES);

      expect(transportType).to.equal(ADMIN_MAIL_TRANSPORT_TYPES.gmail);
    });

    it('should return Local transport type if config has service but service no equal gmail', function() {
      var config = { transport: {key: 'value', config: {service: 'nogmail'} } };
      var transportType = adminMailService.getTransportType(config, ADMIN_MAIL_TRANSPORT_TYPES);

      expect(transportType).to.equal(ADMIN_MAIL_TRANSPORT_TYPES.local);
    });
  });

  describe('The qualifyTransportConfig fn', function() {
    var configMock;

    beforeEach(function() {
      configMock = {
        mail: {
          noreply: 'noreply@open-paas.org',
          feedback: 'feedback@open-paas.org'
        },
        transport: {
          module: 'value',
          config: {
            dir: 'value',
            browser: true,
            host: 'value',
            secure: false,
            tls: {
              rejectUnauthorized: false
            },
            port: 25,
            auth: {
              user: 'username',
              pass: 'password'
            },
            service: 'gmail'
          }
        }
      };
    });

    it('should return config object for Local transport type if transport type is Local and saving successfully', function() {
      var expectedConfig = {
        mail: { noreply: 'noreply@open-paas.org', feedback: 'feedback@open-paas.org' },
        transport: { module: 'value', config: { dir: 'value', browser: true } }
      };
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.local;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config).to.deep.equal(expectedConfig);
    });

    it('should return config object for SMTP transport type if transport type is SMTP and saving successfully', function() {
      var expectedConfig = {
        mail: {
          noreply: 'noreply@open-paas.org',
          feedback: 'feedback@open-paas.org'
        },
        transport: {
          config: {
            host: 'value',
            secure: false,
            tls: { rejectUnauthorized: false },
            port: 25,
            auth: { user: 'username', pass: 'password' }
          }
        }
      };
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config).to.deep.equal(expectedConfig);
    });

    it('shoud not return auth object if auth credentials is empty with SMTP transport', function() {
      configMock.transport.config.auth = { user: '', pass: '' };

      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config.transport.config.auth).to.not.exist;
    });

    it('should not return config.auth object if it is empty with SMTP transport', function() {
      configMock.transport.config.auth = {};

      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config.transport.config.auth).to.not.exist;
    });

    it('shoud not return config.auth object if auth object is undefined with SMTP transport', function() {
      configMock.transport.config.auth = undefined;
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config.transport.config.auth).to.not.exist;
    });

    it('shoud return config.auth object even with only auth user or password with SMTP transport', function() {
      var expectedAuth = { user: 'user' };
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;

      configMock.transport.config.auth = expectedAuth;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config.transport.config.auth).to.equal(expectedAuth);
    });

    it('should return config.auth object even with only auth password with SMTP transport', function() {
      var expectedAuth = { pass: 'password' };
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.smtp;

      configMock.transport.config.auth = expectedAuth;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config.transport.config.auth).to.equal(expectedAuth);
    });

    it('should return config object for Gmail transport type if transport type is Gmail and saving successfully', function() {
      var expectedConfig = {
        mail: { noreply: 'noreply@open-paas.org', feedback: 'feedback@open-paas.org' },
        transport: {
          config: { service: 'gmail', auth: { user: 'username', pass: 'password' } }
        }
      };
      var transportType = ADMIN_MAIL_TRANSPORT_TYPES.gmail;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config).to.deep.equal(expectedConfig);
    });

    it('should return original config object if transport type is null', function() {
      var transportType = null;
      var config = adminMailService.qualifyTransportConfig(transportType, configMock);

      expect(config).to.deep.equal(configMock);
    });
  });
});
