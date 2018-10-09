var gulp    = require('gulp'),
sass        = require('gulp-sass'),
concat      = require('gulp-concat'),
sourcemaps  = require('gulp-sourcemaps'),
cleanCSS    = require('gulp-clean-css'),
fileinclude = require('gulp-file-include'),
image       = require('gulp-image');
sync        = require('browser-sync');
reload      = sync.reload;

gulp.task('serverRun', function() {
  sync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
});

gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write(''))
  .pipe(gulp.dest('./dist/css'));
});

gulp.task('js', function () {
  return gulp.src([
    'src/js/jquery.js',
    'src/js/main.js'
  ])
  .pipe(gulp.dest('./dist/js/'));
});

gulp.task('fileinclude', function() {
  gulp.src('src/templates/index.html')
  .pipe(fileinclude({
    prefix: '@@',
    indent: true,
    basepath: '@file'
  }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('images', function() {
  gulp.src('src/img/*.*')
  .pipe(image())
  .pipe(gulp.dest('./dist/images/'));
});

gulp.task('fonts', function() {
  gulp.src([
    'src/fonts/*.*'
  ])
  .pipe(gulp.dest('./dist/fonts/'));
});

gulp.task('default', ['sass', 'js', 'fileinclude', 'images', 'fonts', 'serverRun'], function() {});

gulp.task('watch', ['default'], function () {
  gulp.watch('src/scss/**/*.scss', ['sass', reload]);
  gulp.watch('src/js/*.js', ['js', reload]);
  gulp.watch('src/img/*.*', ['images', reload]);
  gulp.watch('src/fonts/*.*', ['fonts', reload]);
  gulp.watch('src/templates/**/*.html', ['fileinclude', reload]);
});
