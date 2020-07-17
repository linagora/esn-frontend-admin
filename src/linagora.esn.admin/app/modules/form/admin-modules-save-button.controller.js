'use strict';

angular.module('linagora.esn.admin')

  .controller('adminModulesSaveButtonController', function(rejectWithErrorNotification) {
    var self = this;

    self.checkValidThenSubmit = function() {
      if (self.form && self.form.$valid) {
        return self.onFormSubmit();
      }

      self.form.$setSubmitted();

      return rejectWithErrorNotification('Form is invalid!');
    };
  });
