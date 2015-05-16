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

