var gulp = require('gulp');
var $g = require('gulp-load-plugins')();
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var del = require('del');
var run = require('run-sequence');
var browserSync = require('browser-sync').create();

gulp.task('pages', function () {
  return gulp.src('./pages/*.html')
    .pipe($g.fileInclude('@@'))
    .pipe($g.htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('./build'));
});

gulp.task('scripts', function () {
    var bundleStream = browserify('./scripts/app.js').bundle();
    return bundleStream
      .pipe(source('app.js'))
      .pipe($g.streamify($g.uglify()))
      .pipe(gulp.dest('./build'));
  });

gulp.task('styles', ['rename'], function () {
    return gulp.src('./styles/scss/main.scss')
      .pipe($g.sass({ outputStyle: 'compressed' })
        .on('error', $g.sass.logError))
      .pipe(gulp.dest('./build/'));
  });

gulp.task('rename', function () {
    return gulp.src('./styles/css/*.css')
    .pipe($g.rename({
      prefix: '_',
      extname: '.scss',
    }))
    .pipe(gulp.dest('./styles/scss/'));

  });

gulp.task('images', function () {
    gulp.src('./images/*')
      .pipe($g.imagemin())
      .pipe(gulp.dest('./build/images'));
  });

gulp.task('clean', function () {
    return del(['./build']);

  });

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './build',
    },
  });
});

gulp.task('watch', function () {
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('styles/**/*', ['styles']);
  gulp.watch('./pages/**/*.html', ['pages']);
  gulp.watch('images/*', ['images']);
  gulp.watch('build/**/*', browserSync.reload);
});

gulp.task('default', function () {
  run(
  'clean',
  'styles',
  'scripts',
  'pages',
  'images',
  'server',
  'watch'
  );
});
