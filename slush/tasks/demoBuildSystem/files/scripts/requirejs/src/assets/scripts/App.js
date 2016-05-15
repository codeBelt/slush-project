define(function(require, exports, module) { // jshint ignore:line
    'use strict';

    var $ = require('jquery');
    var DemoView = require('./views/DemoView');

    <% if (jstBuildSystem !== 'no') { %>
        require('templates'); // jshint ignore:line
    <% } %>

    /**
     * Initial application setup. Runs once upon every page load.
     *
     * @class App
     * @constructor
     */
    var App = function() {
        this.init();
    };

    var proto = App.prototype;

    /**
     * Initializes the application and kicks off loading of prerequisites.
     *
     * @method init
     * @private
     */
    proto.init = function() {
        // Create your views here
        // Pass in a jQuery reference to DOM elements that need functionality attached to them
        this.demoView = new DemoView($('.js-demoView'));

        <% if (jstBuildSystem !== 'no') { %>
            var template = window['JST']['templates/jst/GenericModal']();
            console.log(template);
        <% } %>
    };

    return App;

});
