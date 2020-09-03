'use strict';

const _ = require('lodash');

require('../app.constants.js');
require('./admin-themes.constants.js');

angular.module('linagora.esn.admin').controller('adminThemesController', adminThemesController);

function adminThemesController(
  $stateParams,
  $scope,
  $filter,
  $window,
  asyncAction,
  esnI18nService,
  themesService,
  esnConfig,
  fileUploadService,
  colorContrastService,
  rejectWithErrorNotification,
  ADMIN_LOADING_STATUS,
  ADMIN_THEMES_COLOR_VARIABLES,
  ADMIN_THEMES_LOGO_VARIABLES,
  MAX_SIZE_UPLOAD_DEFAULT
) {
  var self = this;

  self.themesServiceForDomain = themesService.forDomain($stateParams.domainId);
  self.status = ADMIN_LOADING_STATUS.loading;
  self.uploadLock = {};
  self.groupLength = 3;

  self.adminThemesColorVariablesGroups = _mapAdminThemesVariables(ADMIN_THEMES_COLOR_VARIABLES, self.groupLength);
  self.adminThemesLogoVariablesGroups = _mapAdminThemesVariables(ADMIN_THEMES_LOGO_VARIABLES, self.groupLength);

  self.model = {
    colors: {
      originalValues: {},
      newValues: {}
    },
    logos: {
      originalValues: {},
      newValues: {}
    }
  };

  self.$onInit = $onInit;
  self.save = save;
  self.onFileSelect = onFileSelect;
  self.computeTextColor = colorContrastService.computeTextColor;
  self.reset = reset;

  function $onInit() {
    self.status = ADMIN_LOADING_STATUS.loading;

    return self.themesServiceForDomain.getTheme().then(function(theme) {
      ADMIN_THEMES_COLOR_VARIABLES.forEach(function(item) {
        _createAccessorsAndBackingField(item.apiVariable, 'colors', theme.colors[item.apiVariable] || item.default);
      });

      ADMIN_THEMES_LOGO_VARIABLES.forEach(function(item) {
        _createAccessorsAndBackingField(item.apiVariable, 'logos', theme.logos[item.apiVariable] || item.default);
      });

      self.status = ADMIN_LOADING_STATUS.loaded;
    }).catch(function() {
      self.status = ADMIN_LOADING_STATUS.error;
    });
  }

  function save() {
    var messages = {
      progressing: 'Saving configuration...',
      success: 'Configuration saved. Click on \'Reload\' to apply changes',
      failure: 'Failed to save configuration'
    };

    var reloadOption = {
      onSuccess: {
        linkText: 'Reload',
        action: function() { $window.location.reload(); }
      }
    };

    return asyncAction(
      messages,
      saveConfiguration,
      reloadOption
    );
  }

  function saveConfiguration() {
    var newColors = ADMIN_THEMES_COLOR_VARIABLES.map(function(item) {
      return { key: item.apiVariable, value: self.model.colors[item.apiVariable] };
    });

    var newLogos = {};

    ADMIN_THEMES_LOGO_VARIABLES.forEach(function(item) {
      newLogos[item.apiVariable] = self.model.logos[item.apiVariable] === undefined || self.model.logos[item.apiVariable] === item.default ? '' : self.model.logos[item.apiVariable];
    });

    return self.themesServiceForDomain.saveTheme({ colors: newColors, logos: newLogos })
      .then(function() {
        _.assign(self.model.colors.originalValues, self.model.colors.newValues);
        _.assign(self.model.logos.originalValues, self.model.logos.newValues);
      }).finally(_mutatePristine);
  }

  function onFileSelect(files, destination) {
    var uploadService = fileUploadService.get();

    return esnConfig('core.maxSizeUpload', MAX_SIZE_UPLOAD_DEFAULT).then(function(maxSizeUpload) {
      var file = files[0];

      if (file.size < maxSizeUpload) {
        self.uploadLock[destination] = true;
        _mutatePristine();
        uploadService.addFile(file, true);
        uploadService.start();
        uploadService.awaitFor(_.partialRight(uploadComplete, destination), _.partialRight(uploadError, destination));
      } else {
        rejectWithErrorNotification(
          esnI18nService.translate(
            'Sorry, the image is too heavy. The max image size is %s', { maxSizeUpload: $filter('bytes')(maxSizeUpload) }
          ).toString(), {});
      }
    });
  }

  function uploadComplete(result, destination) {
    self.uploadLock[destination] = false;
    self.model.logos[destination] = result[0].response.data._id;
  }

  function uploadError(error, destination) {
    self.uploadLock[destination] = false;
    rejectWithErrorNotification(
      esnI18nService.translate('Sorry, we couldn\'t upload the image. Try again later').toString(), {});
    _mutatePristine();
  }

  function _mutatePristine() {
    if (_.any(_.values(self.uploadLock))) { return ($scope.form.$pristine = true); }
    $scope.form.$pristine = true;
    [self.model.colors, self.model.logos].forEach(function(object) {
      for (var originalValuesKey in object.originalValues) { // eslint-disable-line
        if (object.newValues[originalValuesKey] !== object.originalValues[originalValuesKey]) {
          $scope.form && ($scope.form.$pristine = false);
          break;
        }
      }
    });
  }

  function _mapAdminThemesVariables(array, groupLength) {
    var adminThemesVariablePairs = [];

    function _mapper(item) {
      if (!item) return undefined;

      var result = _.clone(item);

      result.displayText = esnI18nService.translate(item.displayText).toString();

      return result;
    }

    for (var i = 0; i < array.length; i = i + groupLength) {
      var subgroup = [];

      for (var j = i; j < Math.min(array.length, i + groupLength); j++) {
        subgroup.push(_mapper(array[j]));
      }
      if (subgroup.length > 0) { adminThemesVariablePairs.push(subgroup); }
    }

    return { groups: adminThemesVariablePairs, groupLength: groupLength };
  }

  function _createAccessorsAndBackingField(propertyName, modeldestination, value) {
    var backingField = '_' + propertyName;

    self.model[modeldestination].originalValues[backingField] =
      self.model[modeldestination].newValues[backingField] = value;

    Object.defineProperty(self.model[modeldestination], propertyName, {
      get: function() { return self.model[modeldestination].newValues[backingField]; },
      set: function(value) {
        self.model[modeldestination].newValues[backingField] = value;
        _mutatePristine();
      }
    });
  }

  function reset() {
    ADMIN_THEMES_COLOR_VARIABLES.forEach(function(item) {
      self.model.colors[item.apiVariable] = item.default;
    });

    ADMIN_THEMES_LOGO_VARIABLES.forEach(function(item) {
      self.model.logos[item.apiVariable] = item.default;
    });
  }
}
