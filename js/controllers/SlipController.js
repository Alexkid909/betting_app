app.controller('SlipController',['$scope',
	'$http',
	'slip',
	'bets',
	'apiResponses',
	function($scope,$http,slip,bets,apiResponses) {
		$scope.slip = slip;
		$scope.placedBets = bets;
		$scope.responses = apiResponses;
		$scope.placeBets = function(slip) {
			slip.forEach(function(slipLine) {
				var bet = {
					bet_id: slipLine.id,
					odds: slipLine.odds,
					stake: slipLine.stake
				};
				$http.post('https://bedefetechtest.herokuapp.com/v1/bets',bet)
				.then(function(success) {
					$scope.placedBets.push(success.data);
					console.log('Placed Bets: ',$scope.placedBets);
				}).then(function(error) {
					if(error) {
						$scope.responses.push(error);
						console.log('Error placing bet: ',error);				
					};
				});
			});
		};
	}
]);