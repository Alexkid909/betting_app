app.controller('MainController',[
	'$rootScope',
	'$scope',
	function($rootScope,$scope) {
		$rootScope.decimalOdds = {value:false};
		$rootScope.activateLoader = function() {
			const loader = document.querySelector('.loader-container');
			loader.classList.add('active');
			$rootScope.activateBackdrop();	
		}
		$rootScope.deactivateBackdrop = function() {
			const backdrop = document.querySelector('div.backdrop');
			backdrop.classList.remove('active');
		}
		$rootScope.deactivateLoader = function() {
			$rootScope.deactivateBackdrop();
			const loader = document.querySelector('.loader-container');
			loader.classList.remove('active');
		}	
		$rootScope.activateBackdrop = function() {
			const backdrop = document.querySelector('div.backdrop');
			backdrop.classList.add('active');
		};	
	}
]);