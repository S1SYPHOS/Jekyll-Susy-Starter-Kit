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

    ftpush: {
      build: {
        auth: {
          host: 'srv24.sysproserver.de',
          port: 21,
          authKey: 'elbhannover'
        },
        src: '/home/arch-user/Documents/NewProjects/zak/build',
        dest: '/html/development',
        // exclusions: ['/html/development/img/fav/*.png'],
        keep: ['/html/development/img/*.jpg', '/html/development/img/fav/*.png'],
        simple: false,
        useList: false
      }
    }



      /* UNUSED STUFF

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
      'browserSync',
    	'watch'
    ]);

    grunt.registerTask('build', [
      'sass',
      'jekyll:build',
      'uncss',
      'autoprefixer',
      'csscomb',
      'cssmin:all',
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
