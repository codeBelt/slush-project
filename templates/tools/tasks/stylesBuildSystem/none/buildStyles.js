var gulp = require('gulp');

gulp.task('buildStyles', function (done) {
    gulp
        .src(env.DIR_SRC + '/assets/styles/**/*.css')
        .pipe(gulp.dest(env.DIR_DEST + '/assets/styles/'))
        .on('end', function () {
            done();
        });
});
