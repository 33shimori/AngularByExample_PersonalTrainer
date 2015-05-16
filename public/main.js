'use strict'
angular.module('main', ['ngRoute', 'ngMessages']);



angular.module('main')
	.factory('workoutSvc', function (workoutPlan, Exercise) {
		var service = {};
		var workouts = [];
		var exercises = [];
		service.getExercises = function () {
			return exercises;
		};
		service.getWorkouts = function () {
			return workouts;
		};
		
		var setupInitialExercises = function () {
				exercises.push(
					new Exercise({
						name: "jumpingJacks",
						title: "Jumping Jacks", 
						description: "A jumping jack or star jump, also called side-straddle hop is a physical jumping exercise.",
						image: "images/JumpingJacks.png",
						nameSound: "content/jumpingjacks.wav",
						videos: ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"],
						procedure: "Assume an erect position, with feet together and arms at your side.\
											Slightly bend your knees, and propel yourself a few inches into the air.\
											While in air, bring your legs out to the side about shoulder width or slightly wider.\
											As you are moving your legs outward, you should raise your arms up over your head; arms should be slightly bent throughout the entire in-air movement.\
											Your feet should land shoulder width or wider as your hands meet above your head with arms slightly bent"
							})),
				exercises.push(
					new Exercise({
						name: "wallSit",
						title: "Wall Sit",
						description: "A wall sit, also known as a Roman Chair, is an exercise done to strengthen the quadriceps muscles.",
						image: "images/wallsit.png",
						nameSound: "content/wallsit.wav",
						videos: ["y-wV4Venusw", "MMV3v4ap4ro"],
						procedure: "Place your back against a wall with your feet shoulder width apart and a little ways out from the wall.\
												Then, keeping your back against the wall, lower your hips until your knees form right angles. "
							})),
				exercises.push(
					new Exercise({
						name: "pushUp",
						title: "Push Up",
						description: "A push-up is a common exercise performed in a prone position by raising and lowering the body using the arms",
						image: "images/Pushup.png",
						nameSound: "content/pushups.wav",
						videos: ["Eh00_rniF8E", "ZWdBqFLNljc", "UwRLWMcOdwI", "ynPwl6qyUNM", "OicNTT2xzMI"],
						procedure: "Lie prone on the ground with hands placed as wide or slightly wider than shoulder width. \
												Keeping the body straight, lower body to the ground by bending arms at the elbows. \
										Raise body up off the ground by extending the arms."
					})),
				exercises.push(
					new Exercise({
							name: "crunches",
							title: "Abdominal Crunches",
							description: "The basic crunch is a abdominal exercise in a strength-training program.",
							image: "images/crunches.png",
							nameSound: "content/crunches.wav",
							videos: ["Xyd_fa5zoEU", "MKmrqcoCZ-M"],
							procedure: "Lie on your back with your knees bent and feet flat on the floor, hip-width apart.\
													Place your hands behind your head so your thumbs are behind your ears.\
													Hold your elbows out to the sides but rounded slightly in.\
													Gently pull your abdominals inward.\
													Curl up and forward so that your head, neck, and shoulder blades lift off the floor.\
													Hold for a moment at the top of the movement and then lower slowly back down."
					})),
				exercises.push(
					new Exercise({									
							name: "stepUpOntoChair",
							title: "Step Up Onto Chair",
							description: "Step exercises are ideal for building muscle in your lower body.",
							image: "images/stepUpOntoChair.png",
							nameSound: "content/stepup.wav",
							videos: ["aajhW7DD1EA"],
							procedure: "Position your chair in front of you.\
													Stand with your feet about hip width apart, arms at your sides.\
													Step up onto the seat with one foot, pressing down while bringing your other foot up next to it. \
													Step back with the leading foot and bring the trailing foot down to finish one step-up."
					})),
				exercises.push(
					new Exercise({
							name: "squat",
							title: "Squat",
							description: "The squat is a compound, full body exercise that trains primarily the muscles of the thighs, hips, buttocks and quads.",
							image: "images/squat.png",
							nameSound: "content/squats.wav",
							videos: ["QKKZ9AGYTi4", "UXJrBgI2RxA"],
							procedure: "Stand with your head facing forward and your chest held up and out.\
													Place your feet shoulder-width apart or little wider. Extend your hands straight out in front of you.\
													Sit back and down like you're sitting into a chair. Keep your head facing straight as your upper body bends forward a bit. Rather than allowing your back to round, let your lower back arch slightly as you go down.\
													Lower down so your thighs are parallel to the floor, with your knees over your ankles. Press your weight back into your heels.\
													Keep your body tight, and push through your heels to bring yourself back to the starting position."
					})),
				exercises.push(
					new Exercise({
							name: "tricepdips",
							title: "Tricep Dips On Chair",
							description: "A body weight exercise that targets triceps.",
							image: "images/tricepdips.png",
							nameSound: "content/tricepdips.wav",
							videos: ["tKjcgfu44sI", "jox1rb5krQI"],
							procedure: "Sit up on a chair. Your legs should be slightly extended, with your feet flat on the floor.\
													Place your hands edges of the chair. Your palms should be down, fingertips pointing towards the floor.\
													Without moving your legs, bring your glutes forward off the chair.\
													Steadily lower yourself. When your elbows form 90 degrees angles, push yourself back up to starting position."
					})),
				exercises.push(
					new Exercise({
							name: "plank",
							title: "Plank",
							description: "The plank (also called a front hold, hover, or abdominal bridge) is an isometric core strength exercise that involves maintaining a difficult position for extended periods of time. ",
							image: "images/Plank.png",
							nameSound: "content/plank.wav",
							videos: ["pSHjTRCQxIw", "TvxNkmjdhMM"],
							procedure: "Get into pushup position on the floor.\
													Bend your elbows 90 degrees and rest your weight on your forearms.\
													Your elbows should be directly beneath your shoulders, and your body should form a straight line from head to feet.\
													Hold this position."
					})),
				exercises.push(
					new Exercise({
							name: "highKnees",
							title: "High Knees",
							description: "A form exercise that develops strength and endurance of the hip flexors and quads and stretches the hip extensors.",
							image: "images/highknees.png",
							nameSound: "content/highknees.wav",
							videos: ["OAJ_J3EZkdY", "8opcQdC-V-U"],
							procedure: "Start standing with feet hip-width apart. \
													Do inplace jog with your knees lifting as much as possible towards your chest."
					})),
				exercises.push(
					new Exercise({
							name: "lunges",
							title: "Lunges",
							description: "Lunges are a good exercise for strengthening, sculpting and building several muscles/muscle groups, including the quadriceps (or thighs), the gluteus maximus (or buttocks) as well as the hamstrings. ",
							image: "images/lunges.png",
							nameSound: "content/lunge.wav",
							videos: ["Z2n58m2i4jg"],
							procedure: "Stand erect with your feet about one shoulder width apart.\
													Put your hands on your hips, keep your back as straight as possible, relax your shoulders and keep your eyes facing directly ahead.\
													Take a large step forward with one leg.\
													As you step forward, lower your hips and bend your knees until they both form 90 degree angles.\
													Return to starting position.\
													Repeat with your alternate leg."
					})),
				exercises.push(
					new Exercise({
							name: "pushupNRotate",
							title: "Pushup And Rotate",
							description: "A variation of pushup that requires you to rotate.",
							image: "images/pushupNRotate.png",
							nameSound: "content/pushupandrotate.wav",
							videos: ["qHQ_E-f5278"],
							procedure: "Assume the classic pushup position, but as you come up, rotate your body so your right arm lifts up and extends overhead.\
													Return to the starting position, lower yourself, then push up and rotate till your left hand points toward the ceiling."
					})),
				exercises.push(
				new Exercise({
						name: "sidePlank",
						title: "Side Plank",
						description: "A variation to Plank done using one hand only",
						image: "images/sideplank.png",
						nameSound: "content/sideplank.wav",
						videos: ["wqzrb67Dwf8", "_rdfjFSFKMY"],
						procedure: "Lie on your side, in a straight line from head to feet, resting on your forearm.\
												Your elbow should be directly under your shoulder.\
												With your abdominals gently contracted, lift your hips off the floor, maintaining the line.\
												Keep your hips square and your neck in line with your spine. Hold the position."
				}));	
		};
		var setupInitialWorkouts = function () {
			var exercises = service.getExercises();
			var workout = new workoutPlan({
				name: "7minWorkout",
				title: "7 minute Workout",
				description: "A high intensity workout that consists of 12 exercises",
				restBetweenExercises: 10
			});
			
			for (var i = 0; i <=11; i++){
			workout.exercises.push({
				details: exercises[i],
				duration: 30
			});
		}
			workouts.push(workout);
		};
		
		service.getWorkout= function (name){
			var result = null;
			angular.forEach(service.getWorkouts(), function (workout){
				if(workout.name === name)	result = angular.copy(workout);
			});
			return result;
		};
		
		service.updateWorkout = function (workout){
			for(var i= 0; i < workouts.length; i++){
				if(workouts[i].name === workout.name){
					workouts[i] = workout;
					break;
				}
			}
			return workout;
		};
		
		service.addWorkout = function(workout){
			if(workout.name){
				workouts.push(workout);
				return workout;
			}
		};
		
		var init = function () {
			setupInitialExercises();
			setupInitialWorkouts();
		};
		init();
		return service;
});


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
				.controller('exercisesNavCtrl', function ($scope, workoutSvc, workoutBuilderSvc){
					
					$scope.addExercise = function(exercise){
						workoutBuilderSvc.addExercise(exercise);
					};
									
					var init = function () {
						$scope.exercises = workoutSvc.getExercises();
					};
					init();
});

angular.module('main')
				.controller('exerciseListCtrl', function ($scope, $location, workoutSvc){
					$scope.goto = function(exercise){
						$location.path('/builder/exercies/' + exercise.name);
					}
					var init = function (){
						$scope.exercises = workoutSvc.getExercises();
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
						this.related.videos = args.videos;
						this.nameSound = args.nameSound;
						this.procedure = args.procedure;
					}
					return Exercise;
})

angular.module('main')
				.factory('workoutPlan', function (){
					function WorkoutPlan(args){
						this.exercises = [];
						this.name = args.name
						this.title = args.title;
						this.description = args.description;
						this.restBetweenExercises = args.restBetweenExercises;
					};
					WorkoutPlan.prototype.totalDuration = function (){
						if (this.exercises.length == 0) return 0;
						var total = 0;
						angular.forEach(this.exercises, function (exercise){
							total = total + (exercise.duration ? exercise.duration : 0);
						});
						return (this.restBetweenExercises ? this.restBetweenExercises : 0) *
										(this.exercises.length -1) + total;
					}
					return WorkoutPlan
})


angular.module('main')
				.controller('rootCtrl', function ($scope){
					$scope.$on('$routeChangeSuccess', function (e, current, previous){
					$scope.currentRoute= current;	
					})
})


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
						templateUrl: 'workout.jade',
						controller: 'workoutDetailCtrl',
						leftNav: 'left-nav-exercises.jade',
						topNav: 'top-nav.jade',
						resolve:{ 
							selectedWorkout: function(workoutBuilderSvc){
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


angular.module('main')
				.factory("workoutBuilderSvc", function (workoutSvc, workoutPlan){
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
			var workout = newWorkout?
			workoutSvc.addWorkout(buildingWorkout):
							workoutSvc.updateWorkout(buildingWorkout);
			newWorkout = false;
			return workout;
		};
		
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
		$scope.workout = workoutBuilderSvc.save();
		$scope.formWorkout.$setPristine();
		$scope.submitted = false;
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
						$scope.workouts = workoutSvc.getWorkouts();
					};
					init();
});

