/*
 * Type 'npm install -g grunt-cli' on the
 * command line to install Grunt globaly.
 *
 * and run 'npm install grunt --save-dev' in the
 * main directory to install it for the project.
 */

module.exports = function(grunt) {
  var mainDesc =
    '/*!\n' +
    ' *\n' +
    ' * <%= pkg.name %> - Useful JavaScript functions for JS purists\n' +
    ' *\n' +
    ' * @version v<%= pkg.version %>\n' +
    ' * @link <%= pkg.homepage %>\n' +
    ' * @author Ustym Ukhman <ustym.ukhman@gmail.com>\n' +
    ' * @license <%= pkg.license.type %> License, <%= pkg.license.url %>\n' +
    ' *\n' +
    ' * Date: <%= grunt.template.today("dd-mm-yyyy h:MM:ss TT Z") %>\n' +
    ' */\n\n',

    minDesc =
      '/*!\n' +
      ' * <%= pkg.name %> - Useful JavaScript functions for JS purists\n' +
      ' *\n' +
      ' * @version v<%= pkg.version %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' *\n' +
      ' * Date: <%= grunt.template.today("dd-mm-yyyy h:MM:ss TT Z") %>\n' +
      ' */\n';

  // grunt configuration for this project:
  grunt.initConfig({
    // get data from package.json to 'pkg' object:
    pkg: grunt.file.readJSON('package.json'),

    // containing files options:
    concat: {
      options: {
        // default separator between files:
        separator: '\n\n',
        // comment at the top of the file:
        banner: mainDesc
      },

      dist: {
        // files to concatenate"
        src: [
          'src/var/*.js',     // initialize useful functions for the library
          'src/core/*.js',    // extend and add JavaSript components 
          'src/ajax/*.js',    // object-like AJAX use
          'src/utils.js',     // 'Utils' class implementation
          'src/outro.js'      // end of 'JSUtils'
        ],

        // final file destination:
        dest: 'dist/<%= pkg.name %>.js'
      }
    },

    // minifying options:
    uglify: {
      options: {
        // comment at the top of the file:
        banner: minDesc
      },

      dist: {
        files: {
          // minifyed file name and it's destination (the same of the normal file):
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
//  },

    // QUnit plugin lets you test the project...
//  qunit: {
      // ...by specifying the path of the test runner file(s):
//    files: ['test/*.html']
//  },

    // JSHint helps to detect errors and potential problems in the code:
//  jshint: {
      // list of files to check:
//    files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      // options to override JSHint defaults:
//    options: {
//      globals: {
//        jQuery: true,
//        console: true,
//        module: true,
//        document: true
//      }
//    }
//  },

    // watchs specified files by typing 'grunt watch' on the command line:
//  watch: {
      // same files of the JSHint collection:
//    files: ['<%= jshint.files %>'],
      // it will run this tasks when detects any of the files specified have changed:
//    tasks: ['jshint', 'qunit']
    }
  });

  // it loads here all plugins we need:
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-qunit');
  // grunt.loadNpmTasks('grunt-contrib-jshint');
  // grunt.loadNpmTasks('grunt-contrib-watch');

  /*
   * To install a plugin, open the command line in the main directory
   * and type 'npm install grunt-contrib-<plugin_name> --save-dev'
   */

  // this would be run by typing 'grunt test' on the command line
  grunt.registerTask('test', ['jshint', 'qunit']);
  // the default task will be run by typing 'grunt' on the command line
  grunt.registerTask('default', ['concat', 'uglify']);
};