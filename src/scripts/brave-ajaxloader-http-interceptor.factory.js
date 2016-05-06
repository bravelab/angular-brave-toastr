(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAjaxloader]
   * @description braveAjaxloaderHttpInterceptor directive
   */
  angular
    .module('ngBraveAjaxloader')
    .factory('braveAjaxloaderHttpInterceptor', function ($q, $rootScope) {
      var numLoadings = 0;
      return {
        request: function (config) {
          numLoadings++;
          $rootScope.$broadcast('loader__show');
          return config || $q.when(config);
        },
        response: function (response) {
          if ((--numLoadings) === 0) {
            $rootScope.$broadcast('loader__hide');
          }
          return response || $q.when(response);
        },
        responseError: function (response) {
          if (!(--numLoadings)) {
            $rootScope.$broadcast('loader__hide');
          }
          return $q.reject(response);
        }
      };
    });

})();
