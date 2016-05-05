(function () {

  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('DocsServiceMock',

    // TODO: Use transformers/doc factory
    ['$q',
      function ($q) {
        var factory = {};

        factory.mockedData = {
          data: [
            {
              id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
              title: 'Collections',
              slug: 'collections',
              content: '-some content-'
            }
          ],
          meta: {
            totalAmount: 1
          }
        };

        factory.mockedDetail = {
          id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
          title: 'Collections',
          slug: 'collections',
          content: '-some content-'
        };

        factory.get = function (id) {
          var defer = $q.defer();
          defer.resolve(this.mockedDetail);
          return defer.promise;
        };

        factory.getAll = function () {
          var defer = $q.defer();
          defer.resolve(this.mockedData);
          return defer.promise;
        };

        return factory;
      }
    ]);

})();
