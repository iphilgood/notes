var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('styles/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles/'));
});

// Watch task
gulp.task('default',function() {
  gulp.watch('styles/**/*.scss', ['styles']);
});
