angular.module('main')
				.controller('workoutListCtrl', function ($scope, $location, workoutSvc){
					$scope.goto = function (workout){
						$location.path('/builder/workouts/' + workout.name);
					}
					var init = function (){
						$scope.workouts = workoutSvc.getWorkouts();
					};
					init();
});

