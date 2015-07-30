module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),


    // GENERAL TASKS

    jekyll: {
      options: {
        bundleExec: true,
        config: 'config.yml,config_prod.yml'
      },
      dev: {
        options: {
          config: 'config.yml',
          src: 'source',
          dest: 'build'
        }
      },
      prod: {
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

    watch: {
      sass: {
        files: 'source/_scss/**/*.scss',
        tasks: ['sass', 'autoprefixer', 'penthouse']
      },
      jekyll: {
        files: ['source/**/*.html', 'source/css/*.css', 'source/js/*.js'],
        tasks: ['jekyll:dev', 'modernizr']
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


    // USEMIN SECTION

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
        /* async / defer for generated JS - https://github.com/yeoman/grunt-usemin/issues/391
        blockReplacements: {
          js: function (block){
            return '<script async src='' + block.dest + '' defer=defer><\/script>';
          }
        } */
      },
      html: ['build/**/*.html'],
      // css: ['build/css/**/*.css'],
    },

    concat: { },

    uglify: { },


    // STYLESHEET SECTION

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

    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      dist: {
        expand: true,
        src: '.tmp/concat/css/style.css'
      }
    },

    csscomb: {
      dist: {
        files: {
          '.tmp/concat/css/style.css': '.tmp/concat/css/style.css'
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1,
        // compatibility: 'ie8'
      }
    },

    penthouse: {
      dist: {
        outfile : 'source/_includes/critical.css',
        css : 'source/css/style.css',
        url : 'http://localhost:3000',
        width : 1280,
        height : 800
      }
    },


    // JAVASCRIPT SECTION

    modernizr: {
      dist: {
        'devFile' : 'bower_components/modernizr/modernizr.js',
        'outputFile' : 'build/js/modernizr-custom.js',
        'uglify' : true,
        'parseFiles' : false,
        files: {
          src: [
            'build/js/**/*.js',
            'build/css/style.css',
            'build/*.html'
          ]
        }
      }
    },


    // HTML SECTION

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


    // CODE QUALITY SECTION

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
    }


  });

    grunt.registerTask('dev', [
      'sass',
      'jekyll:dev',
      'modernizr',
      'browserSync',
    	'watch'
    ]);

    grunt.registerTask('prod', [
      'sass',
      'copycss',
      'jekyll:prod',
      'modernizr',
      'useminPrepare',
      'concat',
      'autoprefixer',
      'csscomb',
      'cssmin',
      'uglify',
      'usemin',
      'cacheBust',
      'htmlmin',
      'browserSync',
      'watch'
    ]);

    grunt.registerTask('check', [
      'devUpdate',
      'jekyll:check',
      'scsslint',
      'jshint'
    ]);

    grunt.registerTask('copycss', [
      'copy:loadCSS',
      'copy:OptimizedWebfontLoading'
    ]);

  };
