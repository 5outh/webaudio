module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({

        srcFiles: ["src/**/*.purs", "bower_components/**/src/**/*.purs"],
        psc: {
            options: {
                main: "Main",
                modules: ["Main"]
            },
            all: {
                src: ["<%=srcFiles%>"],
                dest: "dist/Main.js"
            }
        },

        dotPsci: ["<%=srcFiles%>"],


        watch: {
            scripts: {
                files: ["<%=srcFiles%>"],
                tasks: ['default'],
                options: {
                    spawn: false
                }
            }
        }
    });


    grunt.registerTask("default", ["psc:all", "dotPsci"]);
    grunt.loadNpmTasks('grunt-purescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
};