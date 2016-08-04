// Needed to load gulp.
var gulp = require('gulp');

/* Any plugin that starts with a 'gulp-' prefix
 can now be loaded with a $g.<plugin name>.
 For plugins that are more than one word,
 use camelcase. eg: gulp-file-include should
 be named $g.fileInclude. */
var $g = require('gulp-load-plugins')();

/* Used to concatenate files using common.js.
   See javascripts/app.js for details. */
var browserify = require('browserify');

/* Browserify uses a different streaming
  system than gulp. This plugin is used to
  make the streams compatable. */
var source = require('vinyl-source-stream');

/* del is used to clean out the build directory
  prior to server start up. Files are then rebuilt
  by gulp, assuring that you only have the freshest
  files in your build directory. */
var del = require('del');

/* run-sequence runs all the gulp tasks below
  in sequence. This prevents one task from
  beginner before the other one has a chance
  to complete. This is crucial when running
  browser-sync. */
var run = require('run-sequence');

// do we need an intro for this one?
var browserSync = require('browser-sync').create();

// Task to oncatenate and minify HTML.
gulp.task('html', function () {

  // Effect all html files in root directory.
  gulp.src('./pages/*.html')

  // Concatenate HTML files.
    .pipe($g.fileInclude('@@'))

      //Minify HTML
    .pipe($g.htmlmin({
      collapseWhitespace: true,
    }))

    // Save files to build directory
    .pipe(gulp.dest('./build'));
});

// concatenate and minify javascripts
gulp.task('scripts', function () {

    /* Scripts are concatenated (or bundled) using
    common.js. We use app.js as an entry file.
    See javascripts/app.js for details. */
    var bundleStream = browserify('./javascripts/app.js').bundle();
    bundleStream

    // Name the bundle index.js.
      .pipe(source('index.js'))

    // Transform bundle into gulp stream, and uglify output.
      .pipe($g.streamify($g.uglify()))

    // Save output to build/index.js
      .pipe(gulp.dest('./build'));
  });

/* Task to concatenate, minify and preprocess sass to
    CSS. We're using Sass here, because the syntax is indentical to
    CSS, and the plugin does everything we need in one fell swoop. */
gulp.task('scss', ['rename'], function () {

    /* main.scss is the entry file */
    return gulp.src('./stylesheets/scss/main.scss')

      //Preprocess sass to css and minify results.
      .pipe($g.sass({ outputStyle: 'compressed' })

        // If there's an error display in console.
        .on('error', $g.sass.logError))

      // Send resuts to build directory
      .pipe(gulp.dest('./build/'));
  });

  // Helper task to convert CSS to Sass files
  gulp.task('rename', function() {

    /* take everything in stylesheets/css directory
      and rename it for sass consumption */
    return gulp.src('./stylesheets/css/*.css')
    .pipe($g.rename({
      prefix: '_',
      extname: '.scss',
    }))

    /* Move results to stylesheets/scss directory for
      compilation. */
    .pipe(gulp.dest('./stylesheets/scss/'));
  });

  /* Task to minify images. Not a part of the
    default configuration, but nice to have. */
  gulp.task('img', function() {
    gulp.src('./images/*')
      .pipe($g.imagemin())
      .pipe(gulp.dest('./build/images'));
  });

  // Simple task to clean out build directory.
  gulp.task('clean', function() {
    return del(['./build']);
  });

  // Task to launch server
  gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

// Watch for changes in folders and fire off
// tasks in response.
gulp.task('watch', function() {
  gulp.watch('javascripts/**/*.js', ['scripts']);
  gulp.watch('stylesheets/**/*', ['scss']);
  gulp.watch('./pages/*.html', ['html']);
  gulp.watch('img/*', ['img']);
  gulp.watch('build/**/*', browserSync.reload);
});

gulp.task('default', function() {
  run('clean', 'scss', 'scripts', 'html', 'server', 'watch');
});
