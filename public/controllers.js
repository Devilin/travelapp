// public/controllers.js
var scotchTodo = angular.module('scotchTodo', []);

function mainController($scope, $http) {
	$scope.placeData = {};

	// when landing on the page, get all places and show them
	$http.get('/api/places')
		.success(function(data) {
			$scope.places = data;
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	$scope.createTodo = function() {
		$http.post('/api/places', $scope.placeData)
			.success(function(data) {
				$scope.places = data;ac
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

	// delete a place after checking it
	$scope.deleteTodo = function(id) {
		$http.delete('/api/places/' + id)
			.success(function(data) {
				$scope.places = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}
