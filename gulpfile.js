const { src, dest, watch } = require('gulp')
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const pipeline = require('readable-stream').pipeline
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const clean = require('gulp-clean')
const kit = require('gulp-kit')

const paths = {
	html: './html/**/*.kit',
	sass_src: './src/sass/**/*.scss',
	sass_dest: './dist/css',
	js_src: './src/js/**/*.js',
	js_dest: './dist/js',
	img_src: 'src/img/*.{png,jpg,jpeg,gif,svg}',
	img_dest: 'dist/img',
	dist: './dist'
}

function buildStyles(cb) {
	src(paths.sass_src)
		.pipe(sourcemaps.init())
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sass_dest))
	cb()
}
function javascript(cb) {
	src(paths.js_src)
		.pipe(sourcemaps.init())
		.pipe(
			babel({
				presets: ['@babel/env'],
			})
		)
		.pipe(uglify())
		.pipe(rename({ suffix: '.min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.js_dest))
	cb()
}
function convertImg(cb) {
	src(paths.img_src).pipe(imagemin()).pipe(dest(paths.img_dest))
	cb()
}
function handleKits(cb) {
	src(paths.html).pipe(kit()).pipe(dest('./'))
	cb()
}

function cleanStuff(cb) {
	src(paths.dist, { read: false }).pipe(clean())
}

function browserSyncFun(cb) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})

	cb()
}

function watchWebsite(cb) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass_src, paths.js_src], gulp.parallel(handleKits, buildStyles, javascript)).on(
		'change',
		reload
	)
	watch(paths.img_src, convertImg).on('change', reload)
	cb()
}

const mainFunctions = gulp.parallel(buildStyles, javascript, convertImg)
exports.cleanStuff = cleanStuff
exports.default = gulp.series(mainFunctions, browserSyncFun, watchWebsite)
