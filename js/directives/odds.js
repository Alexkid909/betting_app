app.directive('odds',function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/templates/odds.html',
		scope: {
			decimalOdds: '=',
			numerator: '=',
			denominator: '='
		},
		link: function(scope,element,attrs) {
			scope.odds = function() {
				if (scope.decimalOdds) {
					let decimalOdds = (scope.numerator / scope.denominator) + 1;
					return parseFloat(Math.round(decimalOdds * 100) / 100).toFixed(2);
				} else {
					return scope.numerator+"/"+scope.denominator;
				};
			}
		}
	}
});