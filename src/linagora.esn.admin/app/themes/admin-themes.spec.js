'use strict';

/* global chai: false, sinon: false, _: false */

var expect = chai.expect;

describe('The adminThemes component', function() {
  var $controller, $rootScope, $scope, $q;
  var ADMIN_LOADING_STATUS;
  var fileUploadService;
  var themeService = {
    getTheme: sinon.stub(),
    saveTheme: sinon.stub()
  };

  var rejectWithErrorNotification = sinon.spy();

  beforeEach(function() {
    module('jadeTemplates');
    module('linagora.esn.admin', function($provide) {
      $provide.value('$filter', function() { return _.identity; });
      $provide.value('themesService', {
        forDomain: function() { return themeService; }
      });

      $provide.value('esnConfig', function(key, defaultValue) {
        return $q.when({maxSizeUpload: defaultValue});
      });

      $provide.value('fileUploadService', {get: function() { return fileUploadService; }});
      $provide.value('esnI18nService', {translate: function(value) {return value;}});
      $provide.value('rejectWithErrorNotification', rejectWithErrorNotification);

      $provide.constant('MAX_SIZE_UPLOAD_DEFAULT', 104857600);

      $provide.constant('ADMIN_THEMES_COLOR_VARIABLES', [
        {apiVariable: 'primaryColor', displayText: 'Primary color', default: '#2196F3'},
        {apiVariable: 'secondaryColor', displayText: 'Secondary color', default: '#FFC107'},
        {apiVariable: 'bodyBgColor', displayText: 'Background color', default: '#f7f7f7'},
        {apiVariable: 'textColor', displayText: 'Text color', default: '#ffffff'}
      ]);

      $provide.constant('ADMIN_THEMES_LOGO_VARIABLES', [
        {apiVariable: 'logo', displayText: 'Logo', default: '/images/white-logo.svg'},
        {apiVariable: 'favicon', displayText: 'Favicon', default: '/images/white-logo.svg'}
      ]);
    });
  });

  beforeEach(inject(function(
    _$controller_,
    _$rootScope_,
    _$q_,
    _ADMIN_LOADING_STATUS_
  ) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $q = _$q_;
    ADMIN_LOADING_STATUS = _ADMIN_LOADING_STATUS_;
  }));

  beforeEach(function() {
    themeService.saveTheme.returns($q.when());
    themeService.getTheme.returns($q.when({
      colors: {
        bodyBgColor: '#000', primaryColor: '#FB1',
        secondaryColor: '#9FD397', textColor: '#68036B'
      },
      logos: {logo: '/images/indeed.png', favicon: '/images/halp.png'}
    }));

    fileUploadService = {
      addFile: sinon.spy(),
      start: sinon.spy(),
      await: sinon.spy()
    };
    rejectWithErrorNotification.reset();
  });

  function initController() {
    $scope = $rootScope.$new();
    $scope.form = {$pristine: false};

    var controller = $controller('adminThemesController', {$scope: $scope});

    $scope.$digest();

    return controller;
  }

  describe('$onInit', function() {
    it('should fetch the them from server', function() {
      var target = initController();

      target.$onInit();
      expect(themeService.getTheme).to.have.been.called;
    });

    it('should initialize the model with default values when variables are absent from fetched theme', function(done) {
      var target = initController();

      themeService.getTheme.returns($q.when({
        colors: {},
        logos: {}
      }));

      target.$onInit().then(function() {
        expect(target.model.colors).to.eql({
          newValues: {
            _bodyBgColor: '#f7f7f7', _primaryColor: '#2196F3',
            _secondaryColor: '#FFC107', _textColor: '#ffffff'
          },
          originalValues: {
            _bodyBgColor: '#f7f7f7', _primaryColor: '#2196F3',
            _secondaryColor: '#FFC107', _textColor: '#ffffff'
          }
        });

        expect(target.model.logos).to.eql({
          newValues: {_logo: '/images/white-logo.svg', _favicon: '/images/white-logo.svg'},
          originalValues: {_logo: '/images/white-logo.svg', _favicon: '/images/white-logo.svg'}
        });

        done();
      });

      $rootScope.$digest();
    });

    it('should initialize the model with values from fetched theme', function(done) {
      var target = initController();

      themeService.getTheme.returns($q.when({
        colors: {
          bodyBgColor: '#000', primaryColor: '#FB1',
          secondaryColor: '#9FD397', textColor: '#68036B'
        },
        logos: {logo: '/images/indeed.png', favicon: '/images/halp.png'}
      }));

      target.$onInit().then(function() {
        expect(target.model.colors).to.eql({
          newValues: {
            _bodyBgColor: '#000', _primaryColor: '#FB1',
            _secondaryColor: '#9FD397', _textColor: '#68036B'
          },
          originalValues: {
            _bodyBgColor: '#000', _primaryColor: '#FB1',
            _secondaryColor: '#9FD397', _textColor: '#68036B'
          }
        });

        expect(target.model.logos).to.eql({
          newValues: {_logo: '/images/indeed.png', _favicon: '/images/halp.png'},
          originalValues: {_logo: '/images/indeed.png', _favicon: '/images/halp.png'}
        });

        done();
      });

      $rootScope.$digest();
    });

    it('should set the loading status to `loaded` when request has succeeded', function(done) {
      var target = initController();

      themeService.getTheme.returns($q.when({colors: {}, logos: {}}));

      target.$onInit().then(function() {
        expect(target.status).to.eq(ADMIN_LOADING_STATUS.loaded);
        done();
      });

      $rootScope.$digest();
    });

    it('should set the loading status to `error` when request has failed', function(done) {
      var target = initController();

      themeService.getTheme.returns($q.reject());

      target.$onInit().then(function() {
        expect(target.status).to.eq(ADMIN_LOADING_STATUS.error);
        done();
      });

      $rootScope.$digest();
    });
  });

  describe('save', function() {
    it('should save the new theme on the server', function(done) {
      var target = initController();

      target.$onInit().then(function() {
        target.model.colors.primaryColor = '#FB1';
        target.model.colors.secondaryColor = '#50079F';
        target.model.colors.bodyBgColor = '#9EBDB7';
        target.model.colors.textColor = '#000';
        target.model.logos.logo = '/images/indeed.png';
        target.model.logos.favicon = '/images/halp.png';

        target.save().then(function() {
          expect(themeService.saveTheme).to.have.been.calledWith({
            colors: [
              {key: 'primaryColor', value: '#FB1'},
              {key: 'secondaryColor', value: '#50079F'},
              {key: 'bodyBgColor', value: '#9EBDB7'},
              {key: 'textColor', value: '#000'}
            ],
            logos: {logo: '/images/indeed.png', favicon: '/images/halp.png'}
          });
          done();
        });
      });

      $rootScope.$digest();
    });

    it('should set the form back to pristine state when saving succeeded', function(done) {
      var target = initController();

      target.$onInit().then(function() {
        target.model.colors.primaryColor = '#FB1';
        target.model.colors.secondaryColor = '#50079F';
        target.model.colors.bodyBgColor = '#9EBDB7';
        target.model.colors.textColor = '#000';
        target.model.logos.logo = '/images/indeed.png';
        target.model.logos.favicon = '/images/halp.png';

        $scope.form.$pristine = false;
        target.save().then(function() {
          expect($scope.form.$pristine).to.eq(true);
          done();
        });
      });

      $rootScope.$digest();
    });

    it('should not set the form back to pristine state when saving failed', function(done) {
      var target = initController();

      themeService.saveTheme.returns($q.reject());

      target.$onInit().then(function() {
        target.model.colors.primaryColor = '#FB1';
        target.model.colors.secondaryColor = '#50079F';
        target.model.colors.bodyBgColor = '#9EBDB7';
        target.model.colors.textColor = '#000';
        target.model.logos.logo = '/images/indeed.png';
        target.model.logos.favicon = '/images/halp.png';

        $scope.form.$pristine = false;
        target.save().finally(function() {
          expect($scope.form.$pristine).to.eq(false);
          done();
        });
      });

      $rootScope.$digest();
    });
  });

  describe('onFileSelect', function() {
    it('should display an error when the file is too big', function(done) {
      var target = initController();

      target.onFileSelect([{size: 1000000000}]).then(function() {
        expect(rejectWithErrorNotification).to.have.been
          .calledWith('Sorry, the image is too heavy. The max image size is %s', sinon.match.object);
        done();
      });

      $scope.$digest();
    });

    it('should upload the file', function(done) {
      var target = initController();
      var file = {size: 12};

      target.uploadLock.logo = false;

      target.onFileSelect([file], 'logo').then(function() {
        expect(fileUploadService.addFile).to.have.been.calledWith(file, true);
        expect(fileUploadService.start).to.have.been.called;
        expect(fileUploadService.await).to.have.been.calledWith(sinon.match.func, sinon.match.func);
        expect(target.uploadLock.logo).to.be.true;
        done();
      });

      $scope.$digest();
    });

    it('should display an error when file uploading has failed', function(done) {
      var target = initController();

      target.uploadLock.logo = true;
      target.onFileSelect([{size: 12}], 'logo').then(function() {
        expect(target.uploadLock.logo).to.be.true;
        // Calls `onFileSelect`'s `uploadError` callback
        fileUploadService.await.args[0][1]('error');
        expect(target.uploadLock.logo).to.be.false;
        expect(rejectWithErrorNotification).to.have.been
          .calledWith('Sorry, we couldn\'t upload the image. Try again later', sinon.match.object);
        done();
      });

      $scope.$digest();
    });

    it('should update the logo file when uploading has succeeded', function(done) {
      var target = initController();

      target.uploadLock.logo = true;
      target.onFileSelect([{size: 12}], 'logo').then(function() {
        expect(target.uploadLock.logo).to.be.true;
        // Calls `onFileSelect`'s `uploadError` callback
        fileUploadService.await.args[0][0]([{response: {data: {_id: 'cf41352a-600c-40c2-9510-1035d6e34b2d'}}}]);
        expect(target.uploadLock.logo).to.be.false;
        expect(target.model.logos.logo).to.eq('cf41352a-600c-40c2-9510-1035d6e34b2d');
        done();
      });

      $scope.$digest();
    });
  });
});
