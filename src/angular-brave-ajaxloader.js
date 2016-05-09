(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveAjaxloader]
   * @description Global ajax preloader
   */
  angular
    .module('ngBraveAjaxloader', [])
    .value('version', '1.0.1')
    .constant('config', {

    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('braveAjaxloaderHttpInterceptor');
    });
})();
