angular.module('main')
				.controller('exerciseDetailsCtrl', 
function ($scope, workoutSvc, $routeParams, ExerciseBuilderSvc, $location){
	$scope.save = function (){
		$scope.submitted = true; // will force validations
		if ($scope.formExercise.$invalid) return;
		$scope.exercise = ExerciseBuilderSvc.save();
		$scope.formExercise.$setPristine();
		$scope.submitted = false;
	};
	$scope.hasError = function (modelController, error){
		return (modelController.$dirty || $scope.submitted) && error;
	};
	$scope.canDeleteExercise = function (){
		return ExerciseBuildingSvc.canDeleteExercise();
	};
	$scope.addVideo = function (){
		ExerciseBuildingSvc.addVideo();
	};
	$scope.deleteVideo = function (){
		ExerciseBuildingSvc.deleteVideo(index);
	};
	var init = function () {
		// we do not use the resolve property on the route to load exercise as we do it with workout.
			$scope.exercise = exerciseBuilderSvc.startBuilding($routeParams.id);
	};
	init();
});