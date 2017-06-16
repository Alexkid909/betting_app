
var app = angular.module('BetNow',['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when('/placed_bets',{
		templateUrl: 'views/placed_bets.html'
	})
	.when('/',{
		constroller: 'BetController',
		templateUrl: 'views/home.html'
	}).otherwise({
		redirectTo: '/'
	});
}); 