'use strict';

const gulp = require('gulp');
const template = require('gulp-template');

module.exports = (answers) => {
    if (answers.demoBuildSystem === 'no') { return null; }

    const jsType = answers.scriptsBuildSystem;
    const jsSourcePaths = __dirname + '/files/scripts/' + jsType + '/**/*';
    const testingSourcePaths = __dirname + '/files/__tests__/' + jsType + '/**/*';

    const stylesType = answers.stylesBuildSystem;
    const stylesSourcePaths = __dirname + '/files/styles/' + stylesType + '/**/*';

    const devDependencies = ['gulp', 'jquery'];
    const bowerDependencies = ['jquery'];

    // Gulp task
    gulp.task('demoBuildSystem', (done) => {
        gulp
            .src([
                jsSourcePaths,
                testingSourcePaths,
                stylesSourcePaths
            ])
            .pipe(template(answers))
            .pipe(gulp.dest('./'))
            .on('end', done);
    });

    // Return data
    return {
        taskName: 'demoBuildSystem',
        devDependencies: devDependencies,
        bowerDependencies: bowerDependencies
    };
};
