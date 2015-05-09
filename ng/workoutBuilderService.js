angular.module('main')
				.factory("workoutBuilderSvc", function (workoutSvc, workoutPlan, Exercise){
	var service={},
		buildingWorkout,
		newWorkout;
		
		service.startBuilding = function(name) {
			// we are going to edit existing workout
			if (name){
				buildingWorkout = workoutSvc.getWorkout(name);
				newWorkout = false;
			}
			else {
				buildingWorkout = new workoutPlan({});
				newWorkout = true;
			}
		return buildingWorkout;
		};
		
		service.removeExcercise = function(exercise){
			buildingWorkout.exercises.splice(buildingWorkout.exercises.indexOf(exercise), 1);
		};
		
		service.addExercise = function(exercise){
			buildingWorkout.exercises.push({ details: exercise, duration:30});
		};
		service.moveExerciseTo = function (exercise, toIndex){
			if (toIndex < 0 || toIndex >= buildingWorkout.exercises) return;
			var currentIndex = buildingWorkout.exercises.indexOf(exercise);
			buildingWorkout.exercises.splice(toIndex, 0, buildingWorkout.exercises.splice(currentIndex, 1)[0]);
		};
		return service;
});
