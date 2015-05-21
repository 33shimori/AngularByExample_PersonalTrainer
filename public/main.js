'use strict'
angular.module('main', ['ngRoute', 'ngMessages', 'ngResource']);



angular.module('main')
				.value("appEvents", {
				workout: { exerciseStarted: "event:workout:exerciseStarted"}
});

angular.module('main').provider("workoutSvc", function (){
					var apiUrl = "https://api.mongolab.com/api/1/databases/";
					var collectionsUrl = null;
					var database = null;
					var apiKey = null;
						
					this.configure = function (dbName, key) {
						database = database;
						collectionsUrl = apiUrl + dbName + "/collections";
					}
					this.$get = function (workoutPlan, Exercise, $http, $q, $resource){
						var service = {};
						var workouts = [];
						var exercises = [];
						
						service.Exercises = $resource(collectionsUrl + "/exercises/:id", {}, { update: { method: 'PUT'}});
						
						service.getWorkouts = function () {
							return $http.get(collectionsUrl + "/workouts", {})
											.then(function (response){
												return response.data.map(function (workout){
													return new workoutPlan(workout);
												});
							});
						};
						service.getWorkout = function (name) {
							return $q.all([service.Exercises.query().$promise, $http.get(collectionsUrl + "/workouts/" + name, 
								{})]).then(function(response){
									var allExercises = response[0];
									var workout = new workoutPlan(response[1].data);
									angular.forEach(response[1].data.exercises, function (exercise){
										exercise.details = allExercises.filter(function(e){
											return e.name === exercise.name;})[0];
										});
										return workout;
									}, function (e){ return $q.reject(e);});
						};
						service.updateWorkout = function (workout){
							return service.getWorkout(workout.name)
											.then(function(original){
												if(original){
													var workoutToSave=angular.copy(workout);
									workoutToSave.exercises = workoutToSave.exercises.map(
										function(exercise){return { 
												name: exercise.details.name, 
												duration: exercise.duration}});
										return $http.put(collectionsUrl + "/workouts/" + original.name, workoutToSave, {});
									}
								})
								.then(function(response){ return workout;});
						};
						service.addWorkout = function (workout){
							if (workout.name){
								var workoutToSave = angular.copy(workout);
								workoutToSave.exercises = 
												workoutToSave.exercises.map(function (exercise){
													return{
														name: exercise.details.name,
														duration: exercise.duration
													}
								});
								workoutToSave._id = workoutToSave.name;
								return $http.post(collectionsUrl + "/workouts", workoutToSave,
								{})
												.then(function (response){return workout});
							}
						};
						service.deleteWorkout = function (workoutName){
								return $http.delete(collectionsUrl + "/workouts/" + workoutName, {});
						};
						
						return service;
					};
});
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
angular.module('main')
				.provider('apikeyAppender', function ()
{
	var apiKey = null;
	this.setApiKey = function (key){
		apiKey = key;
	}
	this.$get = function ($q){
		return{
			'request' : function (config){
				if (apiKey && config && config.url.toLowerCase().indexOf("https://api.mongolab.com") >=0){
					config.params = config.params || {};
					config.params.apiKey = apiKey;
				}
				return config || $q.when(config);
			}
		};
	};
})

angular.module('main')
				.directive('ngConfirm', function () {
					return {
						restrict: 'A', 
		link: function (scope, element, attrs){
			element.bind('click', function () {
				var message = attrs.ngConfirmMessage || 'Are you sure?';
				if(message && confirm(message)){
					scope.$apply(attrs.ngConfirm);
				}
			});
		}
					};
});


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
angular.module('main')
				.filter('secondsToTime', function(){
					return function (input){
						var sec = parseInt(input,10);
						if (isNaN(sec)) return "00:00:00";
						
						var hours = Math.floor(sec/3600);
						var minutes = Math.floor((sec - (hours* 3600))/60);
						var seconds = sec - (hours * 3600) - (minutes * 60);
						
						return("0"+ hours).substr(-2) + ':'
						+ ("0" + minutes).substr(-2) + ':'
						+ ("0" + seconds).substr(-2);
					};
});



angular.module('main')
				.factory ('Exercise', function (){
					function Exercise(args){
						this.name = args.name;
						this.title = args.title;
						this.description = args.description;
						this.image = args.image;
						this.related = {};
						this.related.videos = (args.related && args.related.videos) ? args.related.videos: [];
						this.nameSound = args.nameSound;
						this.procedure = args.procedure;
					}
					return Exercise;
})

angular.module('main')
				.factory('workoutPlan', function (){
					function WorkoutPlan(args){
						this.exercises = args.exercises || [];
						this.name = args.name
						this.title = args.title;
						this.description = args.description;
						this.restBetweenExercise = args.restBetweenExercise;
					};
					WorkoutPlan.prototype.totalWorkoutDuration = function (){
						if (this.exercises.length == 0) return 0;
						var total = 0;
						angular.forEach(this.exercises, function (exercise){
							total = total + (exercise.duration ? exercise.duration : 0);
						});
						return (this.restBetweenExercise ? this.restBetweenExercise : 0) *
										(this.exercises.length -1) + total;
					}
					return WorkoutPlan
})


angular.module('main')
				.controller('rootCtrl', function ($scope){
					$scope.$on('$routeChangeSuccess', function (e, current, previous){
						$scope.currentRoute= current;	
						$scope.routeHasError = false;
					})
					$scope.$on('$routeChangeError', function (event, current, previous, error)
					{
						if(error.status === 404 && current.originalPath === "/builder/workouts/:id"){
							$scope.routeHasError = true;
							$scope.routeError = current.routeErrorMessage;
						};
					});
				
});


angular.module('main')
				.config(function ($routeProvider, workoutSvcProvider, apikeyAppenderProvider, $httpProvider){
	
	apikeyAppenderProvider.setApiKey("cVpLXjl-qYJ4Dfk2nD-ml-1yxU_S41I7");
	$httpProvider.interceptors.push('apikeyAppender');
	
	//IMPORTANT: set the database name and API Key here before running application
	workoutSvcProvider.configure("angularbyexample");
	
	
	$routeProvider
					.when('/builder', {
						redirectTo: '/builder/workouts'})
	
					.when('/builder/workouts', {
						templateUrl:'workouts.jade', 
						controller: 'workoutListCtrl',
						leftNav: 'left-nav-main.jade',
						topNav: 'top-nav.jade'
					})
					.when('/builder/exercises', {
						templateUrl:'exercises.jade', 
						controller: 'exerciseListCtrl',
						leftNav: 'left-nav-main.jade',
						topNav: 'top-nav.jade'
					})					
					
					.when('/builder/workouts/new' , {
						templateUrl: 'workout.jade',
						controller: 'workoutDetailCtrl',
						leftNav: 'left-nav-exercises.jade',
						topNav: 'top-nav.jade',
						resolve:{ 
							selectedWorkout: 
								function(workoutBuilderSvc){
									return workoutBuilderSvc.startBuilding();
							}}
					})
					.when('/builder/workouts/:id', {
						templateUrl: 'workout.jade',
						controller: 'workoutDetailCtrl',
						leftNav: 'left-nav-exercises.jade',
						topNav: 'top-nav.jade',
						routeErrorMessage: 'could not load the specific workout!',
						resolve:{
							selectedWorkout:
								function ($route, workoutBuilderSvc, $location, $q){
									return workoutBuilderSvc.startBuilding($route.current.params.id)
									.then(function (data){ return data;
									}, function(e){ return $q.reject(e);})
								}
							}
					})
					.when('/builder/exercises/new', {
						templateUrl: 'exercise.jade'
					})
					.when('/builder/exercises/:id',{
						templateUrl: 'exercise.jade'
					})
					.otherwise({
							redirectTo: '/builder/workouts'
		});

});


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
			}, function (e){ defer.resolve( $q.reject(e))});
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

angular.module('main').
				controller('workoutDetailCtrl', 
function ($scope, workoutBuilderSvc, selectedWorkout, $routeParams){
	
	$scope.selected = {};
	
	$scope.reset = function (){
		$scope.workout = 
						workoutBuilderSvc.startBuilding($routeParams.id);
		$scope.formWorkout.$setPristine();
		$scope.submitted = false;
	}
	
	$scope.hasError = function (modelController, error){
		return (modelController.$dirty || $scope.submitted) && error;
	}
	
	$scope.save = function () {
		$scope.submitted = true; // will force validations
		if ($scope.formWorkout.$invalid) return;
		workoutBuilderSvc.save().then(function (workout){
		$scope.workout = workout;
		$scope.formWorkout.$setPristine();
		$scope.submitted = false;
	});
	};
	
	$scope.removeExercise = function (exercise){
		workoutBuilderSvc.removeExercise(exercise);
	};
	
	$scope.durations = [
		{title: "15 seconds", value: 15},
		{title: "30 seconds", value: 30},
		{title: "45 seconds", value: 45},
		{title: "1 minute", value: 60},
		{title: "1 minute 15 seconds", value: 75},
		{title: "1 minute 30 seconds", value: 90},
		{title: "1 minute 45 seconds", value: 105}, 
		{title: "2 minutes", value: 120}, 
		{title: "2 minutes 15 seconds", value: 135},
		{title: "2 minutes 30 seconds", value: 150},
		{title: "2 minutes 45 seconds", value: 165},
		{title: "3 minutes", value: 180},
		{title: "3 minutes 15 seconds", value: 195},
		{title: "3 minutes 30 seconds", value: 210},
		{title: "3 minutes 45 seconds", value: 225},
		{title: "4 minutes", value: 240},
		{title: "4 minutes 15 seconds", value: 255},
		{title: "4 minutes 30 seconds", value: 270},
		{title: "4 minutes 45 seconds", value: 285},
		{title: "5 minutes", value: 300}
	];
	
	$scope.moveExerciseTo = function (exercise, location){
		workoutBuilderSvc.moveExerciseTo(exercise, location)
	};
	
//	var restWatch = $scope.$watch('formWorkout.restBetweenExercises',
//	function(newValue){
//		if (newValue){
//			newValue.$parsers.unshift(function (value){
//				return isNaN(parseInt(value)) ? value : parseInt(value);
//			});
//			newValue.$formatters.push(function (value) {
//				return isNaN(parseInt(value))? value: parseInt(value);
//			});
//			restWatch(); //de-register the watch after first time.
//		}
//	})

	$scope.$watch('formWorkout.exerciseCount', function (newValue){
		if (newValue) {
			newValue.$setValidity("count", $scope.workout.exercises.length>0);
		}
	});
	$scope.$watch('workout.exercises.length', function (newValue, oldValue){
		if (newValue != oldValue){
				$scope.formWorkout.exerciseCount.$dirty = true;
				$scope.formWorkout.$setDirty();
				$scope.formWorkout.exerciseCount.$setValidity("count", newValue > 0);
			}
			
	});
	
	var init = function () {
		$scope.workout = selectedWorkout; // Resolved workout
	};
	init();
	
});


angular.module('main')
				.controller('workoutListCtrl', function ($scope, $location, workoutSvc){
					$scope.goto = function (workout){
						$location.path('/builder/workouts/' + workout.name);
					}
					var init = function (){
						workoutSvc.getWorkouts().then(function (data){
							$scope.workouts = data;
						})
					};
					init();
});

