var gulp = require('gulp');
var $g = require('gulp-load-plugins')();

gulp.task('include', function() {
  gulp.src('./*.html')
    .pipe($g.fileInclude({

    }))
})
