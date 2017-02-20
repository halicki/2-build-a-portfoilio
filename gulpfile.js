var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  cleanCSS = require('gulp-clean-css'),
  concat = require('gulp-concat'),
  livereload = require('gulp-livereload'),
  webserver = require('gulp-webserver');

var w3cjs = require('gulp-w3cjs');
 
gulp.task('w3cjs', function () {
    gulp.src('src/*.html')
        .pipe(w3cjs())
        .pipe(w3cjs.reporter());
});

var paths = {
  scrits_dependencies: [
    'bower_components/jquery/dist/jquery.slim.min.js',
    'bower_components/tether/dist/js/tether.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js'
   ],
  styles_dependencies: [
    'bower_components/tether/dist/css/thether.min.css',
    'bower_components/bootstrap/dist/css/bootstrap.min.css'
  ],
  scripts_src: 'src/js/*.js',
  styles_src: 'src/css/*.css',
  scripts_dest: 'dist/js',
  styles_dest: 'dist/css',
  html_src: 'src/*.html',
  html_dest: 'dist',
  images_src: ['src/images/*.jpg', 'src/images/*.png', 'src/images/*.svg'],
  images_dest: 'dist/images'
};

gulp.task('scrits_dependencies', function(){
  gulp.src(paths.scrits_dependencies)
    .pipe(concat('dependencies.js'))
    .pipe(gulp.dest(paths.scripts_dest))
});

gulp.task('styles_dependencies', function() {
  gulp.src(paths.styles_dependencies)
    .pipe(concat('dependencies.css'))
    .pipe(gulp.dest(paths.styles_dest))
});

gulp.task('prebuild', ['scrits_dependencies', 'styles_dependencies']);

gulp.task('scripts', function() {
  gulp.src(paths.scripts_src)
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts_dest))
});

gulp.task('styles', function() {
  gulp.src(paths.styles_src)
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles_dest))
});

gulp.task('html', function() {
  gulp.src(paths.html_src)
    .pipe(gulp.dest(paths.html_dest))
});

gulp.task('images', function() {
  gulp.src(paths.images_src)
    .pipe(gulp.dest(paths.images_dest));
})

gulp.task('sources', ['prebuild', 'scripts', 'styles', 'html', 'images']);

gulp.task('watch', function() {
  gulp.watch(paths.scripts_src, ['scripts']);
  gulp.watch(paths.styles_src, ['styles']);
  gulp.watch(paths.html_src, ['html']);
  gulp.watch(paths.images_src, ['images']);
});
 
gulp.task('webserver', ['watch'], function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      open: './dist/index.html'
    }));
});

gulp.task('default', ['prebuild', 'sources', 'watch', 'webserver']);