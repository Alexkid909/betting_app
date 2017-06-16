app.controller('PlacedBetsController',[
	'$scope',
	'placedBets',
	function($scope,placedBets) {
		debugger;
		$scope.events = placedBets;
		console.log($scope.events)
}]);