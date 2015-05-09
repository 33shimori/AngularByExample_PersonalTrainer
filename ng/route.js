angular.module('main').config(function ($routeProvider){
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
						templateUrl: 'wourkout.jade',
						controller: 'workoutDetailsCtrl',
						leftNav: 'left-nav-main-jade',
						topNav: 'top-nav-main-jade',
						resolve:{ 
							selectedWorkout: function(workoutBuilderSvc){
								return workoutBuilderSvc.startbuilding();
							}}
					})
					.when('/builder/workouts/:id', {
						templateUrl: 'workout.jade',
						controller: 'workoutDetailsCtrl',
						leftNav: 'left-nav-main-jade',
						topNav: 'top-nav-main-jade',
						resolve:{
							selectedWorkout:
								function ($route, workoutBuilderSvc){
									return workoutBuilderSvc.startBuilding($route.current.params.id);
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

