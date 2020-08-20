'use strict';

describe('The adminAutoconfService service', function() {
  var $httpBackend, adminAutoconfService;
  
  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');
  });

  beforeEach(inject(function(_$httpBackend_, _adminAutoconfService_) {
    $httpBackend = _$httpBackend_;
    adminAutoconfService = _adminAutoconfService_;
  }));

  describe('The save fn', function() {
    it('should send PUT request to the right endpoint with domain id as query', function() {
      var config = { foo: 'bar' };

      $httpBackend.expectPUT('/admin/api/autoconf?domain_id=domain123', config).respond(204);
      adminAutoconfService.save('domain123', config);
      $httpBackend.flush();
    });
  });
});
