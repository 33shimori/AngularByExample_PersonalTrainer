angular.module('main')
				.controller('rootCtrl', function ($scope){
					$scope.$on('$routeChangeSuccess', function (e, current, previous){
					$scope.currentRoute= current;	
					})
})

