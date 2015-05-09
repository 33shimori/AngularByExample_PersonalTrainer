var gulp = require('gulp'), 
				concat = require('gulp-concat');

				gulp.task('js', function () {
					gulp.src(['ng/module.js', 'ng/**/*.js'])
									.pipe(concat('main.js'))
									.pipe(gulp.dest('public'));
				});
				
				gulp.task('watch:js', ['js'], function () {
					gulp.watch('ng/**/*.js',['js']);
				});


				module.exports = gulp;