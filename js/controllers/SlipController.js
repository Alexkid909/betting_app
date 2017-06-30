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
		const betSlip = document.querySelector('slip.slip-wrapper');	
		$scope.toggleShowSlip = function() {
			betSlip.classList.toggle('active');
		}
		$scope.addResizeEventListener = function() {
			window.addEventListener('resize',$rootScope.setInactiveSlipTransform);			
		};
		$rootScope.setInactiveSlipTransform = function() {
			if (betSlip) {
				betSlip.classList.remove('transition');
				var betSlipHeaderHeight = betSlip.querySelector('.slip-header-section').getBoundingClientRect().height;
				document.documentElement.style.setProperty("--slipHeaderHeight",betSlipHeaderHeight+"px");
				betSlip.classList.add('transition');
			}
		};			
		$rootScope.setInactiveSlipTransform();
		$scope.addResizeEventListener();		
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