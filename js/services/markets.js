app.factory('markets',[
		'$http',
		function($http) {
			var markets = {};
			$http.get('https://bedefetechtest.herokuapp.com/v1/markets'
			)
			.then(function(success) {
				markets.data = success.data
			})
			.then(function(error) {
				markets.err = error;			
			});
			return markets;
		}
	]);
