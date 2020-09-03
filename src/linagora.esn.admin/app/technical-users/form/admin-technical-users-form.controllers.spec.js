'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminTechnicalUsersFormController', function() {
  var $controller, $rootScope, $scope;
  var ADMIN_TECHNICAL_USER_TYPES;

  beforeEach(function() {
    angular.mock.module('linagora.esn.admin');

    inject(function(_$controller_, _$rootScope_, _ADMIN_TECHNICAL_USER_TYPES_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      ADMIN_TECHNICAL_USER_TYPES = _ADMIN_TECHNICAL_USER_TYPES_;
    });
  });

  function initController(bindings) {
    $scope = $rootScope.$new();

    var controller = $controller('adminTechnicalUsersFormController', { $scope: $scope }, bindings);

    controller.$onInit();
    $scope.$digest();

    return controller;
  }

  describe('$onInit function', function() {
    it('should initialize an empty technicalUser when no existed technicalUser', function() {
      var controller = initController(null);

      expect(controller.technicalUser).to.deep.equal({
        name: '',
        type: '',
        description: '',
        data: [{ key: '', value: '' }]
      });
    });

    it('should initialize with an existed technicalUser', function() {
      var bindings = {
        technicalUser: {
          name: 'James',
          type: 'dav',
          data: {
            a: 'a',
            b: 'b'
          }
        }
      };

      var controller = initController(bindings);

      expect(controller.technicalUser).to.deep.equal(bindings.technicalUser);
    });

    it('should initialize ADMIN_TECHNICAL_USER_TYPES', function() {
      var controller = initController(null);

      expect(controller.ADMIN_TECHNICAL_USER_TYPES).to.equals(ADMIN_TECHNICAL_USER_TYPES);
    });
  });

  describe('onAddBtnClick function', function() {
    it('should push a new object to technicalUser.data', function() {
      var bindings = {
        technicalUser: {
          data: []
        }
      };
      var controller = initController(bindings);

      controller.onAddBtnClick();

      expect(controller.technicalUser.data).to.deep.equal([
        {
          key: '',
          value: ''
        }
      ]);
    });
  });

  describe('onRemoveBtnClick function', function() {
    it('should remove an object of coresponding index from technicalUser.data', function() {
      var bindings = {
        technicalUser: {
          data: {
            key1: 'value1',
            key2: 'value2',
            key3: 'value3'
          }
        }
      };

      var controller = initController(bindings);

      controller.onRemoveBtnClick(1);

      expect(controller.technicalUser.data).to.deep.equal([
        { key: 'key1', value: 'value1' },
        { key: 'key3', value: 'value3' }
      ]);
    });
  });
});
