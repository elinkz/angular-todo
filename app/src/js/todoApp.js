'use strict';

/*angular.module('todoApp')
  .controller('MainCtrl', function ($scope) {
    $scope.todos = ['Item 1', 'Item 2', 'Item 3'];
  });*/

// 1.Define a module, do NOT forget the empty array
angular.module('todoApp', [])
	// 2.Define controller
  .controller('index', ['$scope', function($scope) {
  	// 3.Augmenting the scope
  	$scope.todos = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  }]);

// Dependency injection = Giving an object its instance variables. Really. That's it.
