app.controller('MainController',[
	'$rootScope',
	function($rootScope) {
		$rootScope.decimalOdds = {value:false};
		$rootScope.switchOddsType = function() {
			var decimalOdds = $scope.decimalOdds.value;
			$scope.decimalOdds.value = !decimalOdds;
		}		
	}
]);