'use strict';

angular.module('linagora.esn.admin')

  .directive('adminRolesListItem', function($compile) {
    function link(scope, element) {
      var template = '<' + scope.template + ' user="user" />';

      element.append($compile(template)(scope));
    }

    return {
      restrict: 'E',
      template: '',
      scope: {
        user: '=',
        template: '='
      },
      link: link
    };
  });
