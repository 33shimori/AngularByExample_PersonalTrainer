angular.module('main')
				.controller('exercisesNavCtrl', function ($scope, workoutSvc, workoutBuilderSvc){
					
					$scope.addExercise = function(exercise){
						workoutBuilderSvc.addExercise(exercise);
					};
									
					var init = function () {
							$scope.exercises = workoutSvc.Exercises.query();
					};
					init();
});

angular.module('main')
				.controller('exerciseListCtrl', function ($scope, $location, workoutSvc){
					$scope.goto = function(exercise){
						$location.path('/builder/exercies/' + exercise.name);
					}
					var init = function (){
							$scope.exercises = workoutSvc.Exercises.query();

					};
					init();
});