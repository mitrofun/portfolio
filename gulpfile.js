var gulp  = require('gulp'),
    compass = require('gulp-compass'),
    minify = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    prefixer = require('gulp-autoprefixer'),
    htmlreplace = require('gulp-html-replace'),
    htmlmin = require('gulp-htmlmin'),
    imagemin = require('gulp-imagemin'),
    rimraf = require('rimraf'),
    mainBowerFiles = require('gulp-main-bower-files'),
    concat = require('gulp-concat'),
    gulpFilter = require('gulp-filter');


// Билд и минифицирование css из sass compass
gulp.task('css', function() {
  gulp.src('./src/sass/*.scss')
      .pipe(compass({
        config_file: 'prod.rb',
        css: 'src/css',
        sass: 'src/sass'
      }))
      .pipe(prefixer({
            browser: ['last 3 version', "> 1%", "ie 8", "ie 7"]
        })) //Добавим вендорные префиксы
      .pipe(gulp.dest('build/css'))
      .pipe(minify({keepBreaks: false}))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('build/css'))
});

// Билд js
gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
      // .pipe(gulp.dest('build/js/'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('build/js/'));

});

// Вендорные файлы
gulp.task('vendor', function() {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles({
            overrides: {
                bootstrap: {
                    main: [
                        './dist/js/bootstrap.js',
                        './dist/css/*.min.*',
                        './dist/fonts/*.*'
                    ]
                }
            }
        }))
        .pipe(filterJS)
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/vendor'));
});

gulp.task('js', function () {
  gulp.src('src/js/**/*.js')
      // .pipe(gulp.dest('build/js/'))
      .pipe(uglify())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest('build/js/'));

});

// Перенос html и замена стилей и скриптов
// и минифицированные
gulp.task('html', function() {
  gulp.src('src/*.html')
    .pipe(htmlreplace({
        'css': 'css/main.min.css',
        'js': 'js/all.min.js'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/'));
});

// Сжатие изображений
gulp.task('images', function(cb) {
    gulp.src(['src/**/*.png','src/**/*.jpg','src/**/*.gif','src/**/*.jpeg']).pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    }))
        .pipe(gulp.dest('build/')).on('end', cb).on('error', cb);
});

// Перенос шрифтов
gulp.task('fonts', function() {
    gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});


// Перенос favicon
gulp.task('ico', function() {
  gulp.src('src/ico/**/*.*')
        .pipe(gulp.dest('build/ico'));
});

// Перенос ajax
gulp.task('ajax', function() {
  gulp.src('src/ajax/**/*.*')
        .pipe(gulp.dest('build/ajax'));
});

// Очитска build
gulp.task('clean', function (cb) {
    rimraf('build', cb);
});


// Сборка проекта
gulp.task('build', [
    'css',
    'js',
    'html',
    'images',
    'fonts',
    'ico',
    'ajax',
    'vendor'
]);

// обединение js в один файл
gulp.task('concat-js', ['build'], function () {
    var filterJS = gulpFilter('**/*.js', { restore: true });
    gulp.src(['build/vendor/*.js', 'build/js/*.js'])
        .pipe(filterJS)
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(filterJS.restore)
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('build/js'));

});


gulp.task('prod', ['build', 'concat-js']);