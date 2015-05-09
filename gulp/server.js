var gulp = require('gulp'), 
				nodemon = require('gulp-nodemon');

gulp.task ('dev:server', function () {
	nodemon({
		script: './bin/www',
		ext: "",
		env: {"DEBUG": "public_html:server"},
		ignore: ['ng*', 'gulp*', 'public*', 'stylesheets*', 'test*']
	});
});

module.export = gulp;