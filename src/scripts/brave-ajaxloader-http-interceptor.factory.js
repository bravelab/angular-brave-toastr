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
          $rootScope.$broadcast('braveAjaxloader:show');
          return config || $q.when(config);
        },
        response: function (response) {
          if ((--numLoadings) === 0) {
            $rootScope.$broadcast('braveAjaxloader:hide');
          }
          return response || $q.when(response);
        },
        responseError: function (response) {
          if (!(--numLoadings)) {
            $rootScope.$broadcast('braveAjaxloader:hide');
          }
          return $q.reject(response);
        }
      };
    });

})();
