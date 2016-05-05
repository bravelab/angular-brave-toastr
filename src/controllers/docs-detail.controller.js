(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .controller('DocsDetailController', DocsDetailController);

  DocsDetailController.$inject = ['$scope', '$stateParams', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $stateParams - State
   * @param {Object} docsService - Service
   * @constructor
   */
  function DocsDetailController($scope, $stateParams, docsService) {
    var vm = this;
    vm.doc = null;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf ngBraveDocs.DocsDetailController
     */
    function activate() {
      docsService.get($stateParams.id).then(function (data) {
        vm.doc = data;
      });
    }
  }

})();
