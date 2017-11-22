const gulp = require('gulp');
const $g = require('gulp-load-plugins')();
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
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

gulp.task('scripts', () => 
    browserify({ 
      entries: './scripts/app.js', 
      debug: true })
      .transform('babelify', {
        presets: ['env']
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe($g.sourcemaps.init())
      .pipe($g.uglify())
      .pipe($g.sourcemaps.write('./maps'))
      .pipe(gulp.dest('./build')));

gulp.task('styles', () => 
  gulp.src('./styles/main.scss')
    .pipe($g.sass({ outputStyle: 'compressed' })
      .on('error', $g.sass.logError))
    .pipe(gulp.dest('./build/')));

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