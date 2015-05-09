var gulp = require('gulp'), 
				less = require('gulp-less');

		gulp.task('css', function() {
			gulp.src('stylesheets/style.less')
							.pipe(less('style.css'))
							.pipe(gulp.dest('public'));
		});
		
		gulp.task('watch:css', ['css'], function () {
			gulp.watch('stylesheets/**/*.less', ['css']);
		});
		
		module.export = gulp;

