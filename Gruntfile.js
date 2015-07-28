'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  // require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // GENERAL TASKS

    jekyll: {
      options: {
        bundleExec: true,
        config: 'config.yml'
      },
      build: {
        options: {
          src: 'source',
          dest: 'build'
        }
      },
      check: {
        options: {
          doctor: true
        }
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src : [
            'build/css/*.css',
            'build/js/*.js',
            'build/*.html'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: 'build'
          }
        }
      }
    },

    copy: {
      OptimizedWebfontLoading: {
        files: {
          'source/_includes/fontloader.js': 'bower_components/OptimizedWebfontLoading/build/fontloader.js'
        }
      },
      loadCSS: {
        files: {
          'source/_includes/loadCSS.js': 'bower_components/loadcss/loadCSS.js'
        }
      }
    },

    watch: {
      sass: {
        files: 'source/_scss/**/*.scss',
        tasks: ['sass']
      },
      jekyll: {
        files: ['source/**/*.html', 'source/css/*.css', 'source/js/*.js'],
        tasks: ['jekyll:build']
      }
    },


    // STYLESHEET PROCESSING

    sass: {
      options: {
        includePaths: ['bower_components/normalize.css']
      },
      dist: {
        files: {
          'source/css/style.css': 'source/_scss/style.scss'
        }
      }
    },

    uncss: {
      dist: {
        options: {
          // ignoreSheets : [/fonts.googleapis/],
          // ignore: ['.some-selector', '#some-id']
        },
        files: {
          'build/css/style.css': 'build/*.html'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        src: 'build/css/style.css'
      }
    },

    csscomb: {
      dist: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        // compatibility: 'ie8'
      },
      dist: {
        files: {
          'build/css/style.css': 'build/css/style.css'
        }
      }
    },


    // HTML PROCESSING

    useminPrepare: {
      options: {
        dest: 'build',
        // staging: 'source/_tmp'
      },
      html: 'build/index.html'
    },

    usemin: {
      options: {
        assetsDirs: 'build',
        /* async / defer for generated JS:
        blockReplacements: {
          js: function (block){
            return '<script async src="' + block.dest + '" defer=defer><\/script>';
          }
        } */
      },
      html: ['build/**/*.html'],
      // css: ['build/css/**/*.css'],
    },

    concat: {
      // options: {
      //   separator: ';'
      // }
    },

    uglify: {
      // options: {
      //   mangle: false
      // }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true
        },
        files: [{
          expand: true,
          cwd: 'build',
          src: '**/*.html',
          dest: 'build'
        }]
      }
    },

    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8,
        deleteOriginals: true,
        // ignorePatterns: ['.png', '.jpg', '.ico'],
        baseDir: 'build'
      },
      assets: {
        files: [{
            src: ['build/**/*.html']
          }]
        }
    },


    // UP2DATENESS + CODE QUALITY

    scsslint: {
      options: {
        bundleExec: true,
        colorizeOutput: true,
        config: '.scss-lint.yml',
        // exclude: ['path/to/file.scss']
      },
      check: 'source/_scss/**/*.scss'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      check: ['Gruntfile.js', 'source/js/*.js'],
    },

    devUpdate: {
      check: {
        options: {
          reportUpdated: false,
          updateType: 'prompt'
        }
      }
    },





    modernizr: {
      dist: {
        "devFile" : "bower_components/modernizr/modernizr.js",
        "outputFile" : "build/js/modernizr-custom.js",
        // Based on default settings on http://modernizr.com/download/
        "extra" : {
            "shiv" : true,
            "printshiv" : false,
            "load" : true,
            "mq" : false,
            "cssclasses" : true
        },
        // Based on default settings on http://modernizr.com/download/
        "extensibility" : {
          "addtest" : false,
          "prefixed" : false,
          "teststyles" : false,
          "testprops" : false,
          "testallprops" : false,
          "hasevents" : false,
          "prefixes" : false,
          "domprefixes" : false,
          "cssclassprefix": ""
        },
        // By default, source is uglified before saving
        "uglify" : true,
        // Define any tests you want to implicitly include.
        "tests" : [],
        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        "parseFiles" : false,
        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        files: {
          src: [
            'build/js/**/*.js',
            'build/css/style.css',
          ]
        },
        // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
        // "handler": function (tests) {},

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        "matchCommunityTests" : false,
        // Have custom Modernizr tests? Add paths to their location here.
        "customTests" : []
        }
      }








      /* UNUSED STUFF

      processhtml: {
        dist:{
          options: {
            process: true,
          },
          files: [
          {
            expand: true,
            cwd: 'build',
            src: ['*.html'],
            dest: 'build/',
            ext: '.html'
          },
          ],
        }
      },

      dataUri: {
        dist: {
          src: ['source/css/style.css'],
          dest: 'source/css',
          options: {
            target: ['source/img/*.*'],
            fixDirLevel: true,
            maxBytes : 5000
          }
        }
      },

      concurrent: {
        step1: ['jekyll:serve', 'dev']
      },

      shell: {
        gzip: {
            command: 'gzip -9 build/css/style.css && mv build/css/style.css.gz build/css/style.gz.css'
        },
        server: {
            command: 'cd build && ruby server.rb'
        }
      },

*/

    });

    grunt.registerTask('dev', [
      'sass',
      'jekyll:build',
      'modernizr',
      'browserSync',
    	'watch'
    ]);

    grunt.registerTask('build', [
      'sass',
      'jekyll:build',
      'uncss',
      'modernizr',
      'autoprefixer',
      'csscomb',
      'cssmin',
      'useminPrepare',
      'concat',
      'uglify',
      'usemin',
      'cacheBust',
      'htmlmin'
    ]);

    grunt.registerTask('check', [
      'devUpdate',
      'jekyll:check',
      'scsslint',
      'jshint'
    ]);

    grunt.registerTask('stage', [
      'copy:loadCSS',
      'copy:OptimizedWebfontLoading'
    ]);

  };
