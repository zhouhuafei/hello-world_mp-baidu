/*
1. 关于.wxml后缀：我本想使用.html后缀进行开发，但是本项目要拷贝另外一个项目，另外一个项目是.wxml后缀，所以我就保留了.wxml后缀
*/
const gulp = require('gulp');
const gulpRename = require('gulp-rename');
const plumber = require('gulp-plumber'); // 报错就中断？使用这个处理一下即可。
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

gulp.task('dev-json', function () {
    gulp.src('src/**/*.json')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev-wxml', function () {
    gulp.src('src/**/*.wxml')
        .pipe(plumber())
        .pipe(gulpRename((path) => {
            path.extname = '.swan';
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev-css', function () {
    gulp.src('src/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulpRename((path) => {
            path.extname = '.css';
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev-js', function () {
    gulp.src('src/**/*.js')
        .pipe(plumber())
        .pipe(gulp.dest('dist/'));
});

gulp.task('dev-img', function () {
    gulp.src('src/images/**/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('dev-fonts', function () {
    gulp.src('src/fonts/**/*.*')
        .pipe(plumber())
        .pipe(imagemin())
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.json', ['dev-json']);
    gulp.watch('src/**/*.wxml', ['dev-wxml']);
    gulp.watch('src/**/*.scss', ['dev-css']);
    gulp.watch('src/**/*.js', ['dev-js']);
    gulp.watch('src/images/**/*.*', ['dev-img']);
    gulp.watch('src/fonts/**/*.*', ['dev-fonts']);
});

gulp.task('dev', function () {
    gulp.start('dev-json', 'dev-wxml', 'dev-css', 'dev-js', 'dev-img', 'dev-fonts', 'watch');
});
