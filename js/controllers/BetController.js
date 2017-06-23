app.controller('BetController',['$scope',
		'markets',
		'slip',
		'apiResponses',
		'$rootScope',
		function($scope,markets,slip,apiResponses,$rootScope) {			
			$scope.events = {};
			$scope.slip = slip;
			$scope.responses = apiResponses;
			$rootScope.counter = 0;
			$rootScope.activateLoader = function() {
				const loader = document.querySelector('.loader-container');
				loader.classList.add('active');
				$rootScope.activateBackdrop();	
			}
			$rootScope.deactivateBackdrop = function() {
				const backdrop = document.querySelector('div.backdrop');
				backdrop.classList.remove('active');
			}
			$rootScope.deactivateLoader = function() {
				const loader = document.querySelector('.loader-container');
				loader.classList.remove('active');
				$rootScope.deactivateBackdrop();						
			};	
			$rootScope.activateBackdrop = function() {
				const backdrop = document.querySelector('div.backdrop');
				backdrop.classList.add('active');
			}				
			$scope.events = markets.then(function(success) {
				function debug(args) {
					debugger
					return true;
				}
				var findEvent = eventName => {
						for (var key in events) {
							var event = events[key];
							// debug([event,eventName,key]);
							if (event.name == eventName) {
								return key;
								break;
							};
						};
					};
				var createEvent = event => {
					var event = {
						name: event.event,
						bets: [{name: event.name,
								id: event.bet_id,
								odds: event.odds
						}]
					};
					events.push(event);
				};
				var createBet = (eventKey,event) => {
					debugger;
					var bet = {name: event.name,
								id: event.bet_id,
								odds: event.odds
					};
					events[eventKey].bets.push(bet);
				};
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
				$scope.events = events;
				debugger;
			},function(error) {
				if (error) {
					$scope.responses.push(error);
					$scope.displayMessage("Oops! Sorry, something went wrong.  Try refreshing the page, or if the problem persist please let us know.")
					console.log('Error getting bet: ',error);
				};
			}).then(function() {
				$rootScope.deactivateLoader();
			});
			$scope.addBet = function(event,bet,callback) {
				var noDupe = $scope.slip.bets.every(function(slipBet) {
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