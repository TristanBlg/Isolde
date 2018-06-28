let gulp            = require('gulp'),
	cleancss        = require('gulp-clean-css'),
	babel           = require('gulp-babel'),
	eslint          = require('gulp-eslint'),
	imagemin        = require('gulp-imagemin'),
	uglify          = require('gulp-uglify'),
	runSequence     = require('run-sequence'),
	autoprefixer    = require('gulp-autoprefixer'),
	del             = require('del');

let source 	= './src',
	dist   	= './dist',
	example = './examples';

gulp.task('css', () =>
	gulp.src(example+'/css/sortable.css')
		.pipe(gulpIf('*.css', autoprefixer()))
		.pipe(gulpIf('*.css', cleancss()))
)
gulp.task('js:lint', () =>
	gulp.src(source+'/sortable.js')
		.pipe(eslint())
		.pipe(eslint.format())
)
gulp.task('js', ['js:lint'], () =>
	gulp.src(source+'/sortable.js')
		.pipe(gulpIf('*.js', babel()))
		.pipe(gulpIf('*.js', uglify()))
        .pipe(gulp.dest(dist))
)

gulp.task('images', () =>
    gulp.src(example+'/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest(example+'/images'))
)

gulp.task('clean', () => 
    del(dist)
)
gulp.task('watch', ['js:lint'], () => {
	// gulp.watch(source+'/scss/**/*.scss', ['css']);
	gulp.watch(source+'/sortable.js', ['js:lint']);
})
gulp.task('build', callback => {
    runSequence('clean',
        ['js', 'css', 'images'], 
        callback
    )
})
gulp.task('default', callback => {
    runSequence(['js:lint', 'watch'],
        callback
    )
})
