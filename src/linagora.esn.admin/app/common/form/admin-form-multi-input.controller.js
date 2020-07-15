'use-strict';

angular.module('linagora.esn.admin')

.controller('adminFormMultiInputController', function($scope, $timeout, $element, _) {
  $scope.ngModel = $scope.ngModel ? $scope.ngModel : {};

  var self = this;
  var ngModel = $scope.ngModel || {};

  self.fields = [];
  self.requiredFields = [];
  self.availableTypes = $scope.availableTypes;
  self.requiredTypes = $scope.requiredTypes;

  angular.forEach(ngModel, function(value, key) {
    if (_.contains(self.availableTypes, key)) {
      self.fields.push({
        type: key,
        value: value
      });
    }

    if (_.contains(self.requiredTypes, key)) {
      self.requiredFields.push({
        type: key,
        value: value
      });
    }
  });

  if (self.requiredTypes && self.requiredFields.length === 0) {
    self.requiredTypes.forEach(function(type) {
      self.requiredFields.push({
        type: type,
        value: ''
      });
    });
  }

  self.showAddButton = function() {
    return getUnselectedTypes().length > 0;
  };

  self.isTypeSelected = function(type) {
    return Object.keys(ngModel).indexOf(type) > -1;
  };

  self.onDataChange = function() {
    Object.keys(ngModel).forEach(function(key) {
      delete ngModel[key];
    });

    self.fields.forEach(function(item) {
      ngModel[item.type] = item.value;
    });

    self.requiredFields.forEach(function(item) {
      ngModel[item.type] = item.value;
    });
  };

  self.addField = function() {
    var unselectedTypes = getUnselectedTypes();

    if (!unselectedTypes.length) {
      return;
    }

    var newFieldType = unselectedTypes[0];

    self.fields.push({
      value: '',
      type: newFieldType
    });

    ngModel[newFieldType] = '';

    _focusLastMatchingItem('.admin-form-multi-input-content .multi-input-text');
  };

  self.deleteField = function(field, form) {
    _.remove(self.fields, { type: field.type });

    delete ngModel[field.type];
    form.$setDirty();
  };

  function getUnselectedTypes() {
    return _.difference(self.availableTypes, Object.keys(ngModel));
  }

  function _focusLastMatchingItem(selector) {
    $timeout(function() {
      $element.find(selector).last().focus();
    }, 0, false);
  }
});
