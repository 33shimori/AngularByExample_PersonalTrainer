angular.module('main').config(function ($routeProvider, workoutSvcProvider){
	
	//IMPORTANT: set the database name and API Key here before running application
	workoutSvcProvider.configure("angularbyexample", "cVpLXjl-qYJ4Dfk2nD-ml-1yxU_S41I7");
	
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
						resolve:{
							selectedWorkout:
								function ($route, workoutBuilderSvc, $location){
									var workout = 
										workoutBuilderSvc.startBuilding($route.current.params.id);
										if(!workout){
											$location.path('/builder/workouts');
										}
										return workout;
								}}
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

