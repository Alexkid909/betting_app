
var app = angular.module('BetNow',['ngRoute']);

app.config(function($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix('');
	$routeProvider
	.when('/placed-bets',{
		controller: 'PlacedBetsController',
		templateUrl: 'views/placed-bets.html'
	})
	.when('/',{
		templateUrl: 'views/home.html'
	}).otherwise({
		redirectTo: '/'
	});
}); 