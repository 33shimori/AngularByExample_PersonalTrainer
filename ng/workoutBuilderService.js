angular.module('main')
				.factory("workoutBuilderSvc", function (workoutSvc, workoutPlan, $q){
	var service={},
		buildingWorkout,
		newWorkout;
		
		service.startBuilding = function(name) {
			var defer = $q.defer();
			// we are going to edit existing workout
			if (name){
				workoutSvc.getWorkout(name).then(function (workout){
					buildingWorkout = workout;
				newWorkout = false;
				defer.resolve(buildingWorkout);
			});
		}				
			else {
				buildingWorkout = new workoutPlan({});
					defer.resolve(buildingWorkout);
					newWorkout = true;
			}
			return defer.promise;
		};
		
		service.removeExercise = function(exercise){
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
		service.save = function () {
			var promise = newWorkout?
			workoutSvc.addWorkout(buildingWorkout):
							workoutSvc.updateWorkout(buildingWorkout);
			promise.then(function (workout){
				newWorkout = false;
			});
			return promise;
		};
			service.delete = function (){
			if (newWorkout) return; // A new workout cannot be deleted.
			return workoutSvc.deleteWorkout(buildingWorkout.name);
		}	
		
		return service;
});
