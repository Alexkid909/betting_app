
app.factory('placedBets',['$http',function($http) {
	var placedBets = [
		{
			bet_id: 1,
			event: "Next World Cup",
			name: "England",
			stake: 10,
			transaction_id: 0001,
			odds: 
				{
					denominator: 1,
					numerator: 10	
				}
		},
		{
			bet_id: 2,
			event: "Next World Cup",
			name: "Brazil",
			stake: 10,
			transaction_id: 0002,
			odds: 
				{
					denominator: 1,
					numerator: 2	
				}
		},
		{
			bet_id: 3,
			event: "Next World Cup",
			name: "Spain",
			stake: 10,
			transaction_id: 0003,
			odds: 
				{
					denominator: 1,
					numerator: 3	
				}
		}
	];	
	return placedBets;
}]);