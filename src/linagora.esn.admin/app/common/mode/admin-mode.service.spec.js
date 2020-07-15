'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminModeService service', function() {
  var adminModeService, $stateParams, $state, session, ADMIN_MODE;

  beforeEach(module('linagora.esn.admin'));

  beforeEach(inject(function(_$stateParams_, _$state_, _adminModeService_, _session_, _ADMIN_MODE_) {
    $stateParams = _$stateParams_;
    $state = _$state_;
    adminModeService = _adminModeService_;
    session = _session_;
    ADMIN_MODE = _ADMIN_MODE_;
  }));

  describe('The getCurrentMode function', function() {
    it('should return "platform" when domainId in state is platform', function() {
      $stateParams.domainId = ADMIN_MODE.platform;

      expect(adminModeService.getCurrentMode()).to.equal('platform');
    });

    it('should return "domain" when domainId in state is not platform', function() {
      $stateParams.domainId = 'a domain id';

      expect(adminModeService.getCurrentMode()).to.equal('domain');
    });
  });

  describe('The isPlatformMode fn', function() {
    it('should return true when domainId in state is platform', function() {
      $stateParams.domainId = ADMIN_MODE.platform;

      expect(adminModeService.isPlatformMode()).to.be.true;
    });
  });

  describe('The isDomainMode fn', function() {
    it('should return true when domainId in state is not platform', function() {
      $stateParams.domainId = 'a domain id';

      expect(adminModeService.isDomainMode()).to.be.true;
    });
  });

  describe('The goToDomainMode fn', function() {
    it('should go to domain state with current session domain', function() {
      $state.go = sinon.spy();
      session.domain = { _id: 111 };

      adminModeService.goToDomainMode();

      expect($state.go).to.have.been.calledWith('admin.domain', { domainId: session.domain._id });
    });
  });

  describe('The goToPlatformMode fn', function() {
    it('should go to domain state with platform mode', function() {
      $state.go = sinon.spy();

      adminModeService.goToPlatformMode();

      expect($state.go).to.have.been.calledWith('admin.domain', { domainId: ADMIN_MODE.platform });
    });
  });

});
