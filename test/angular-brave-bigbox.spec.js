(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ngBraveToastr
   * @description ngBraveToastr tests
   *
   */
  describe('ngBraveToastr module', function () {

    beforeEach(module('ngBraveToastr'));

    describe('value - version', function () {
      it('should return current version', inject(function (version) {
        expect(version).toEqual('0.0.1');
      }));
    });

  });
})();

