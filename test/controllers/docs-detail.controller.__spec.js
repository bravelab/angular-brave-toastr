(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name ngBraveDocs tests
     * @description Docs tests
     *
     */
    describe('should provide ngBraveDocs module', function () {

        var AuthenticationMock,
            DocsMock,
            controller;

        var $httpBackend,
            $controller,
            $rootScope,
            $scope,
            $stateParams,
            $state;


        beforeEach(function () {
            module('ngBraveDocs');
            module('ngBraveDocs.mocks'); // (1)
            module('app.auth.mocks'); // (1)
        });

        beforeEach(inject(function ($injector) {
            $state = $injector.get('$state');
            $stateParams = $injector.get('$stateParams');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
        }));

        beforeEach(inject(function (_AuthenticationMock_, _DocsMock_) {

            AuthenticationMock = _AuthenticationMock_;
            DocsMock = _DocsMock_; // (2)

            controller = $controller('DocsDetailController', {
                $scope: $scope,
                $stateParams: $stateParams,
                Docs: _DocsMock_
            });

        }));

        it('should have defined controller', inject(function () {
            expect(controller).toBeDefined();
        }));

        it('should have school in scope', inject(function () {
            $scope.$apply();
            expect(controller.doc).toEqual(DocsMock.mockedDetail);
        }));

    });

})();
