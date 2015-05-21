angular.module('main')
				.factory('ExerciseBuilderSvc', function (workoutSvc, Exercise, $q){
					var service = {};
	var buildingExercise;
	var newExercise;
	service.startBuilding = function (name){
		//we are going to edit exercise
		if (name){
				buildingExercise = workoutSvc.Exercises.get({id: name}, function(data){
				newExercise  = false;
			});
		}
		else{
			buildingExercise = new Exercise({});
			newExercise = true;
	}
	return buildingExercise;
};
	service.save = function (){
			if(!buildingExercise._id)
				buildingExercise._id = buildingExercise.name;
			var promise = newExercise ? 
				workoutSvc.Exercises.save({}, buildingExercise).$promise
				: buildingExercise.$update({id: buldingExercise.name});
				return promise.then(function(data){
					newExercise = false;
					return buildingExercise;
				});
	};
	service.delete = function (){
			return buildingExercise.$delete({ id: buildingExercise.name });
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


