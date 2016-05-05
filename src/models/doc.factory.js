/**
 * Doc
 * @namespace ngBraveDocs
 */
(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('Doc', Doc);

  Doc.$inject = ['$log'];

  function Doc() {
    var factory = function (id) {
      this.id = id;
    };
    return factory;
  }
}());
