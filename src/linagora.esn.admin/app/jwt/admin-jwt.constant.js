'use strict';

angular.module('linagora.esn.admin')

  .constant('ADMIN_JWT_AVAILABLE_ALGORITHMS', [{
    name: 'HS256',
    description: 'HMAC using SHA-256 hash algorithm'
  }, {
    name: 'HS384',
    description: 'HMAC using SHA-384 hash algorithm'
  }, {
    name: 'HS512',
    description: 'HMAC using SHA-512 hash algorithm'
  }, {
    name: 'RS256',
    description: 'RSASSA using SHA-256 hash algorithm'
  }, {
    name: 'RS384',
    description: 'RSASSA using SHA-384 hash algorithm'
  }, {
    name: 'RS512',
    description: 'RSASSA using SHA-512 hash algorithm'
  }, {
    name: 'ES256',
    description: 'ECDSA using P-256 curve and SHA-256 hash algorithm'
  }, {
    name: 'ES384',
    description: 'ECDSA using P-384 curve and SHA-384 hash algorithm'
  }, {
    name: 'ES512',
    description: 'ECDSA using P-521 curve and SHA-512 hash algorithm'
  }])
  .constant('ADMIN_JWT_DOWNLOAD_FILE_TYPE', 'text/plain');
