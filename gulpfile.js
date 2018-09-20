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
  return gulp.src('src/pronkt.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('pronkt.min.js'))
    .pipe(gulp.dest('dist'))
});
gulp.task('css:build', () => {
  let plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  return gulp.src('src/pronkt.css')
    .pipe(postcss(plugins))
    .pipe(rename('pronkt.min.css'))
    .pipe(gulp.dest('dist'))
});
gulp.task('js', () => {
  return gulp.src('src/pronkt.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('css', () => {
  return gulp.src('src/pronkt.css')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'js', 'css'], () => {
  gulp.watch('src/pronkt.css', ['css']);
  gulp.watch('src/pronkt.js', ['js']);
  gulp.watch('src/index.html', browserSync.reload);
})

gulp.task('build', ['css:build', 'js:build']);

gulp.task('default', ['watch']);