const gulp          = require('gulp');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
const uglify        = require('gulp-uglify');
const browserSync   = require('browser-sync');
const rename        = require("gulp-rename");

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('js:build', () => {
  return gulp.src('src/isolde.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('isolde.min.js'))
    .pipe(gulp.dest('dist'))
});
gulp.task('css:build', () => {
  let plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  return gulp.src('src/isolde.css')
    .pipe(postcss(plugins))
    .pipe(rename('isolde.min.css'))
    .pipe(gulp.dest('dist'))
});
gulp.task('js', () => {
  return gulp.src('src/isolde.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('css', () => {
  return gulp.src('src/isolde.css')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'js', 'css'], () => {
  gulp.watch('src/isolde.css', ['css']);
  gulp.watch('src/isolde.js', ['js']);
  gulp.watch('src/index.html', browserSync.reload);
})

gulp.task('build', ['css:build', 'js:build']);

gulp.task('default', ['watch']);