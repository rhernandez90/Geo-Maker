'use strict';

describe('Controller: Controller1Ctrl', function () {

  // load the controller's module
  beforeEach(module('angularApp'));

  var Controller1Ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    Controller1Ctrl = $controller('Controller1Ctrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(Controller1Ctrl.awesomeThings.length).toBe(3);
  });
});
