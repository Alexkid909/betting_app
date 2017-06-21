app.controller('SlipController',['$scope',
	'$http',
	'slip',
	'placedBets',
	'apiResponses',
	function($scope,$http,slip,placedBets,apiResponses) {
		$scope.slip = slip;
		$scope.placedBets = placedBets;
		$scope.responses = apiResponses;
		$scope.slipActive = false;
		$scope.setInactiveSlipTransform = function() {
			const betSlipHeader = document.querySelector('slip.slip-wrapper .slip-header-section');
			var betSlipHeaderHeight = betSlipHeader.getBoundingClientRect().height;
			document.documentElement.style.setProperty("--slipHeaderHeight",betSlipHeaderHeight+"px");				
			var slipHeaderHeight = document.documentElement.style.getPropertyValue("--slipHeaderHeight");
		};
		$scope.toggleShowSlip = function() {
			const betSlip = document.querySelector('slip.slip-wrapper');
			if(betSlip.classList.contains('active')) {


			}
			betSlip.classList.toggle('active');
		}
		$scope.setInactiveSlipTransform();
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
			debugger;
			});
		};
	}
]);