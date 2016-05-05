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
    return function (data) {
      data = JSON.parse(data);
      // if (data.data !== undefined && data.data.length) {
      //   data = _.map(data.data, function (item) {
      //     return new Doc(
      //       item.id
      //     );
      //   });
      // }
      return data;
    };
  }

}());
