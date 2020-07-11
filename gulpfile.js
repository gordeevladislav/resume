var gulp = require('gulp');
var pug = require('gulp-pug');
var autoprefixer = require("autoprefixer");
var postcss = require("gulp-postcss");
var server = require('browser-sync').create();

gulp.task('html', function () {
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/'));
});

gulp.task('css', function () {
  return gulp.src('src/styles/style.css')
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/styles'));
});

gulp.task('img', function () {
  return gulp.src('src/img/**')
    .pipe(gulp.dest('build/img'));
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('src/styles/*.css', gulp.series('css', 'refresh'));
  gulp.watch('src/*.pug', gulp.series('html', 'refresh'));
  gulp.watch('src/img/**', gulp.series('img', 'refresh'));
});

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('build', gulp.series('html', 'img', 'css'));
gulp.task('start', gulp.series('build', 'server'));


