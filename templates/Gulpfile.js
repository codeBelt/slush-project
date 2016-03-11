var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var argv = require('yargs').argv;
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var plugin = require('gulp-load-plugins')();

// Uncomment the next line to report the Gulp execution time (for optimization, etc)
//require('time-require');

// Pulling in all tasks from the tasks folder
requireDir('./tools/tasks', { recurse: true });

argv.prod = !!argv.prod;

global.pkg = require('./package.json');
global.env = require('./build-env');

// A code block that will be added to our minified code files.
// Gets the name and appVersion and other info from the above loaded 'package.json' file.
global.banner = [
    '/*',
    ' * THIS FILE HAS BEEN GENERATED BY AN AUTOMATED TOOL.',
    ' * DO NOT MODIFY DIRECTLY. INSTEAD, MODIFY THE APPROPRIATE SOURCE CODE.',
    ' *',
    ' * <%= pkg.name %> v<%= pkg.version %>',
    ' * <%= pkg.description %>',
    ' * Development By: <%= pkg.developedBy %>',
    ' * Build Date: <%= new Date() %>',
    ' */',
    ''
].join('\n');


//https://knpuniversity.com/screencast/gulp
//https://markgoodyear.com/2014/01/getting-started-with-gulp/
//http://fettblog.eu/gulp-4-parallel-and-series/
//https://www.browsersync.io/docs/gulp/
//https://github.com/ryanbenson/Harvest/blob/master/gulpfile.js

//https://css-tricks.com/gulp-for-beginners/


gulp.task('default', function() {
    runSequence(
        ['buildScripts', 'buildMarkup', 'buildStyles']
    );

    //if (argv.prod === true) {
    //    runSequence(
    //        'clean',
    //        ['buildTypeScript', 'precompileJst', 'buildStyles', 'buildMarkup'],
    //        'usemin'
    //    );
    //} else {
    //    runSequence(
    //        'clean',
    //        ['buildTypeScript', 'precompileJst', 'buildStyles', 'buildMarkup'],
    //        ['connectHttp', 'watch']
    //    );
    //}
});

gulp.task('serve', ['default'], function() {
    browserSync.init({
        injectChanges: true,
        server: {
            open: true,
            baseDir: env.DIR_DEST
        }
    });
});

gulp.task('watch', function() {
    gulp.watch(env.DIR_SRC + '/assets/scripts/**/*.ts', ['buildScripts']);
    gulp.watch(env.DIR_SRC + '/assets/scss/**/*.scss', ['buildStyles']);
    gulp.watch(env.DIR_SRC + '/**/*.hbs', ['buildMarkup']);
});

/*
 gulp.task('usemin', function() {
 return gulp
 .src(env.DIR_DEST + '/!*.html')
 .pipe(plugin.usemin({
 css:    [plugin.minifyCss()],
 html:   [plugin.minifyHtml({ empty: true }) ],
 js:     [plugin.uglify()],
 vendor: [plugin.uglify()]
 }))
 .pipe(plugin.header(banner, { pkg : pkg } ))
 .pipe(gulp.dest(env.DIR_DEST));
 });
 */
