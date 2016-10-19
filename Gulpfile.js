const gulp        = require('gulp')
const sass        = require('gulp-sass')
const browserSync = require('browser-sync')

gulp.task('sass', function() {
  gulp.src('styles/application.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/styles/'))
    .pipe(browserSync.stream())
})

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    proxy: "http://localhost:3000",
    files: ["public/**/*.css"],
    port: 3030
  })

  gulp.watch('styles/**/*.scss', ['sass'])
  gulp.watch("views/**/*.hbs").on('change', browserSync.reload)
})

// Default gulp Task
gulp.task('default', ['serve']);
