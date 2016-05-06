(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name app [ngBraveDocs]
   * @description Docs module for SmartAdmin
   */
  angular
    .module('ngBraveDocs', ['ui.router'])
    .value('version', '0.0.3')
    .constant('APP_CONFIG', {
      apiUrl: '/api'
    });

})();

(function () {
  'use strict';


  /**
   * @ngdoc routes
   * @name app [ngBraveDocs]
   * @description Routes configuration ngBraveDocs
   */
  angular
    .module('ngBraveDocs')
    .config(routes);

  routes.$inject = ['$stateProvider'];

  /*
   * @name routes
   * @desc Define valid application routes.
   */
  function routes($stateProvider) {
    $stateProvider.state('ngBraveDocs', {
      url: '/docs',
      views: {
        'content@app': {
          templateUrl: 'templates/docs.html',
          controller: 'DocsController',
          controllerAs: 'vm'
        }
      }
    });

    $stateProvider.state('ngBraveDocs.list', {
      parent: 'ngBraveDocs',
      url: '/all',
      templateUrl: 'templates/docs-list.html',
      controller: 'DocsListController',
      controllerAs: 'vm'
    });

    $stateProvider.state('ngBraveDocs.detail', {
      parent: 'ngBraveDocs',
      url: '/:id/:slug',
      templateUrl: 'templates/docs-detail.html',
      controller: 'DocsDetailController',
      controllerAs: 'vm'
    });
  }

})();

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
      docsService.get($stateParams.id).then(function (doc) {
        vm.doc = doc;
      });
    }
  }

})();

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

(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .controller('DocsController', DocsController);

  DocsController.$inject = ['$scope', '$state', 'DocsService'];

  /**
   *
   * @param {Object} $scope - Scope
   * @param {Object} $state - State
   * @param {Object} docsService - Docs service
     * @constructor
     */
  function DocsController($scope, $state, docsService) {

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf ngBraveDocs.DocsController
     */
    function activate() {

      // Authentication.getToken().then(tokenSuccessFn);

      /**
       * @name tokenSuccessFn
       * @param {string} token - Auth token
       * @desc Calls docsService.getAll()
       */
      // function tokenSuccessFn(token) {
      docsService.getAll().then(docSuccessFn, docErrorFn);
      // }

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

/**
 * Doc
 * @namespace ngBraveDocs
 */
(function () {
  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('Doc', Doc);

  Doc.$inject = [];

  function Doc() {

    var factory = function (data) {
      this.id = data.id;
      this.title = data.title;
      this.slug = data.slug;
      this.content = data.content;
    };

    return factory;
  }

}());

(function () {

  'use strict';

  angular
    .module('ngBraveDocs')
    .factory('DocsServiceMock', ['$q', 'Doc', function ($q, Doc) {

      var mock = {
        id: '89f7191e-d455-42c6-80cd-58ed48bd54b3',
        title: 'Collections',
        slug: 'collections',
        content: '-some content-'
      };

      var factory = {
        detail: new Doc(mock),
        list: {
          data: [
            new Doc(mock)
          ],
          meta: {
            totalAmount: 1
          }
        }
      };

      return factory;

    }]);

})();

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
