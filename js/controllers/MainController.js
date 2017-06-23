app.controller('MainController',[
	'$rootScope',
	'$scope',
	function($rootScope,$scope) {
		$rootScope.decimalOdds = {value:false};
		$rootScope.switchOddsType = function() {
			var decimalOdds = $scope.decimalOdds.value;
			$scope.decimalOdds.value = !decimalOdds;
		};
		$rootScope.activateLoader = function() {
			const loader = document.querySelector('.loader-container');
			loader.classList.add('active');
			$rootScope.activateBackdrop();	
		}
		$rootScope.deactivateBackdrop = function() {
			setTimeout(() => {
				const backdrop = document.querySelector('div.backdrop');
				backdrop.classList.remove('active');
			},100);
		}
		$rootScope.deactivateLoader = function() {
			$rootScope.deactivateBackdrop();
			setTimeout(() => {
				const loader = document.querySelector('.loader-container');
				loader.classList.remove('active');
			},100)
		}	
		$rootScope.activateBackdrop = function() {
			const backdrop = document.querySelector('div.backdrop');
			backdrop.classList.add('active');
		};		
	}
]);