(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveToastr]
   * @description Show http errors by angular-toastr
   */
  angular
    .module('ngBraveToastr', [])
    .value('version', '0.0.1')
    .constant('config', {})
    .config(function ($httpProvider) {

      $httpProvider.interceptors.push(['$q', '$injector', function ($q, $injector) {

        function notifyError(rejection) {
          var toastr = $injector.get('toastr');
          toastr.error(rejection.status + ' ' + rejection.statusText, 'Error');
        }

        return {
          requestError: function (rejection) {
            notifyError(rejection);
            return $q.reject(rejection);
          },
          responseError: function (rejection) {
            notifyError(rejection);
            return $q.reject(rejection);
          }
        };

      }]);

    });
})();
