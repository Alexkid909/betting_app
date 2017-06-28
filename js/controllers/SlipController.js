app.controller('SlipController',['$scope',
	'$http',
	'slip',
	'placedBets',
	'apiResponses',
	'$rootScope',
	function($scope,$http,slip,placedBets,apiResponses,$rootScope) {
		console.log("Slip Controller");
		debugger;
		$scope.slip = slip;
		$scope.placedBets = placedBets;
		$scope.responses = apiResponses;
		$scope.slipActive = false;
		$scope.toggleShowSlip = function() {
			const betSlip = document.querySelector('slip.slip-wrapper');
			betSlip.classList.toggle('active');
		}
		$scope.addResizeEventListener = function() {
			window.addEventListener('resize',$rootScope.setInactiveSlipTransform);
		};
		$rootScope.setInactiveSlipTransform = function() {
				var betSlipHeader = document.querySelector('slip.slip-wrapper .slip-header-section');
				var betSlipHeaderHeight = betSlipHeader.getBoundingClientRect().height;
				document.documentElement.style.setProperty("--slipHeaderHeight",betSlipHeaderHeight+"px");
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