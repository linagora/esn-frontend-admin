angular.module('linagora.esn.admin')
  .controller('adminOidcFormController', adminOidcFormController);

function adminOidcFormController() {
  var self = this;

  self.$onInit = $onInit;

  function $onInit() {
    self.oidcConfig = self.oidcConfig || {};
  }

  self.delete = function(form) {
    self.oidcConfig.deleted = true;
    form.$setDirty();
  };

  self.undo = function() {
    self.oidcConfig.deleted = false;
  };
}
