const gulp = require('gulp');
const $g = require('gulp-load-plugins')();
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const del = require('del');
const run = require('run-sequence').use(gulp);
const browserSync = require('browser-sync').create();

gulp.task('pages', () => 
  gulp.src('./pages/*.html')
    .pipe($g.fileInclude('@@'))
    .pipe($g.htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('./build')));

gulp.task('scripts', () => {
  let bundleStream = browserify('./scripts/app.js').bundle();
  return bundleStream
    .pipe(source('app.js'))
    .pipe($g.streamify($g.uglify()))
    .pipe(gulp.dest('./build'));
  });

gulp.task('styles', ['rename'], () => 
  gulp.src('./styles/scss/main.scss')
    .pipe($g.sass({ outputStyle: 'compressed' })
      .on('error', $g.sass.logError))
    .pipe(gulp.dest('./build/')));

gulp.task('rename', () => 
  gulp.src('./styles/css/*.css')
    .pipe($g.rename({
      prefix: '_',
      extname: '.scss',
    }))
    .pipe(gulp.dest('./styles/scss/')));

gulp.task('images', () => 
  gulp.src('./images/*')
    .pipe($g.imagemin())
    .pipe(gulp.dest('./build/images')));

gulp.task('clean', () => del('./build'));

gulp.task('server', () => browserSync.init({ 
  server: { baseDir: './build' }}));

gulp.task('watch', () => {
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('styles/**/*', ['styles']);
  gulp.watch('pages/**/*.html', ['pages']);
  gulp.watch('images/*', ['images']);
  gulp.watch('build/**/*', browserSync.reload);
});

gulp.task('default', (callback) => 
  run(
    'clean',
    'styles',
    'scripts',
    'pages',
    'images',
    'server',
    'watch',
    callback
  ));