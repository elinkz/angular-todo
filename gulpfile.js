var gulp = require('gulp'),
//sass = require('gulp-sass'),
sass = require('gulp-ruby-sass'),
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
cssnano = require('gulp-cssnano'),
concat = require('gulp-concat'),
livereload = require('gulp-livereload'),
del = require('del'),
sourcemaps = require('gulp-sourcemaps'),
notify = require('gulp-notify'),
rename = require('gulp-rename');

var styleGlob = 'app/src/scss/**/*.scss';
var scriptsDir = 'app/src/js/**/*.js';
var buildDir = 'app/dist/assets/js';

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

gulp.task('styles', function() {
  return sass(styleGlob, { style: 'expanded' })
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('app/dist/assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('app/dist/assets/css'))
    .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
  return gulp.src(scriptsDir)
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('todoApp.js'))
    .pipe(gulp.dest(buildDir))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(buildDir))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
  return del(['app/dist/assets']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch('src/scss/**/*.scss', ['styles']);

  // Watch .js files
  gulp.watch('src/js/**/*.js', ['scripts']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in app/dist/, reload on change
  gulp.watch(['app/dist/**']).on('change', livereload.changed);

});