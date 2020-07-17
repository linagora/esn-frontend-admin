'use strict';

const _ = require('lodash');

angular.module('linagora.esn.admin')

  .factory('adminFeaturesService', function(esnFeatureRegistry) {
    return {
      includeFeaturesMetadata: includeFeaturesMetadata,
      getFeaturesConfigValue: getFeaturesConfigValue
    };

    function includeFeaturesMetadata(config) {
      var configData = config || {};
      var featuresMetadata = _.values(esnFeatureRegistry.getAll());

      return featuresMetadata.map(function(feature) {
        feature.configurations.forEach(function(configuration, index) {
          feature.configurations[index].value = configData[configuration.name] ? configData[configuration.name] : false;
        });

        return feature;
      });
    }

    function getFeaturesConfigValue(features) {
      var configObject = {};

      features.forEach(function(feature) {
        feature.configurations.forEach(function(configuration) {
          configObject[configuration.name] = configuration.value;
        });
      });

      return configObject;
    }
  });
