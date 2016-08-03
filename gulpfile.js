var gulp = require('gulp');
var $g = require('gulp-load-plugins')();

gulp.task('html', function () {
  gulp.src('./*.html')
    .pipe($g.fileInclude({
      prefix: '@@',
      basepath: '@file',
    }))
    .pipe($g.htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('./build'));
});
