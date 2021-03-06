const gulp = require('gulp');
const requireDir = require('require-dir');
const runSequence = require('run-sequence');
const argv = require('yargs').argv;
const gulpIf = require('gulp-if');
const uglify = require('gulp-uglify');
const useref = require('gulp-useref');
const header = require('gulp-header');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
{% if mockDataSystem == 'jsonServer' %} const jsonServer = require('json-server'); {% endif %}

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

global.reloadBrowser = browserSync.reload;

/**
 * Determines the build mode. Default will be read from the env file but can be overridden with a flag.
 * Flags are: --dev , --prod
 */
if (argv.prod === true || argv.dev === true) {
    global.isProd = !!argv.prod;
    global.isDev = !!argv.dev;
} else {
    global.isProd = (env.BUILD_MODE === 'prod');
    global.isDev = (env.BUILD_MODE === 'dev');
}

// -- Tasks ----------------------------------------------------------------
/**
 * Run default tasks for the target environment.
 *
 * @task default
 */
gulp.task('default', (done) => {
    runSequence(
        (isDev === true)    ? ['lint', 'build'] :
        (isProd === true)   ? ['build'] : [],
        done
    );
});

/**
 * Compile source code and outputs to destination.
 *
 * @task build
 */
gulp.task('build', (done) => {
    const tasks = [
        ['clean:dest'],
        ['buildStatic', 'buildMarkup', 'buildStyles', 'buildScripts' {% if jstBuildSystem != 'no' %}, 'buildJST'{% endif %}]
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
        .pipe(gulpIf('*.js', uglify({
            mangle: false,
            preserveComments: 'license'
        })))
        .pipe(gulpIf('*.css', cleanCSS()))
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

{% if testingBuildSystem.indexOf('testing') >= 0 %}
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
{% endif %}

{% if markupFeatures.indexOf('imagemin') >= 0 %}
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
{% endif %}

/**
 * Start a web server and reloads the browser file changes.
 *
 * @task watch
 * @options --open
 */
gulp.task('watch', (done) => {
    {% if mockDataSystem == 'jsonServer' %}
        // Mock data
        const jsonServerFakerData = require(`./${env.DIR_DEST}/db.js`);
        // JSON Server setup
        const server = jsonServer.create();
        server.use(jsonServer.defaults());
        server.use(jsonServer.router(jsonServerFakerData));
    {% endif %}

    // BrowserSync setup
    browserSync.init({
        notify: false,
        injectChanges: true,
        open: (argv.open === true),
        server: {
            baseDir: env.DIR_DEST
        }
    }, (err, bs) => {
        if (err) { console.warn(err); }
        {% if mockDataSystem == 'jsonServer' %}
            // Add JSON Server as a middleware to BrowserSync
            bs.app.use('/api', server);
        {% endif %}
    });

    // Watch and trigger tasks on file changes
    gulp.watch(env.DIR_SRC + '/assets/scripts/**/*', ['buildScripts']);
    gulp.watch(env.DIR_SRC + '/assets/styles/**/*', ['buildStyles']);
    gulp.watch(env.DIR_SRC + '/**/*.{hbs,html}', ['buildMarkup']);
    gulp.watch(env.DIR_SRC + '/templates/jst/**/*', ['buildJST']);
    gulp.watch([env.DIR_SRC + '/assets/{media,data}/**/*'{% if mockDataSystem == 'jsonServer' %}, env.DIR_SRC + '/db.*'{% endif %}], ['buildStatic']);
});

/**
 * Helper task to builds and then watches files.
 * Same as doing "gulp && gulp watch"
 *
 * @task launch
 */
gulp.task('launch', (done) => {
    runSequence(
        ['default'],
        ['watch'],
        done
    );
});
