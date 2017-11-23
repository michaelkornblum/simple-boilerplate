const gulp = require('gulp');
const $g = require('gulp-load-plugins')();
const webpack = require('webpack-stream');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const del = require('del');
const run = require('run-sequence').use(gulp);
const browserSync = require('browser-sync').create();
const tasks = [
  'clean',
  'styles',
  'scripts',
  'vectors',
  'pages',
  'images',
  'server',
  'watch',
];

gulp.task('pages', () =>
  gulp.src('./pages/*.html')
    .pipe($g.plumber())
    .pipe($g.fileInclude('@@'))
    .pipe($g.htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(gulp.dest('./build')));

gulp.task('scripts', () =>
  gulp.src('./scripts/app.js')
    .pipe($g.plumber())
    .pipe(webpack({
      devtool: 'source-map',
      plugins: [
        new UglifyJsPlugin(),
      ],
      module: {
        loaders: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
          },
        ],
      },
      output: {
        filename: 'main.js',
      },
    }))
    .pipe(gulp.dest('./build')));

gulp.task('styles', () =>
  gulp.src('./styles/main.scss')
    .pipe($g.plumber())
    .pipe($g.sass({ outputStyle: 'compressed' })
      .on('error', $g.sass.logError))
    .pipe(gulp.dest('./build/')));

gulp.task('images', () =>
  gulp.src('./images/*')
    .pipe($g.plumber())
    .pipe($g.imagemin())
    .pipe(gulp.dest('./build/images')));

gulp.task('vectors', () =>
  gulp.src('./vectors/*')
    .pipe($g.plumber())
    .pipe($g.svgmin())
    .pipe(gulp.dest('./pages/partials')));

gulp.task('clean', () => del('./build'));

gulp.task('server', () => browserSync.init({
  server: { baseDir: './build' }, }));

gulp.task('watch', () => {
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('styles/**/*', ['styles']);
  gulp.watch('pages/**/*.html', ['pages']);
  gulp.watch('images/*', ['images']);
  gulp.watch('vectors/*', ['vectors']);
  gulp.watch('build/**/*', browserSync.reload);
});

gulp.task('default', callback => run(...tasks, callback));
