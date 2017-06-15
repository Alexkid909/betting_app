app.controller('SlipController',['$scope',
	'$http',
	'slip',
	function($scope,$http,slip) {
		$scope.slip = slip;
		$scope.placeBets = function(slip) {
			var slipLine = slip[0]
				var bet = {
					bet_id: slipLine.id,
					odds: slipLine.odds,
					stake: slipLine.stake
				};
				console.log(bet);
				debugger;
				$http.post('https://bedefetechtest.herokuapp.com/v1/bets',bet)
				.then(function(success) {
			// slip.forEach(function(slipLine) {
			// 		debugger;
			// 	});
			// });
					debugger;
				});
			};
		}
]);