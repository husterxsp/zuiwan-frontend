var gulp = require('gulp');
var load = require('gulp-load-plugins')();

gulp.task('html', function() {
    gulp.src('src/tpl/*.html')
        .pipe(load.sourcemaps.init())
        .pipe(load.htmlmin({collapseWhitespace: true}))
        .pipe(load.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/tpl'))
});

gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(load.csso())
        .pipe(gulp.dest('dist/css'))
    gulp.src('src/less/*.less')
        .pipe(load.sourcemaps.init())
        .pipe(load.less())
        // .pipe(load.postcss([ load.autoprefixer() ]))
        .pipe(load.csso())
        .pipe(load.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
    gulp.src('src/less/main/*.less')
        .pipe(load.sourcemaps.init())
        .pipe(load.less())
        // .pipe(load.postcss([ load.autoprefixer() ]))
        .pipe(load.csso())
        .pipe(load.concat('main.css'))
        .pipe(load.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(load.sourcemaps.init())
        .pipe(load.jshint())
        .pipe(load.uglify())
        .pipe(load.concat('build.js'))
        .pipe(load.sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'))
    gulp.src('src/lib/*.js')
        .pipe(load.jshint())
        .pipe(load.uglify())
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('font', function() {
    gulp.src('src/font/*')
        .pipe(gulp.dest('dist/font'))
});

gulp.task('img', function() {
    gulp.src('src/img/*')
    .pipe(load.imagemin())
    .pipe(gulp.dest('dist/img'))
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(load.clean());
});

gulp.task('build', ['html', 'css', 'js', 'font', 'img']);

gulp.task('watch', function () {
    gulp.watch('src/tpl/*.html', ['html']);
    gulp.watch(['src/css/*', 'src/less/**'], ['css']);
    gulp.watch(['src/js/*.js', 'src/lib/*.js'], ['js']);
    gulp.watch('src/font/*', ['font']);
    gulp.watch('img', ['img']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
