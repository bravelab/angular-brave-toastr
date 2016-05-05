(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .controller('DocsListController', DocsListController);

  DocsListController.$inject = ['$scope'];

  /**
   *
   * @param {Object} $scope - Scope
   * @constructor
     */
  function DocsListController($scope) {
    var vm = this;

    vm.docs = $scope.docs;

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf ngBraveDocs.DocsListController
     */
    function activate() {
      $scope.$watch('docs', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          vm.docs = newValue;
        }
      });
    }
  }

})();
