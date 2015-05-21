angular.module('main')
				.factory('ExerciseBuilderSvc', function (workoutSvc, Exercise, $q){
					var service = {};
	var buildingExercise;
	var newExercise;
	service.startBuilding = function (name){
		var defer = $q.defer();
		//we are going to edit exercise
		if (name){
			workoutSvc.getExercise(name).then(function(exercise){
				buildingExercise = exercise;
				newExercise  = true;
				defer.resolve(buildingExercise);
			});
		}
		else{
			buildingExercise = new Exercise({});
			defer.resolve(buildingExercise);
			newExercise = true;
	}
};
	service.save = function (){
		var exercise = newExercise ? workoutSvc.addExercise(buildingExercise) :
						workoutSvc.updateExercise(buildingExercise);
		newExercise = false;
		return exercise;
	};
	service.delete = function (){
			workoutSvc.deleteExercise(buildingExercise.name);
	};
	service.addVideo = function (){
		buildingExercise.related.videos.push("");
	}	;
	service.canDeleteExercise = function (){
		return !newExercise;
	};
	service.deleteVideo = function (index){
		if(index >=0) buildingExercise.related.videos.splice(index,1);
	}
	return service;
				});


