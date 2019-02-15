const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const postcss = require('gulp-postcss') // load the postcss library
const autoprefixer = require('autoprefixer') // load the autoprefixer plugin
const cssnano = require('cssnano') // load the cssnano plugin

// define a task to compile Sass and run autoprefixer and cssnano
gulp.task('sass', function () {
  const plugins = [
    autoprefixer({ browsers: ['last 2 version'] }),
    cssnano()
  ]
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'))
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./css/min'))
    .pipe(browserSync.stream())
})

// define the default task

gulp.task('default', function () {
  browserSync.init({ server: './' })
  gulp.watch('scss/**/*.scss', gulp.series('sass'))
  gulp.watch('*.html').on('change', browserSync.reload)
})
