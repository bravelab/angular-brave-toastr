(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .controller('DocsController', DocsController);

  DocsController.$inject = ['$scope', '$state', 'Authentication', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $state - State
   * @param {Object} Authentication - Auth service (@deprecated)
   * @param {Object} docsService - Docs service
     * @constructor
     */
  function DocsController($scope, $state, Authentication, docsService) {

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf ngBraveDocs.DocsController
     */
    function activate() {

      Authentication.getToken().then(tokenSuccessFn);

      /**
       * @name tokenSuccessFn
       * @param {string} token - Auth token
       * @desc Calls docsService.getAll()
       */
      function tokenSuccessFn(token) {
        docsService.getAll().then(docSuccessFn, docErrorFn);
      }

      /**
       * @name docsSuccessFn
       * @param {object} data - Response data
       * @desc Update `docs` on viewmodel
       */
      function docSuccessFn(data) {
        $scope.docs = data.data;
        // $state.transitionTo('ngBraveDocs.list');
      }

      /**
       * @name docErrorFn
       * @desc Redirect to index and show error Snackbar
       */
      function docErrorFn() {
        $state.transitionTo('ngBraveDocs');
      }
    }
  }

})();
