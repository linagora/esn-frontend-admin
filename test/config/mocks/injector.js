angular.module('esn.test.injector', []).run(function($q) {
  window.$q = $q;
});

beforeEach(angular.mock.module('esn.test.injector'));

window.$q = angular.injector(['ng']).get('$q');
