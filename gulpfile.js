'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer-stylus');
const browserSync = require('browser-sync').create();

gulp.task('styles', function() {
	return gulp.src('source/stylus/index.styl')
		.pipe(sourcemaps.init())
		.pipe( stylus({
			use: [ autoprefixer() ]
		}) )
		.pipe( gulp.dest('dist/css') );
});

gulp.task('pug', function() {
	return gulp.src('source/pug/*.pug')
		.pipe( pug({pretty: true}) )
		.pipe( gulp.dest('dist/') )
});

gulp.task('clean', function() {
	return gulp.src('dist/*')
		.pipe( clean() )
});

gulp.task('fonts', function() {
	return gulp.src('source/fonts/**/*.*')
		.pipe( gulp.dest('dist/fonts/') )
});

gulp.task('image', function() {
	return gulp.src('source/img/**/*.*')
		.pipe( gulp.dest('dist/img/') )
});

gulp.task('build', gulp.series(
		'clean',
		gulp.parallel('image', 'fonts'),
		gulp.parallel('styles', 'pug')
	)
);


gulp.task('watch', function() {
	gulp.watch('source/stylus/**/*.styl', gulp.series('styles'));
	gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('source/img/**/*.*', gulp.series('image'));
	gulp.watch('source/fonts/**/*.*.pug', gulp.series('fonts'));
})

gulp.task('serve', function(callback) {
	browserSync.init({
		server: 'dist'
	});
	browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
	callback();
})

gulp.task('dev', gulp.series(
					'build',
					gulp.parallel('watch','serve'))
);


