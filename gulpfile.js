var gulp = require('gulp');

var del = require('del');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var processhtml = require('gulp-processhtml');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var imageResize = require('gulp-image-resize');

// Clean out the items in the build directory
gulp.task('clean-build', function() {
   return del([
       'build/css/**/*',
       'build/img/**/*',
       'build/js/**.*',
       'build/stylesheets/**/*',
       'build/views/css/**/*',
       'build/views/js/**/*',
       'build/views/images/**/*',
       'build/views/pizza.html',
       'build/index.html'
   ])
});

// Resize and compress the pizzeria.jpg file
gulp.task('pizzeria', function() {
  return gulp.src(['src/views/images/*.jpg'])
      .pipe(imageResize({
          width: 100
      }))
        .pipe(imageminJpegRecompress({loops: 3, quality: 'low', max:1})())
        .pipe(gulp.dest('build/views/images'));
});

// Compress the other jpgs
gulp.task('jpgs', function() {
  return gulp.src(['src/img/*.jpg'])
        .pipe(imageminJpegRecompress({loops: 3})())
        .pipe(gulp.dest('build/img'));
});

// Copy over the png files to the build directory
gulp.task('copy1', function() {
   gulp.src('src/img/*.png')
       .pipe(gulp.dest('build/img'));
});

gulp.task('copy2', function() {
    gulp.src('src/views/images/*.png')
        .pipe(gulp.dest('build/views/images'));
});

// Minify the css files and rename to *.min.css
gulp.task('minify_main_css', function() {
    return gulp.src(['src/css/*.css', '!*.min.css'])
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('build/css'));
});

// Minify the css files and rename to *.min.css
gulp.task('minify_views_css', function() {
    return gulp.src(['src/views/css/*.css', '!*.min.css'])
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('build/views/css'));
});

// Minify the css files and rename to *.min.css
gulp.task('minify_stylesheets_css', function() {
    return gulp.src(['src/stylesheets/*.css', '!*.min.css'])
        .pipe(minifyCss())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('build/stylesheets'));
});

// Run processhtml on index.html and minify the result
// This task depends on the tasks for images, css and javascript completing
gulp.task('process_index_html', ['jpgs', 'copy1', 'copy2',
    'minify_main_css', 'minify_views_css', 'minify_stylesheets_css',
    'uglify_js', 'uglify_views_js'], function() {
    return gulp.src('src/index.html')
        .pipe(processhtml())
        .pipe(minifyHtml())
        .pipe(gulp.dest('build'));
});

// Run processhtml on pizza.html and minify the result
// This task depends on the tasks for images, css and javascript completing
gulp.task('process_pizza_html', ['pizzeria',
    'jpgs', 'copy1', 'copy2',
    'minify_main_css', 'minify_views_css', 'minify_stylesheets_css',
    'uglify_js', 'uglify_views_js'], function() {
    return gulp.src('src/views/pizza.html')
        .pipe(processhtml())
        .pipe(minifyHtml())
        .pipe(gulp.dest('build/views'));
});

// Minify the javascript and rename files to *.min.js
gulp.task('uglify_js', function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('build/js'));
});

// Minify the javascript and rename files to *.min.js
gulp.task('uglify_views_js', function() {
    return gulp.src('src/views/js/*.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('build/views/js'));
});

// Default task creates all items for the build directory
gulp.task('default', ['pizzeria',
    'jpgs', 'copy1', 'copy2',
    'minify_main_css', 'minify_views_css', 'minify_stylesheets_css',
    'process_index_html', 'process_pizza_html',
    'uglify_js', 'uglify_views_js']);
