
'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminUsersFormService', function() {

  var $rootScope, $q;
  var adminUsersFormService;

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(
      _$rootScope_,
      _$q_,
      _adminUsersFormService_
    ) {
      $rootScope = _$rootScope_;
      $q = _$q_;
      adminUsersFormService = _adminUsersFormService_;
    });
  });

  describe('The emailAvailabilityChecker function', function() {
    var esnAvailabilityService;

    beforeEach(inject(function(_esnAvailabilityService_) {
      esnAvailabilityService = _esnAvailabilityService_;

      esnAvailabilityService.checkEmailAvailability = sinon.stub();
    }));

    it('should reject if it fails to check the availability status', function(done) {
      var email = 'e@mail';

      esnAvailabilityService.checkEmailAvailability.returns($q.reject(new Error('an_error')));

      adminUsersFormService.emailAvailabilityChecker(email).catch(function(err) {
        expect(err.message).to.equal('an_error');
        expect(esnAvailabilityService.checkEmailAvailability).to.have.been.calledWith(email);
        done();
      });

      $rootScope.$digest();
    });

    it('should reject if the email is unavailable according to the availability status', function(done) {
      var email = 'e@mail';
      var status = {
        available: false,
        message: 'detail here'
      };

      esnAvailabilityService.checkEmailAvailability.returns($q.when(status));

      adminUsersFormService.emailAvailabilityChecker(email).catch(function(err) {
        expect(err.message).to.equal(status.message);
        expect(esnAvailabilityService.checkEmailAvailability).to.have.been.calledWith(email);
        done();
      });

      $rootScope.$digest();
    });

    it('should resolve if the email is available according to the availability status', function(done) {
      var email = 'e@mail';
      var status = {
        available: true
      };

      esnAvailabilityService.checkEmailAvailability.returns($q.when(status));

      adminUsersFormService.emailAvailabilityChecker(email).then(function() {
        expect(esnAvailabilityService.checkEmailAvailability).to.have.been.calledWith(email);
        done();
      });

      $rootScope.$digest();
    });
  });
});
