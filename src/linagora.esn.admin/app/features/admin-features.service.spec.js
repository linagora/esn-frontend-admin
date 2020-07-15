'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminFeaturesService service', function() {
  var adminFeaturesService, esnFeatureRegistry;

  beforeEach(module('linagora.esn.admin'));

  beforeEach(function() {
    angular.mock.inject(function(_adminFeaturesService_, _esnFeatureRegistry_) {
      adminFeaturesService = _adminFeaturesService_;
      esnFeatureRegistry = _esnFeatureRegistry_;
    });
  });

  describe('The includeFeaturesMetadata fn', function() {
    it('should include featuresMetadata with retrieved config', function() {
      var retrievedConfig = {
        feature1: true,
        feature2: false
      };
      var featuresMetadata = {
        feature1: {
          name: 'Feature 1',
          description: 'Feature No.1',
          configurations: [{
            displayIn: 'module1',
            name: 'feature1'
          }]
        }
      };
      var expectedResult = [{
        name: 'Feature 1',
        description: 'Feature No.1',
        configurations: [{
          displayIn: 'module1',
          name: 'feature1',
          value: true
        }]
      }];

      esnFeatureRegistry.getAll = sinon.stub().returns(featuresMetadata);

      var result = adminFeaturesService.includeFeaturesMetadata(retrievedConfig);

      expect(result).to.shallowDeepEqual(expectedResult);
    });

    it('should return featuresMetadata with config value equal false in case of there is no saved configurations', function() {
      var featuresMetadata = {
        feature1: {
          name: 'Feature 1',
          description: 'Feature No.1',
          configurations: [{
            displayIn: 'module1',
            name: 'feature1'
          }]
        }
      };
      var expectedResult = [{
        name: 'Feature 1',
        description: 'Feature No.1',
        configurations: [{
          displayIn: 'module1',
          name: 'feature1',
          value: false
        }]
      }];

      esnFeatureRegistry.getAll = sinon.stub().returns(featuresMetadata);

      var result = adminFeaturesService.includeFeaturesMetadata(undefined);

      expect(result).to.shallowDeepEqual(expectedResult);
    });
  });

  describe('The getFeaturesConfigValue fn', function() {
    it('should build a savable config object from features data', function() {
      var featuresData = [
        {
          name: 'Feature 1',
          configurations: [
            {
              displayIn: 'module1',
              value: true,
              name: 'module1feature1'
            }, {
              displayIn: 'module2',
              name: 'module2feature2',
              value: false
            }
          ]
        }, {
          name: 'Feature 2',
          configurations: [
            {
              displayIn: 'module1',
              name: 'module1feature2',
              value: true
            }
          ]
        }
      ];
      var expectedResult = {
        module1feature1: true,
        module2feature2: false,
        module1feature2: true
      };

      expect(adminFeaturesService.getFeaturesConfigValue(featuresData)).to.shallowDeepEqual(expectedResult);
    });
  });
});
