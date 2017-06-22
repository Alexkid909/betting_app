app.directive('slip',function() {
	return {
		restrict: 'E',
		templateUrl: 'js/directives/templates/slip.html',
		controller: 'SlipController',
		controllerAs: 'slipCtrl'
	}
});