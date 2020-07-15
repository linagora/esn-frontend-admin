(function(angular) {
  'use strict';

  angular.module('linagora.esn.admin')
    .controller('adminTechnicalUsersFormController', adminTechnicalUsersFormController);

  function adminTechnicalUsersFormController(ADMIN_TECHNICAL_USER_TYPES) {
    var self = this;

    self.$onInit = $onInit;
    self.onAddBtnClick = onAddBtnClick;
    self.onRemoveBtnClick = onRemoveBtnClick;

    function $onInit() {
      self.ADMIN_TECHNICAL_USER_TYPES = ADMIN_TECHNICAL_USER_TYPES;
      self.technicalUser = _denormalizeTechnicalUser(self.technicalUser) || {
        name: '',
        type: '',
        description: '',
        data: [
          {
            key: '',
            value: ''
          }
        ]
      };

      self.ADMIN_TECHNICAL_USER_TYPES = ADMIN_TECHNICAL_USER_TYPES;
    }

    function onAddBtnClick() {
      self.technicalUser.data.push({
        key: '',
        value: ''
      });
    }

    function onRemoveBtnClick(index) {
      self.technicalUser.data.splice(index, 1);
    }

    function _denormalizeTechnicalUser(technicalUser) {
      if (!technicalUser) {
        return false;
      }

      technicalUser.data = technicalUser.data || [];

      var demormalizedData = Object.keys(technicalUser.data).map(function(key) {
        return { key: key, value: technicalUser.data[key] };
      });

      technicalUser.data = demormalizedData;

      return technicalUser;
    }
  }
})(angular);
