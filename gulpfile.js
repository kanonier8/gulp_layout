'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const pug = require('gulp-pug');
const plumber = require('gulp-plumber');
const base64 = require('gulp-base64');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer-stylus');
const browserSync = require('browser-sync').create();

gulp.task('styles', function() {
	return gulp.src('source/stylus/index.styl')
		.pipe(sourcemaps.init())
		.pipe(plumber())
		.pipe( stylus({
			use: [ autoprefixer() ]
		}) )
		.pipe(base64({maxImageSize: 8*1024}))
		.pipe( gulp.dest('dist/css') );
});

gulp.task('pug', function() {
	return gulp.src('source/pug/*.pug')
		.pipe(plumber())
		.pipe( pug({pretty: true}) )
		.pipe( gulp.dest('dist/') )
});

gulp.task('clean', function() {
	return gulp.src('dist/*')
		.pipe( clean() )
});

gulp.task('assets', function() {
	return gulp.src('source/assets/**/*.*')
		.pipe( gulp.dest('dist/assets/') )
});

gulp.task('js', function() {
	return gulp.src('source/js/**/*.js')
		.pipe( gulp.dest('dist/js/') )
});

gulp.task('build', gulp.series(
		'clean',
		'assets',
		'js',
		gulp.parallel('styles', 'pug')
	)
);


gulp.task('watch', function() {
	gulp.watch('source/stylus/**/*.styl', gulp.series('styles'));
	gulp.watch('source/pug/**/*.pug', gulp.series('pug'));
	gulp.watch('source/js/**/*.js', gulp.series('js'));
	gulp.watch('source/assets/**/*.*', gulp.series('assets'));
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


