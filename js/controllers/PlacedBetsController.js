app.controller('PlacedBetsController',[
	'$scope',
	'placedBets',
	function($scope,placedBets) {
		$scope.events = placedBets;
}]);