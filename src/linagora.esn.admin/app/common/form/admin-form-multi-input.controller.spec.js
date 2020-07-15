'use strict';

/* global chai: false */

var expect = chai.expect;

describe('The adminFormMultiInput controller', function() {
  var $scope, $rootScope, $controller;
  var $timeout;
  var element = {};

  beforeEach(function() {
    module('linagora.esn.admin');

    inject(function(_$rootScope_, _$controller_, _$timeout_) {
      $rootScope = _$rootScope_;
      $timeout = _$timeout_;
      $controller = _$controller_;
    });
  });

  var initController = function(scope) {
    $scope = scope || $rootScope.$new();

    var ctrl = $controller('adminFormMultiInputController', {
      $scope: $scope,
      $element: element,
      $timeout: $timeout
    });

    $scope.$digest();

    return ctrl;
  };

  it('should init fields value if ngModel is undefined', function() {
    var ctrl = initController();

    expect(ctrl.fields).to.deep.equal([]);
  });

  it('should init required fields value with required type', function() {
    $scope.requiredTypes = ['type1', 'type2'];

    var ctrl = initController($scope);

    expect(ctrl.requiredFields).to.shallowDeepEqual([
      { type: 'type1', value: '' },
      { type: 'type2', value: '' }
    ]);

  });

  describe('The showAddButton fn', function() {

    it('should return true if user did not select all options', function() {
      var ctrl = initController();

      $scope.ngModel = {some_key: 'value'};
      ctrl.availableTypes = ['other_key', 'some_key'];

      expect(ctrl.showAddButton()).to.be.true;
    });
  });

  describe('The deleteField fn', function() {

    it('should remove one field from scope ngModel', function() {
      var ctrl = initController();
      var form = {
        $valid: true,
        $dirty: false,
        $setDirty: function() {
          form.$dirty = true;
        }
      };
      var deletedField = { type: 'some_key', value: 'value' };

      ctrl.fields = [{ type: 'some_key', value: 'value' }, { type: 'other_key', value: 'other_value' }];

      ctrl.deleteField(deletedField, form);
      expect(ctrl.fields).to.deep.equal([{ type: 'other_key', value: 'other_value' }]);
    });
  });

});
