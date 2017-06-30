app.controller('PlacedBetsController',[
	'$rootScope',
	'$scope',
	'placedBets',
	function($rootScope,$scope,placedBets) {
	$scope.events = placedBets;
	var watchForPlacedBets = new Promise((resolve,reject) => {
		var checkPlacedBets = setInterval(function() {
				if($scope.events) {
					resolve("We win!") 
					clearInterval(checkPlacedBets);
				}; 
			},10);
		var timeout = function() {
			setTimeout(function() {
				if(!$scope.events) {
					reject("Uh oh!");
					clearInterval(checkPlacedBets)
				};
			},1000);
		};
		timeout();
	});

	watchForPlacedBets.then(function(success) {
		$rootScope.deactivateLoader();
	},function(failure) {
		$rootScope.deactivateLoader();
		$rootScope.$apply($rootScope.displayMessage("Oops Sorry, something went wrong.  Try refreshing the page, or if the problem persist please let us know."));
	});

}]);