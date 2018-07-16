const gulp          = require('gulp');
const postcss       = require('gulp-postcss');
const autoprefixer  = require('autoprefixer');
const cssnano       = require('cssnano');
const concat        = require('gulp-concat');
const babel         = require('gulp-babel');
const uglify        = require('gulp-uglify');
const browserSync   = require('browser-sync');

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('js:build', function(){
  return gulp.src('src/sortable.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('sortable.min.js'))

    //DIST
    .pipe(gulp.dest('dist'))

    //EXAMPLES
    .pipe(gulp.dest('examples/js'))
});
gulp.task('css:build', function(){
  let plugins = [
    autoprefixer({browsers: ['last 1 version']}),
    cssnano()
  ];
  return gulp.src('src/sortable.css')
    .pipe(postcss(plugins))

    //DIST
    .pipe(gulp.dest('dist'))

    //EXAMPLES
    .pipe(gulp.dest('examples/css'))
});
gulp.task('js', function(){
  return gulp.src('src/sortable.js')
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('css', function(){
  return gulp.src('src/sortable.css')
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('watch', ['browserSync', 'js', 'css'], () => {
  gulp.watch('src/sortable.css', ['css']);
  gulp.watch('src/sortable.js', ['js']);
  gulp.watch('src/index.html', browserSync.reload);
})

gulp.task('build', ['css:build', 'js:build']);

gulp.task('default', ['watch']);