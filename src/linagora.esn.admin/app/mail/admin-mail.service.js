'use strict';

angular.module('linagora.esn.admin')

.factory('adminMailService', function(ADMIN_MAIL_TRANSPORT_TYPES) {

  function getTransportType(mailConfig) {
    if (mailConfig && mailConfig.transport) {
      if (mailConfig.transport.module) {
        return ADMIN_MAIL_TRANSPORT_TYPES.local;
      }

      if (mailConfig.transport.config.service) {
        if (mailConfig.transport.config.service === 'gmail') {
          return ADMIN_MAIL_TRANSPORT_TYPES.gmail;
        }

        return ADMIN_MAIL_TRANSPORT_TYPES.local;
      }

      return ADMIN_MAIL_TRANSPORT_TYPES.smtp;
    }

    return null;
  }

  function qualifyTransportConfig(transportType, mailConfig) {
    var config = {
      mail: {
        noreply: mailConfig.mail.noreply,
        feedback: mailConfig.mail.feedback
      }
    };
    var transportConfig = mailConfig.transport.config;

    switch (transportType) {

      case 'Local':
        config.transport = {
          module: mailConfig.transport.module,
          config: {
            dir: transportConfig.dir,
            browser: transportConfig.browser || false
          }
        };
        break;

      case 'SMTP':
        transportConfig.tls = transportConfig.tls || {};
        config.transport = {
          config: {
            host: transportConfig.host,
            secure: transportConfig.secure || false,
            tls: {
              rejectUnauthorized: transportConfig.tls.rejectUnauthorized || false
            },
            port: transportConfig.port,
            auth: qualifyAuthConfig(transportConfig.auth)
          }
        };
        break;

      case 'Gmail':
        config.transport = {
          config: {
            service: 'gmail',
            auth: {
              user: transportConfig.auth.user,
              pass: transportConfig.auth.pass
            }
          }
        };
        break;

      default:
        config = mailConfig;
    }

    return config;
  }

  function qualifyAuthConfig(auth) {
    if (auth && (auth.user || auth.pass)) {
      return auth;
    }
  }

  return {
    getTransportType: getTransportType,
    qualifyTransportConfig: qualifyTransportConfig
  };
});
