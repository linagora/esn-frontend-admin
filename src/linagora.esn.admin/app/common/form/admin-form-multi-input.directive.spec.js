'use strict';

/* global chai: false */
/* global sinon: false */

var expect = chai.expect;

describe('The adminFormGroup directive', function() {
  var $rootScope, $compile;

  beforeEach(function() {
    module('jadeTemplates');
    module('linagora.esn.admin');

    inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    });
  });

  function initTemplate() {
    return '<admin-form-multi-input ng-model="ngModel", available-types="availableTypes" />';
  }

  function initDirective(scope, template) {
    scope = scope || $rootScope.$new();
    scope.ngModel = {some_key: 'value'};
    scope.availableTypes = ['some_key', 'other_key'];

    var element = $compile(template)(scope);

    scope.$digest();

    return element;
  }

  it('should add one field if availableTypes is remain key that not be selected', function() {

    var template = initTemplate();
    var element = initDirective(null, template);
    var ctrl = element.isolateScope().$ctrl;
    var addButton = angular.element(element[0].querySelector('.button.clickable'));
    var addField = sinon.spy(ctrl, 'addField');

    addButton[0].click();

    var input = angular.element(element[0].querySelectorAll('input.form-control.multi-input-text'));

    expect(addField).to.have.been.called;
    expect(input.length).to.equal(2);
    expect(ctrl.fields).to.deep.equal([{type: 'some_key', value: 'value'}, {type: 'other_key', value: ''}]);
  });

  it('should focus on the last field added', function(done) {
    var template = initTemplate();
    var element = initDirective(null, template);
    var ctrl = element.isolateScope().$ctrl;
    var addButton = angular.element(element[0].querySelector('.button.clickable'));
    var addField = sinon.spy(ctrl, 'addField');

    addButton[0].click();

    var input = angular.element(element[0].querySelectorAll('input.form-control.multi-input-text'));

    expect(addField).to.have.been.called;
    expect(input[1]).have.focus;

    done();
  });

  it('should remove one field from scope ngModel', function() {
    var template = initTemplate();
    var element = initDirective(null, template);
    var ctrl = element.isolateScope().$ctrl;
    var deleteButton = angular.element(element[0].querySelector('btn'));
    var deleteField = sinon.spy(ctrl, 'deleteField');

    deleteButton[0].click();

    var input = angular.element(element[0].querySelectorAll('input.form-control.multi-input-text'));

    expect(deleteField).to.have.been.called;
    expect(input.length).to.equal(0);
    expect(ctrl.fields).to.deep.equal([]);
  });

  it('should update data follow the changing of fields', function() {
    var template = initTemplate();
    var element = initDirective(null, template);

    var input = angular.element(element[0].querySelectorAll('input.form-control.multi-input-text'));
    var ctrl = element.isolateScope().$ctrl;
    var onDataChange = sinon.spy(ctrl, 'onDataChange');

    input.val('something').trigger('input');

    expect(onDataChange).to.have.been.called;
  });

  it('should update data follow the changing of selection', function() {

    var template = initTemplate();
    var element = initDirective(null, template);

    var selection = angular.element(element[0].querySelectorAll('select.form-control.multi-input-type'));
    var ctrl = element.isolateScope().$ctrl;
    var onDataChange = sinon.spy(ctrl, 'onDataChange');

    selection.val('something').trigger('change');

    expect(onDataChange).to.have.been.called;
  });

  it('should disable option have been selected', function() {
    var template = initTemplate();
    var element = initDirective(null, template);

    var options = angular.element(element[0].querySelectorAll('select.form-control.multi-input-type'));
    var ctrl = element.isolateScope().$ctrl;
    var isTypeSelected = sinon.spy(ctrl, 'isTypeSelected');

    options.val('other_key').change();

    expect(options).to.be.disabled;
    expect(isTypeSelected).to.have.been.called;
  });
});
