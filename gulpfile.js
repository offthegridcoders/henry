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
  js: 'src/js/**/*.js',
  templates: 'src/templates/**/*.html',
  partials: 'src/partials/**/*.html',
  distHTML: 'dist/**/*.html'
};

gulp.task('default', ['sass', 'make'], function() {
  return gulp.watch([
      paths.scss,
      paths.assets,
      paths.js,
      paths.templates
    ], ['default']);
});

gulp.task('build', ['make', 'image-compress'], function() {});

// compiles scss then minifies and uglifies all css files
// including vendor files and scss files

  gulp.task('sass', ['minify-css']);

  gulp.task('compile-sass', ['clear'], function() {
    return gulp.src(paths.scss)
      .pipe(scsslint())
      .pipe(sass())
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.task('concat-css', ['compile-sass'], function () {
    return gulp.src(['./dist/css/*.css', paths.vendor])
      .pipe(concatCss('main.css'))
      .pipe(gulp.dest('./dist/css'));
  });

  gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src('./dist/css/main.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest('./dist/css/'))
  });

// builds complete site and exports into
// dist folder then runs cleanup

  gulp.task('make', ['clear', 'sass', 'useref', 'img-copy', 'compress'], function() {
    return gulp.src(paths.distHTML)
    .pipe(fileinclude())
    .pipe(gulp.dest('./dist'));
  });

  gulp.task('clear', function () {
    return gulp.src('dist', {read: false})
      .pipe(clean());
  });

  gulp.task('useref', ['fileinclude'], function () {
    var assets = useref.assets();
    return gulp.src(paths.templates)
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

  gulp.task('compress', ['useref'], function() {
    return gulp.src('./src/js/scripts.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'))
  });

  gulp.task('image-compress', function () {
    return gulp.src('./dist/assets/**/*.*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest('./dist/assets/'));
  });

