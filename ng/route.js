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

