(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAjaxloader]
   * @description Global ajax preloader
   */
  angular
    .module('ngBraveAjaxloader', [])
    .value('version', '0.0.1')
    .constant('config', {

    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('braveAjaxloaderHttpInterceptor');
    });
})();

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

(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAjaxloader]
   * @description braveAjaxloader directive
   */
  angular
    .module('ngBraveAjaxloader')
    .directive('braveAjaxloader', function ($rootScope) {
      return function ($scope, element, attrs) {
        $scope.$on('loader__show', function () {
          return element.show();
        });
        return $scope.$on('loader__hide', function () {
          return element.hide();
        });
      };
    });

})();
