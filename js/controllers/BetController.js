app.controller('BetController',['$scope',
		'markets',
		'slip',
		'apiResponses',
		'$rootScope',
		'extraDemoData',
		function($scope,markets,slip,apiResponses,$rootScope,extraDemoData) {			
			$scope.decimalOdds = $rootScope.decimalOdds;
			$scope.events = [];
			$scope.slip = slip;
			$scope.responses = apiResponses;
			$rootScope.counter = 0;	
			markets.then(function(success) {
				const findEvent = eventName => {
						for (var key in events) {
							var event = events[key];
							if (event.name == eventName) {
								return key;
								break;
							};
						};
					};
				const createEvent = event => {
					var event = {
						name: event.event,
						bets: [{name: event.name,
								id: event.bet_id,
								odds: event.odds
						}]
					};
					events.push(event);
				};
				const createBet = (eventKey,event) => {
					const bet = {name: event.name,
								id: event.bet_id,
								odds: event.odds
					};
					events[eventKey].bets.push(bet);
				};
				var events = [];
				var demoData = extraDemoData;
				const aggregateAndPushMarketsData = (dataArray) => {
					dataArray.forEach(arrayItem => {
						for (var key in arrayItem) {
							var event = arrayItem[key]
							var eventKey = findEvent(event.event)
							if(!eventKey) {
								createEvent(event);
							} else {
								createBet(eventKey,event);
							};
						};
					});
				};
				aggregateAndPushMarketsData([success/*,demoData*/]);
				$scope.events = events;
			},function(error) {
				if (error) {
					$scope.responses.push(error);
					$scope.displayMessage("Oops! Sorry, something went wrong.  Try refreshing the page, or if the problem persist please let us know.")
				};
			}).then(function() {
				$rootScope.deactivateLoader();
			});
			$scope.addBet = function(event,bet,callback) {
				const noDupe = $scope.slip.bets.every(function(slipBet) {
					return slipBet.id != bet.id;
				});
				if(noDupe) {
					bet.event = event;
					bet.stake = null;
					bet.return = (bet.stake / bet.odds.denominator * bet.odds.numerator) + bet.stake;
					$scope.slip.bets.push(bet);
				} else {
					$rootScope.displayMessage("Only one of each available bet can be added to your betting slip");
				};
			};
		}
	]);