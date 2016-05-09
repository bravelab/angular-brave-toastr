(function () {
  'use strict';

  /**
   * @ngdoc overview
   * @name ngBraveAjaxloader
   * @description ngBraveAjaxloader tests
   *
   */
  describe('ngBraveAjaxloader module', function () {

    beforeEach(module('ngBraveAjaxloader'));

    describe('value - version', function () {
      it('should return current version', inject(function (version) {
        expect(version).toEqual('1.0.1');
      }));
    });

  });
})();

