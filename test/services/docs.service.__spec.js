(function () {
    'use strict';

    /**
     * @ngdoc overview
     * @name ngBraveDocs tests
     * @description Docs tests
     *
     */
    describe('should provide ngBraveDocs module', function () {

        var DocsMock;

        beforeEach(function () {
            module('ngBraveDocs');
            module('ngBraveDocs.mocks'); // (1)
            module('app.auth.mocks'); // (1)
        });

        beforeEach(inject(function (_DocsMock_) {
            DocsMock = _DocsMock_; // (2)
        }));

        it('should have getAll function', function () {
            expect(angular.isFunction(DocsMock.getAll)).toBe(true);
        });

        it('should have get function', function () {
            expect(angular.isFunction(DocsMock.get)).toBe(true);
        });

        it('should have data key in the result', function () {
            expect(DocsMock.mockedData.data).toBeDefined();
        });

    });

})();
