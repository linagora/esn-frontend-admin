'use strict';

require('../form/admin-form.constant.js');

angular.module('linagora.esn.admin')
  .directive('adminFormInputBytes', function(ADMIN_FORM_EVENT) {
    function link(scope) {
      var limit;
      var UNITS = {
        BYTE: 0,
        KB: 10,
        MB: 20,
        GB: 30,
        TB: 40,
        PB: 50
      };

      init();

      function init() {
        scope.display = {};
        scope.AVAILABLE_UNITS = Object.keys(UNITS);
        scope.inputUnit = UNITS[scope.inputUnit] ? scope.inputUnit : scope.AVAILABLE_UNITS[0];

        limit = {
          min: _determineLimit(scope.min),
          max: _determineLimit(scope.max)
        };

        _optimizeAvailableUnits();

        scope.display.unit = _determineUnit(scope.inputValue, scope.inputUnit);
        scope.display.value = _convertUnit(scope.inputValue, scope.inputUnit, scope.display.unit);

        _updateLimit();
      }

      scope.onChange = function() {
        scope.inputValue = _convertUnit(scope.display.value, scope.display.unit, scope.inputUnit);
      };

      scope.onSelect = function(unit) {
        if (scope.form.dataSizeInput.$pristine) {
          scope.form.dataSizeInput.$setDirty();
        }

        scope.display.unit = unit;

        _updateLimit();

        scope.onChange();
      };

      function _determineUnit(inputValue, inputUnit) {
        if (!inputValue || inputValue === 0) {
          return inputUnit;
        }

        var bytesValue = inputValue * Math.pow(2, UNITS[inputUnit]);
        var units = angular.copy(scope.AVAILABLE_UNITS);
        var unit;

        units.reverse();

        angular.forEach(units, function(key) {
          var value = UNITS[key];

          if (!unit && bytesValue % Math.pow(2, value) === 0) {
            unit = key;
          }
        });

        return unit;
      }

      function _convertUnit(value, fromUnit, toUnit) {
        if (!value || value === 0) {
          return value;
        }

        var distance = UNITS[fromUnit] - UNITS[toUnit];

        return value * Math.pow(2, distance);
      }

      function _determineLimit(limitString) {
        if (!limitString) {
          return;
        }

        var limit;

        angular.forEach(UNITS, function(value, key) {
          var split = limitString.split(key);

          if (!limit && split.length === 2 && angular.equals(split[1], '')) {
            limit = {
              key: key,
              value: parseFloat(split[0])
            };
          }
        });

        return limit;
      }

      function _updateLimit() {
        if (limit.min) {
          scope.minValue = Math.ceil(_convertUnit(limit.min.value, limit.min.key, scope.display.unit));
        }

        if (limit.max) {
          scope.maxValue = _convertUnit(limit.max.value, limit.max.key, scope.display.unit);
        }
      }

      function _optimizeAvailableUnits() {
        if (!limit.max) {
          return;
        }

        var bytesMax = limit.max.value * Math.pow(2, UNITS[limit.max.key]);
        var units = angular.copy(scope.AVAILABLE_UNITS);

        units.reverse();

        angular.forEach(units, function(key) {
          var value = UNITS[key];

          if (bytesMax < Math.pow(2, value)) {
            scope.AVAILABLE_UNITS.splice(-1, 1);
          }
        });
      }

      var unmodifiedInputValue = angular.copy(scope.inputValue);

      scope.$on(ADMIN_FORM_EVENT.reset, function() {
        scope.inputValue = angular.copy(unmodifiedInputValue);

        init();
      });

      scope.$on(ADMIN_FORM_EVENT.submit, function() {
        unmodifiedInputValue = angular.copy(scope.inputValue);

        init();
      });
    }

    return {
      restrict: 'E',
      template: require("./admin-form-input-bytes.pug"),
      scope: {
        inputUnit: '@',
        inputValue: '=',
        min: '@',
        max: '@',
        required: '@',
        label: '@',
        disabled: '='
      },
      link: link
    };
  });
