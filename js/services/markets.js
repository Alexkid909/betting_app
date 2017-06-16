app.factory('markets',[
		'$http',
		function($http) {
			var promise = $http.get('https://bedefetechtest.herokuapp.com/v1/markets'
			)
			.then(function(success) {
				debugger;
				var markets = success.data;
				return markets;
			})
			.then(function(error) {
				debugger;
				var markets = error;
				return markets;			
			});
			return promise;
		}
	]);
