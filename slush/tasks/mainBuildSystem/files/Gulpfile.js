const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const browserSync = require('browser-sync').create();
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const header = require('gulp-header');
const del = require('del');
const install = require('gulp-install');


/**
 * Uncomment the next line to report the Gulp execution time (for optimization, etc)
 */
//require('time-require');

/**
 * Pulling in all tasks from the tasks folder
 */
requireDir('./tools/tasks', {
    recurse: true
});

/**
 * Setup global variables to use across tasks
 */
global.pkg = require('./package.json');
global.env = require('./build-env.js');

/**
 * All builds are considered to be production builds, unless they're not.
 */
global.isProd = !!argv.prod;
global.isStage = !!argv.stage;
global.isDev = !!argv.dev;

global.isProd = (isStage === false && isDev === false);

/**
 * A code block that will be added to the minified code files.
 */
global.banner = require('./banner.js')(pkg);

// -- Tasks ----------------------------------------------------------------
/**
 * Run default tasks for the target environment.
 *
 * @task default
 */
gulp.task('default', (done) => {
    runSequence(
        // Ran `gulp --dev`
        (isDev === true) ? ['build'] :
        // Ran `gulp --stage`
        (isStage === true) ? ['lint', 'build'] :
        // Ran `gulp --prod`
        (isProd === true) ? ['lint', 'build'] : [],
        done
    );
});

/**
 * Cleaning tasks
 *
 * @task clean:*
 */
gulp.task('clean:dest', (done) => {
    return del(env.DIR_DEST);
});

gulp.task('clean:docs', (done) => {
    return del(env.DIR_DOCS);
});

gulp.task('clean:minify', (done) => {
    return del(env.DIR_DOCS);
});

gulp.task('clean:installed', (done) => {
    return del([
        'tools/node-*',
        env.DIR_BOWER,
        env.DIR_NPM
    ]);
});

/**
 * Compile source code and outputs to destination.
 *
 * @task build
 */
gulp.task('build', (done) => {
    const tasks = [
        ['clean:dest'],
        ['buildStatic', 'buildMarkup', 'buildStyles', 'buildScripts' <% if (jstBuildSystem !== "no") { %>, 'buildJST'<% } %> ]
    ];

    if (isProd === true) {
        tasks.push(['minify']);
        tasks.push(['clean:minify']);
    }

    runSequence(...tasks, done);
});

/**
 * Minify source code.
 *
 * @task minify
 */
gulp.task('minify', (done) => {
    gulp
        .src(env.DIR_DEST + '/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cleanCSS()))
        .pipe(gulpIf('**/*.{css,js}', header(banner)))
        .pipe(gulp.dest(env.DIR_DEST))
        .on('end', done);
});

/**
 * Generate documentation.
 *
 * @task docs
 */
gulp.task('docs', (done) => {
    runSequence(
        ['clean:docs'],
        ['buildDocs'],
        done
    );
});

/**
 * Validate code syntax.
 *
 * @task lint
 */
gulp.task('lint', (done) => {
    runSequence(
        ['lintScripts'],
        done
    );
});

/**
 * Unit tests the code.
 *
 * @task test
 */
gulp.task('test', (done) => {
    runSequence(
        ['testScripts'],
        done
    );
});

/**
 * Installs the NPM and Bower modules.
 *
 * @task install
 */
gulp.task('install', (done) => {
    return gulp
        .src(['./*.json'])
        .pipe(install());
});

/**
 * TODO:
 *
 * @task serve
 * @options --open
 */
gulp.task('serve', (done) => {
    browserSync.init({
        injectChanges: true,
        open: (argv.open === true),
        server: {
            baseDir: env.DIR_DEST
        }
    });
});

<% if (markupFeatures.indexOf('imagemin') >= 0) { %>
    /**
     * Optimizes images.
     *
     * @task optimize
     */
    gulp.task('optimize', (done) => {
        runSequence(
            ['optimizeStatic'],
            done
        );
    });
<% } %>

/**
 * Watch tasks
 *
 * @task watch
 */
gulp.task('watch', (done) => {
    gulp.watch(env.DIR_SRC + '/assets/scripts/**/*', ['buildScripts']);
    gulp.watch(env.DIR_SRC + '/assets/scss/**/*', ['buildStyles']);
    gulp.watch(env.DIR_SRC + '/**/*.{hbs,html}', ['buildMarkup']);
    gulp.watch(env.DIR_SRC + '/templates/jst/**/*', ['buildJST']);
    gulp.watch(env.DIR_SRC + '/assets/media/**/*', ['buildStatic']);
});
