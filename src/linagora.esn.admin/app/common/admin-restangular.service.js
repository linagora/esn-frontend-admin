'use strict';

angular.module('linagora.esn.admin')
  .factory('adminRestangular', function(Restangular, httpErrorHandler, httpConfigurer) {
    const BASE_API_PATH = '/admin/api';

    const adminRestangularServiceInstance = Restangular.withConfig(function(RestangularConfigurer) {
      RestangularConfigurer.setFullResponse(true);
      RestangularConfigurer.setBaseUrl(BASE_API_PATH);
      RestangularConfigurer.setErrorInterceptor(function(response) {
        if (response.status === 401) {
          httpErrorHandler.redirectToLogin();
        }

        return true;
      });
    });

    httpConfigurer.manageRestangular(adminRestangularServiceInstance, BASE_API_PATH);

    return adminRestangularServiceInstance;
  });
