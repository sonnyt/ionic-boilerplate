'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var watch = require('gulp-watch');
var del = require('del');

var paths = {
    scripts: {
        src: [
            './app/js/app.js',
            './app/js/**/module.js',
            './app/js/**/*.js'
        ],
        libs: [
            './bower_components/ionic/js/ionic.bundle.min.js',
            './bower_components/angular-cookies/angular-cookies.js',
            './bower_components/angular-resource/angular-resource.js'
        ]
    },
    styles: [
        './app/scss/**/*.scss'
    ],
    images: [
        './app/img/**/*.{png,jpg,gif}'
    ],
    views: {
        partials: [
            '!./app/views/index.html',
            './app/views/**/*.html'
        ],
        main: './app/views/index.html'
    },
    fonts: [
        './bower_components/font-awesome/fonts/**/*',
        './bower_components/ionic/fonts/**/*'
    ]
};

gulp.task('clean', function(cb) {
    del(['./www'], cb);
});

gulp.task('lint', function() {
    return gulp.src(paths.scripts.src)
               .pipe(jshint())
               .pipe(jscs({
                    preset: 'airbnb',
                    validateIndentation: 4
                }))
               .pipe(jshint.reporter('default'));
});

gulp.task('javascript', function() {
    var scripts = [].concat(paths.scripts.libs, paths.scripts.src);

    return gulp.src(scripts)
               .pipe(concat('app.js'))
               .pipe(uglify())
               .pipe(gulp.dest('./www/js'));
});

gulp.task('sass', function() {
    return gulp.src(paths.styles)
               .pipe(sass())
               .pipe(gulp.dest('./www/css'));
});

gulp.task('images', function() {
    return gulp.src(paths.images)
               .pipe(gulp.dest('./www/img'));
});

gulp.task('fonts', function() {
    return gulp.src(paths.fonts)
               .pipe(gulp.dest('./www/fonts'));
});

gulp.task('views:partials', function() {
    return gulp.src(paths.views.partials)
               .pipe(gulp.dest('./www/views'));
});

gulp.task('views:main', function() {
    return gulp.src(paths.views.main)
               .pipe(gulp.dest('./www'));
});

gulp.task('watch', function() {
    var scripts = [].concat(paths.scripts.libs, paths.scripts.src);

    watch(paths.scripts, function() {
        gulp.start('javascript');
    });

    watch(paths.styles, function() {
        gulp.start('sass');
    });

    watch(paths.images, function() {
        gulp.start('images');
    });

    watch(paths.views.main, function() {
        gulp.start('views:main');
    });

    watch(paths.views.partials, function() {
        gulp.start('views:partials');
    });

    watch(paths.fonts, function() {
        gulp.start('fonts');
    });
});

gulp.task('compile', ['javascript', 'sass', 'images', 'fonts', 'views:main', 'views:partials']);

gulp.task('default', ['clean'], function() {
    gulp.start('compile');
});