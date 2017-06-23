app.controller('SlipController',['$scope',
	'$http',
	'slip',
	'placedBets',
	'apiResponses',
	'$rootScope',
	function($scope,$http,slip,placedBets,apiResponses,$rootScope) {
		$scope.slip = slip;
		$scope.placedBets = placedBets;
		$scope.responses = apiResponses;
		$scope.slipActive = false;
		$scope.setInactiveSlipTransform = function() {
			const betSlipHeader = document.querySelector('slip.slip-wrapper .slip-header-section');
			const betSlipHeaderHeight = betSlipHeader.getBoundingClientRect().height;
			document.documentElement.style.setProperty("--slipHeaderHeight",betSlipHeaderHeight+"px");				
			const slipHeaderHeight = document.documentElement.style.getPropertyValue("--slipHeaderHeight");
		};
		$scope.toggleShowSlip = function() {
			const betSlip = document.querySelector('slip.slip-wrapper');
			if(betSlip.classList.contains('active')) {


			}
			betSlip.classList.toggle('active');
		}
		$scope.setInactiveSlipTransform();
		$scope.placeBets = function(slip) {
			$rootScope.activateLoader();
			slip.forEach(function(slipLine) {
				let bet = {
					bet_id: slipLine.id,
					odds: slipLine.odds,
					stake: slipLine.stake
				};
				$http.post('https://bedefetechtest.herokuapp.com/v1/bets',bet)
				.then(function(success) {
					$scope.placedBets.push(success.data);
					$rootScope.deactivateLoader();
					$rootScope.displayMessage("Your bets have been placed.  You can view them by clicking My Bets above.");
					$scope.slip.bets = [];
					$scope.bettingSlip.$setPristine()
				},function(error) {
					if(error) {
						$scope.responses.push(error);
						$rootScope.displayMessage("Oops! Sorry, something went wrong and your bets couldn't be placed.  Please try again.");			
					};
				});
			});
		};
	}
]);