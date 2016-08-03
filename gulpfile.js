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

// Task to oncatenate and minify HTML.
gulp.task('html', function () {

  // Effect all html files in root directory.
  gulp.src('./*.html')

  // Concatenate HTML files.
    .pipe($g.fileInclude({

      /* Define character used to indicate
       variable in HTML page. See index.html
       for example. */
      prefix: '@@',

      /* Indicates relative directory location
      for included files */
      basepath: '@file',
    }))

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
    common.js. See javascripts/app.js for
    details. */
  var bundleStream = browserify('./javascripts/app.js')
    .bundle();
  bundleStream

    // Name the bundle index.js.
    .pipe(source('index.js'))

    // Transform bundle into gulp stream, and uglify output.
    .pipe($g.streamify($g.uglify()))

    // Save output to build/index.js
    .pipe(gulp.dest('./build'));
});
