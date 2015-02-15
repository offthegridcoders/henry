var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var fileinclude = require('gulp-file-include');
var watch = require('gulp-watch');
var autoprefixer = require('gulp-autoprefixer');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var paths = {
  scss: 'src/scss/**/*.scss',
  assets: 'src/assets/**/*',
  vendor: 'src/scss/vendor/*.css',
  css: 'src/css/*.css',
  html: 'src/**/*.html',
  js: 'src/js/**/*.js',
  templates: 'src/templates/_*.html',
  distHTML: 'dist/**/*.html'
};

gulp.task('default', ['sass', 'make', 'clean-up'], function() {
  return gulp.watch([
      paths.scss,
      paths.assets,
      paths.html,
      paths.js,
      paths.templates
    ], ['default']);
});

gulp.task('build', ['sass', 'make', 'clean-up', 'image-compress'], function() {});

// compiles scss then minifies and uglifies all css files
// including vendor files and scss files

  gulp.task('sass', ['minify-css']);

  gulp.task('compile-sass', function() {
    return gulp.src(paths.scss)
      .pipe(scsslint())
      .pipe(sass())
      .pipe(gulp.dest('./src/scss'));
  });

  gulp.task('concat-css', ['compile-sass'], function () {
    return gulp.src(['./src/scss/*.css', paths.vendor])
      .pipe(concatCss('main.css'))
      .pipe(gulp.dest('./src/css'));
  });

  gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src('./src/css/main.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./src/css'))
  });

// builds complete site and exports into
// dist folder then runs cleanup

  gulp.task('make', ['clear', 'useref', 'img-copy'], function() {
    return gulp.src(paths.distHTML)
    .pipe(fileinclude())
    .pipe(gulp.dest('./dist'));
  });

  gulp.task('clear', ['sass'], function () {
    return gulp.src('dist', {read: false})
      .pipe(clean());
  });

  gulp.task('useref', ['fileinclude'], function () {
    var assets = useref.assets();
    return gulp.src(paths.html)
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest('./dist'));
  });

  gulp.task('fileinclude', ['clear'], function() {
    return gulp.src(paths.distHTML)
      .pipe(fileinclude())
      .pipe(gulp.dest('./dist'));
  });
  
  gulp.task('img-copy', ['clear'], function() {
    return gulp.src(paths.assets)
    .pipe(gulp.dest('./dist/assets'));
  })

  gulp.task('clean-up', ['make'], function() {
    return gulp.src(['./dist/partials/'], {read: false})
      .pipe(clean())
  });

  gulp.task('image-compress', ['clean-up'], function () {
    return gulp.src('./dist/assets/**/*.*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./dist/assets/'));
  });

