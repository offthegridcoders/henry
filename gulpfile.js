var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var useref = require('gulp-useref');
var fileinclude = require('gulp-file-include');
var watch = require('gulp-watch');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var argv = require('yargs').argv;
var file = require('gulp-file');

var paths = {
  src: {
    scss: 'src/scss/**/*.scss',
    assets: 'src/assets/**/*',
    vendor: 'src/scss/vendor/*.css',
    css: 'src/css/*.css',
    js: 'src/js/**/*.js',
    templates: 'src/templates/**/*.html',
    partials: 'src/partials/**/*.html'
  },
  dist: {
    base: './dist',
    js: './dist/js',
    assets: './dist/assets',
    html: './dist/**/*.html',
    css: './dist/css/'
  }
};

gulp.task('default', ['sass', 'make'], function(options) {
  console.log(options);
  return gulp.watch([
      paths.src.scss,
      paths.src.assets,
      paths.src.vendor,
      paths.src.js,
      paths.src.templates,
      paths.src.partials
    ], ['default']);
});

gulp.task('build', ['make', 'image-compress'], function() {});

// compiles scss then minifies and uglifies all css files
// including vendor files and scss files

  gulp.task('sass', ['minify-css']);

  gulp.task('compile-sass', ['clear'], function() {
    return gulp.src(paths.src.scss)
      .pipe(scsslint())
      .pipe(sass())
      .pipe(gulp.dest(paths.dist.css));
  });

  gulp.task('concat-css', ['compile-sass'], function () {
    return gulp.src([
        paths.dist.css + '/*.css',
        paths.src.vendor
      ])
      .pipe(concatCss('main.css'))
      .pipe(gulp.dest(paths.dist.css));
  });

  gulp.task('minify-css', ['concat-css'], function() {
    return gulp.src(paths.dist.css + '/main.css')
      .pipe(minifyCSS())
      .pipe(gulp.dest(paths.dist.css))
  });

// builds complete site and exports into
// dist folder then runs cleanup

  gulp.task('make', [
    'clear',
    'sass',
    'useref',
    'img-copy',
    'compress'], function() {
    return gulp.src(paths.dist.html)
    .pipe(fileinclude())
    .pipe(gulp.dest(paths.dist.base));
  });

  gulp.task('clear', function () {
    return gulp.src('dist', {read: false})
      .pipe(clean());
  });

  gulp.task('useref', ['fileinclude'], function () {
    var assets = useref.assets();
    return gulp.src(paths.src.templates)
      .pipe(assets)
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(paths.dist.base));
  });

  gulp.task('fileinclude', ['clear'], function() {
    return gulp.src(paths.dist.html)
      .pipe(fileinclude())
      .pipe(gulp.dest(paths.dist.base));
  });
  
  gulp.task('img-copy', ['clear'], function() {
    return gulp.src(paths.src.assets)
    .pipe(gulp.dest(paths.dist.assets));
  })

  gulp.task('compress', ['useref'], function() {
    return gulp.src(paths.src.js)
      .pipe(uglify())
      .pipe(gulp.dest(paths.dist.js))
  });

  gulp.task('image-compress', function () {
    return gulp.src(paths.dist.assets + '/**/*.*')
      .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(gulp.dest(paths.dist.assets));
  });

var watcher = gulp.watch([
  paths.src.scss,
  paths.src.assets,
  paths.src.vendor,
  paths.src.js,
  paths.src.templates,
  paths.src.partials
]);

watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', recompiling site...');
});


//
// THIS ALLOWS YOU TO CREATE PAGES, DIRECTORYS, SASS FILES, ETC... THROUGH THE TERMINAL
//
// (still in progress)
//

gulp.task('new', function() {
  if(argv.template){
    gulp.src('./henry/index.html')
    .pipe(gulp.dest('./src/templates/' + argv.template + '/'))
    .once('end', function () {
      process.exit();
    });
    console.log(argv.template + '/index.html - Template Created');
  };

  if(argv.dir){
    gulp.src('./henry/index.html')
    .pipe(gulp.dest('./src/' + argv.dir + '/'))
    .once('end', function () {
      process.exit();
    });
    console.log(argv.dir + '/ - Directory Created');
  };

  if(argv.scss){
    return gulp.src('./henry/_index.scss')
    .pipe(gulp.dest('./src/scss/' + argv.scss))
    .once('end', function () {
      process.exit();
    });
    console.log('scss/' + argv.scss + '_index.scss - Scss file Created');
  };

  return;
});
