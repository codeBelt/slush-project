/**
 * Application configuration declaration.
 *
 * This configuration file is shared between the website and the build script so
 * that values don't have to be duplicated across environments. Any non-shared,
 * environment-specific configuration should placed in appropriate configuration
 * files.
 *
 * @example
 *     paths: {
 *         'jquery': '../vendor/jquery/jquery',
 *         'jquery-cookie': '../vendor/jquery-cookie/jquery-cookie'
 *     }
 *
 * Shims provide a means of managing dependencies for non-modular, or non-AMD
 * scripts. For example, jQuery UI depends on jQuery, but it assumes jQuery is
 * available globally. Because RequireJS loads scripts asynchronously, jQuery
 * may or may not be available which will cause a runtime error. Shims solve
 * this problem.
 *
 * @example
 *     shim: {
 *         'jquery-cookie': {
 *             deps: ['jquery'],
 *             exports: null
 *          }
 *     }
 */
require.config({ // jshint ignore:line
    paths: {
        // this empty string tells r.js to use single quotes when injecting
        // bower modules automatically. Otherwise it defaults to double quotes.
        'requirejs': '',
        'jquery': '../vendor/jquery/dist/jquery',
        {% if jstBuildSystem != 'no' %}
            'handlebars': '../vendor/handlebars/handlebars',
            'templates': './precompiledJst',
        {% endif %}
    },

    shim: {
        'jquery': {
            exports: '$'
        }
    },

    waitSeconds: 120
});
