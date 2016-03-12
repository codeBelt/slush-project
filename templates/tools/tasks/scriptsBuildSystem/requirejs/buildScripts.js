const gulp = require('gulp');
const argv = require('yargs').argv;
const requirejs = require('gulp-requirejs');

gulp.task('buildScripts', (done) => {
    gulp
        .src(env.DIR_SRC + '/**/*.js')
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);

    /*requirejs({
        baseUrl: env.DIR_SRC + '/assets/scripts/main.js',
        out: env.DIR_DEST+ '/assets/scripts/',
        shim: {
            // standard require.js shim options
        }
        // ... more require.js options
    })
        .pipe(gulp.dest(env.DIR_DEST + '/assets/scripts/'))
     .on('end', done);*/
});
