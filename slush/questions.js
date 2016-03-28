"use strict";

// Helpers
var Util = require('./utils/Util');

//Util.toSentence('-');
module.exports = [
    {
        "name": "projectName",
        "message": "What is the name of your project?",
        "default": "CLIENT.Project"
    },
    {
        "name": "projectSlug",
        "message": "What would you like the slug to be?",
        "default": (answer) => {
            return Util.toSentence(answer.projectName, '-');
        },
        "validate": (answer) => {
            //if (answer.length < 1) {
            //    return 'You must choose at least one topping.';
            //}
            return true;
        }
    },
    {
        "name": "markupBuildSystem",
        "message": "Which markup build system?",
        "choices": [
            {
                "name": "None",
                "value": "none"
            },
            {
                "name": "Includes",
                "value": "includes"
            },
            {
                "name": "Handlebars",
                "value": "handlebars"
            }
        ],
        "default": "handlebars",
        "type": "list"
    },
    {
        "name": "markupFeatures",
        "message": "What markup features would you like?",
        "choices": [
            {
                "name": "Icons",
                "value": "icons"
            },
            {
                "name": "SEO Meta Data",
                "value": "seo"
            },
            {
                "name": "XHTML Strict Doctype (legacy)",
                "value": "xhtml"
            },
            {
                "name": "Imagemin",
                "value": "imagemin"
            }
        ],
        "default": "",
        "type": "checkbox"
    },
    {
        "name": "stylesBuildSystem",
        "message": "Which styles build system?",
        "choices": [
            {
                "name": "None",
                "value": "none"
            },
            {
                "name": "Sass",
                "value": "sass"
            }
        ],
        "default": "sass",
        "type": "list"
    },
    {
        "name": "stylesFeatures",
        "message": "Any additional stylesheets?",
        "choices": [
            {
                "name": "Autoprefixer",
                "value": "autoprefixer",
                "checked": true
            },
            {
                "name": "Print",
                "value": "print"
            },
            {
                "name": "IE9 Conditional",
                "value": "ie9"
            },
            {
                "name": "IE8 Conditional",
                "value": "ie8"
            }
        ],
        "default": "",
        "type": "checkbox"
    },
    {
        "name": "scriptsBuildSystem",
        "message": "Which scripts build system?",
        "choices": [
            {
                "name": "None",
                "value": "none"
            },
            {
                "name": "ES2015 (Babel)",
                "value": "babel"
            },
            {
                "name": "ES2015 (TypeScript)",
                "value": "typescript"
            },
            {
                "name": "RequireJS (legacy)",
                "value": "requirejs"
            }
        ],
        "default": "requirejs",
        "type": "list"
    },
    {
        name: "jsNamespace",
        message: "What JavaScript global variable name would you like?",
        "default": "NERD",
        when: function( answers ) {
            return answers.scriptsBuildSystem === "none";
        },
        type: "input"
    },
    //{
    //    "name": "scriptsFramework",
    //    "message": "Which framework build system?",
    //    "choices": [
    //        {
    //            "name": "None",
    //            "value": "none"
    //        },
    //        {
    //            "name": "StructureJS",
    //            "value": "structurejs"
    //        }
    //    ],
    //    "default": "none",
    //    "type": "list"
    //},
    {
        "name": "precompileJst",
        "message": "Precompile JavaScript Templates?",
        "choices": [
            {
                "name": "No",
                "value": "no"
            },
            {
                "name": "Yes",
                "value": "handlebars"
            }
        ],
        "default": "no",
        "type": "list"
    },
    {
        "name": "scriptsAdditional",
        "message": "Any additional scripts?",
        "choices": [
            {
                "name": "jQuery",
                "value": "jquery"
            },
            {
                "name": "Modernizr",
                "value": "modernizr"
            },
            {
                "name": "Auto Replace",
                "value": "nerdery-auto-replace"
            },
            {
                "name": "External Links",
                "value": "nerdery-external-links"
            },
            {
                "name": "Function Name",
                "value": "nerdery-function-name"
            },
            {
                "name": "Has JS",
                "value": "nerdery-has-js"
            },
            {
                "name": "Request Animation Frame",
                "value": "nerdery-request-animation-frame"
            }
        ],
        "default": "",
        "type": "checkbox"
    },
    {
        "name": "demoBuildSystem",
        "message": "Do you want a demo application?",
        "choices": [
            {
                "name": "No",
                "value": "no"
            },
            {
                "name": "Yes",
                "value": "yes"
            }
        ],
        "default": "no",
        "type": "list"
    },
    {
        "name": "testingBuildSystem",
        "message": "Any testing features?",
        "choices": [
            {
                "name": "JavaScript Unit Testing",
                "value": "testing"
            },
            {
                "name": "3rd-Party Vulnerability Audit",
                "value": "audit"
            }
        ],
        "default": "",
        "type": "checkbox"
    },
    {
        "name": "installerSystem",
        "message": "Do you want installer files?",
        "choices": [
            {
                "name": "No",
                "value": "no"
            },
            {
                "name": "Yes",
                "value": "yes"
            }
        ],
        "default": "yes",
        "type": "list"
    },
    {
        "type": "confirm",
        "name": "moveon",
        "message": "Continue?"
    }
];
