var gulp = require('gulp'),
    connect = require('gulp-connect'),
    open = require('gulp-open'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    transform = require('vinyl-transform'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    port = process.env.port || 3031;

var getBundleName = function () {
  var version = require('./package.json').version;
  var name = require('./package.json').name;
  return version + '.' + name + '.' + 'min';
};

gulp.task('browserify', function() {
  var bundler = browserify({
    entries: ['./app/src/js/main.js'],
    debug: true
  });
  bundler.transform('reactify');

  var bundle = function() {
    return bundler
      .bundle()
      // .pipe(source(getBundleName() + '.js'))
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./app/dist/js/'));
  };

  return bundle();
});


// launch browser in a port
gulp.task('open', function() {
  var options = {
    url: 'http://localhost:' + port,
  };

  gulp.src('./app/index.html')
    .pipe(open('', options));
});


gulp.task('connect', function() {
  connect.server({
    root: 'app',
    port: port,
    livereload: true
  });
});

// live reload js
gulp.task('js', function() {
  gulp.src('./app/dist/**/*.js')
    .pipe(connect.reload());
});

// live reload html
gulp.task('html', function() {
  gulp.src('./app/*.html')
    .pipe(connect.reload());
})

// live reload html
gulp.task('watch', function() {
  gulp.watch('app/dist/js/*.js', ['js']);
  gulp.watch('app/index.html', ['html']);
  gulp.watch('app/src/js/**/*.js', ['browserify']);
});


gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'watch']);
