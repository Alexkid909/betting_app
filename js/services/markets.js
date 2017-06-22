app.factory('markets',[
		'$http',
		function($http) {
			var promise = $http.get('https://bedefetechtest.herokuapp.com/v1/markets'
			)
			.then(function(success) {
				var markets = success.data;
				return markets;
			},function(error) {
				var markets = error;
				return markets;			
			});
			return promise;
		}
	]);
