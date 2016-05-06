(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('DocsService', DocsService);

  DocsService.$inject = ['$http', '$q', 'DocTransformer', 'DocListTransformer', 'APP_CONFIG'];

  /**
   *
   * @param {object} $http - Http object
   * @param {object} $q - Query object
   * @param {object} docTransformer - doc transformer object
   * @param {object} docListTransformer - doc list transformer object
   * @param {object} APP_CONFIG - app config object
   * @returns {{get: ngBraveDocs.get, getAll: ngBraveDocs.getAll}} - Service Factory
   * @constructor
   */
  function DocsService($http, $q, docTransformer, docListTransformer, APP_CONFIG) {

    var cache = {};

    /**
     * @name  Docs
     * @desc The Factory to be returned
     */
    var factory = {
      get: get,
      getAll: getAll
    };

    return factory;

    /**
     * @name get
     * @desc Get single doc
     * @param {string} id The id of th doc
     * @returns {Promise} - Promise an object
     * @memberOf ngBraveDocs
     */
    function get(id) {
      var deferred = $q.defer();
      if (typeof cache[id] !== 'undefined') {
        deferred.resolve(cache[id]);
      } else {
        $http({
          method: 'GET',
          url: APP_CONFIG.apiUrl + '/docs/' + id + '/',
          transformResponse: docTransformer
        })
          .then(function (data, status, headers, config) {
            cache[id] = data.data;
            deferred.resolve(cache[id]);
          }, function (data, status, headers, config) {
            deferred.reject(data);
          });
      }
      return deferred.promise;
    }

    /**
     * @name getAll
     * @desc Gets all docs
     * @returns {Promise} - Promise an object
     * @memberOf ngBraveDocs
     */
    function getAll() {
      return $http({
        method: 'GET',
        url: APP_CONFIG.apiUrl + '/docs/',
        transformResponse: docListTransformer
      })
        .then(function (data) {
          return data;
        });
    }
  }
})();
