app.controller('ErrorController',[
	'$rootScope',
	'$scope',
	function($rootScope,$scope) {
		$scope.errorMessage = "Error here";
		$scope.errorContainer = document.querySelector('error .error-dialog');
		$rootScope.displayError = function(message) {
			$scope.errorContainer.removeEventListener('transitionend',$scope.deactivateBackdrop);
			$scope.errorMessage = message;
			$rootScope.activateBackdrop();
			$scope.errorContainer.classList.add('active');
		}
		$rootScope.dismissError = function() {	
			$scope.errorContainer.classList.remove('active');
			$scope.errorContainer.addEventListener('transitionend',$scope.deactivateBackdrop);
		};
	}
]);