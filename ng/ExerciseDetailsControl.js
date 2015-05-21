angular.module('main')
				.controller('exerciseDetailsCtrl', 
function ($scope, workoutSvc, $routeParams, exerciseBuilderSvc, $location){
	$scope.save = function (){
		$scope.submitted = true; // will force validations
		if ($scope.formExercise.$invalid) return;
		$scope.exercise = exerciseBuilderSvc.save();
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
		ExerciseBuildingSvc.startBuilding($routeParams.id).then(function(exercise){
			$scope.exercise = exercise;
		});
	};
	init();
});