'use strict';

angular.module('linagora.esn.admin')

.constant('ADMIN_SEARCH_LIMIT', 20)

.factory('adminRolesService', function($q, $log, domainAPI, attendeeService, ADMIN_SEARCH_LIMIT, ESN_ATTENDEE_DEFAULT_TEMPLATE_URL, _) {
  var domainId;
  var administrators;

  function init(_domainId) {
    domainId = _domainId;
  }

  function reset() {
    domainId = null;
    administrators = null;
  }

  function getAdministrators() {
    if (administrators) {
      return $q.when(administrators);
    }

    return domainAPI.getAdministrators(domainId).then(function(resp) {
      administrators = resp.data;

      return administrators;
    });
  }

  function addAdministrators(_administrators) {
    var administratorIds = _administrators.map(_.property('id'));

    return domainAPI.addAdministrators(domainId, administratorIds)
      .then(function() {
        Array.prototype.push.apply(administrators, _administrators);
      });
  }

  function removeAdministrator(administrator) {
    var administratorId = administrator._id;

    return domainAPI.removeAdministrator(domainId, administratorId)
      .then(function() {
        _.remove(administrators, { _id: administratorId });
      });
  }

  function searchAdministratorCandidates(query, excludes) {
    return attendeeService.getAttendeeCandidates(query, ADMIN_SEARCH_LIMIT, ['user'], excludes)
      .catch(function(error) {
        $log.error('Error while searching for administrator candidates', error);

        return [];
      });
  }

  return {
    init: init,
    reset: reset,
    getAdministrators: getAdministrators,
    addAdministrators: addAdministrators,
    removeAdministrator: removeAdministrator,
    searchAdministratorCandidates: searchAdministratorCandidates
  };
});
