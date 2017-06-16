app.directive('availableBets',function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/templates/available-bets.html',
		controller: 'BetController'
	}
});