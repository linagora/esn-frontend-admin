'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminTechnicalUsersService service', function() {
  var adminTechnicalUsersService;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });
  
  beforeEach(function() {
    angular.mock.inject(function(_adminTechnicalUsersService_) {
      adminTechnicalUsersService = _adminTechnicalUsersService_;
    });
  });

  describe('The qualifyTechnicalUser function', function() {
    it('should transform technical user\'s data from array to object', function() {
      var technicalUser = {
        name: 'Sabre',
        type: 'dav',
        data: [{ key: 'a', value: 'b' }, { key: 'c', value: 'd'}]
      };

      var qualifiedTechnicalUser = {
        name: 'Sabre',
        type: 'dav',
        data: { a: 'b', c: 'd' }
      };

      expect(adminTechnicalUsersService.qualifyTechnicalUser(technicalUser)).to.deep.equal(qualifiedTechnicalUser);
    });
  });
});
