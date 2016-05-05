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
      data = JSON.parse(data);
      return new Doc(
        data.id
      );
    };
  }

}());
