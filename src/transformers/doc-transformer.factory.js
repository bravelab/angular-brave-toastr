/**
 * DocTransformer
 * @namespace ngBraveDocs
 */
(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('DocTransformer', DocTransformer);

  DocTransformer.$inject = ['Doc'];

  function DocTransformer(Doc) {
    return function (data) {
      var object = (typeof data === 'string') ? JSON.parse(data) : data;
      return new Doc(object);
    };
  }

}());
