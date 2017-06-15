app.controller('BetController',['$scope',
		'markets',
		function($scope,markets) {
			$scope.events = [];
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
				console.log(events);
				console.log($scope.events);
			});
			$scope.addBet = function(bet) {

			};
		}
	]);