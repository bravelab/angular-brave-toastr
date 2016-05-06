/**
 * DocListTransformer
 * @namespace ngBraveDocs
 */
(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('DocListTransformer', DocListTransformer);

  DocListTransformer.$inject = ['Doc'];

  function DocListTransformer(Doc) {
    return function (response) {
      var data = response.data;
      var result = (typeof data === 'string') ? JSON.parse(data) : data;
      if (result.length) {
        data = _.map(result, function (item) {
          return new Doc(item);
        });
      }
      return data;
    };
  }

}());
