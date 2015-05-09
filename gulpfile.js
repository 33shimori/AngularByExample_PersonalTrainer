var gulp = require('gulp'), 
				fs = require('fs');

				fs.readdirSync(__dirname + '/gulp').forEach(function (task){
					require('./gulp/' + task);
				});
				
				gulp.task('dev', ['dev:server','watch:js', 'watch:css']);

