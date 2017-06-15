app.controller('MainController',[
		'$scope',
		'markets',
		function($scope,markets) {
			var confirmApiResponse = function() {
				var counter = 0;
				var apiResponseCheck = setInterval(function() {
					counter++;
					console.log(counter);
					if (counter > 100) {
						console.log("Timed out with no response")
						clearInterval(apiResponseCheck);
					} else if(markets.data) {
						console.log(markets.data);
						clearInterval(apiResponseCheck);						
					} else if (markets.err) {
						console.log(markets.err);
						clearInterval(apiResponseCheck);
					} else {
						console.log("No response yet");
					}
				},10);
			};
			confirmApiResponse();

			$scope.bets = markets.data;



		}
	]);