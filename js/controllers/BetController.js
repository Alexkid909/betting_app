app.controller('BetController',['$scope',
		'markets',
		'slip',
		'apiResponses',
		'$rootScope',
		function($scope,markets,slip,apiResponses,$rootScope) {
			$scope.events = [];
			$scope.slip = slip;
			$scope.responses = apiResponses;
			$rootScope.counter = 0;
			$rootScope.deactivateLoader = function() {
				const loaderBackdrop = document.querySelector('div.loader-backdrop');
				loaderBackdrop.classList.remove('active');
			};			
			$scope.events = markets.then(function(success) {
				var events = [];
				for (var key in success) {
					var event = success[key]
					var eventKey = findEvent(event.event)
					if(!eventKey) {
						createEvent(event);
					} else {
						createBet(eventKey,event);
					}
				};
				function findEvent(eventName) {
					for (var key in events) {
						var event = events[key];
						if (event.name == eventName) {
							return key;
							break;
						};
					};
				};
				function createEvent(event) {
					var event = {
						name: event.event,
						bets: [{name: event.name,
								id: event.bet_id,
								odds: event.odds
						}]
					};
					events.push(event);
				};
				function createBet(eventKey,event) {
					var bet = {name: event.name,
								id: event.bet_id,
								odds: event.odds
					};
					events[eventKey].bets.push(bet);
				};
				$scope.events = events;
			}).then(function(error) {
				if (error) {
					$scope.responses.push(error);
					console.log('Error placing bet: ',error);
				};
			}).then(function() {
				$rootScope.deactivateLoader();
			});
			$scope.addBet = function(event,bet,callback) {
				bet.event = event;
				bet.stake = null;
				bet.return = (bet.stake / bet.odds.denominator * bet.odds.numerator) + bet.stake;
				$scope.slip.push(bet);
			};
		}
	]);