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
            $state;


        beforeEach(function () {
            module('ngBraveDocs');
            module('ngBraveDocs.mocks'); // (1)
            module('app.auth.mocks'); // (1)
        });

        beforeEach(inject(function ($injector) {
            $state = $injector.get('$state');
            $rootScope = $injector.get('$rootScope');
            $httpBackend = $injector.get('$httpBackend');
            $controller = $injector.get('$controller');

            $scope = $rootScope.$new();
        }));

        beforeEach(inject(function (_AuthenticationMock_, _DocsMock_) {

            AuthenticationMock = _AuthenticationMock_;
            DocsMock = _DocsMock_; // (2)

            controller = $controller('DocsController', {
                $scope: $scope,
                $state: $state,
                Authentication: _AuthenticationMock_,
                Docs: _DocsMock_
            });

        }));

        it('should have defined controller', inject(function () {
            expect(controller).toBeDefined();
        }));

        it('should have product in scope', inject(function () {
            $scope.$apply();
            expect($scope.pages).toEqual(DocsMock.mockedData.data);
        }));

    });

})();
