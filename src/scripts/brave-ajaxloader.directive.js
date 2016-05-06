(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAjaxloader]
   * @description braveAjaxloader directive
   */
  angular
    .module('ngBraveAjaxloader')
    .directive('braveAjaxloader', function () {
      return function ($scope, element) {
        $scope.$on('loader__show', function () {
          return element.show();
        });
        return $scope.$on('loader__hide', function () {
          return element.hide();
        });
      };
    });

})();
