var gulp = require('gulp');
// Web server
var webserver = require('gulp-webserver');
// Default task
gulp.task('default', function() {
	gulp.src('./')
		.pipe(webserver({
			port: 8081,
			open: true
		}));
});