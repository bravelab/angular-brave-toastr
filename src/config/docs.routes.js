(function () {
  'use strict';


  /**
   * @ngdoc routes
   * @name app [ngBraveDocs]
   * @description Routes configuration ngBraveDocs
   */
  angular
    .module('ngBraveDocs')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  /*
   * @name routes
   * @desc Define valid application routes.
   */
  function routes($stateProvider) {
    $stateProvider.state('ngBraveDocs', {
      url: '/docs',
      views: {
        'content@app': {
          templateUrl: 'templates/docs.html',
          controller: 'DocsController',
          controllerAs: 'vm'
        }
      }
    });

    $stateProvider.state('ngBraveDocs.list', {
      parent: 'ngBraveDocs',
      url: '/all',
      templateUrl: 'templates/docs-list.html',
      controller: 'DocsListController',
      controllerAs: 'vm'
    });

    $stateProvider.state('ngBraveDocs.detail', {
      parent: 'ngBraveDocs',
      url: '/:id/:slug',
      templateUrl: 'templates/docs-detail.html',
      controller: 'DocsDetailController',
      controllerAs: 'vm'
    });
  }

})();
