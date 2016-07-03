module.exports = function(grunt) {

  'use strict';

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // CONFIGURABLE PATHS
    config: {
      source: 'source',
      dest: 'build'
    },


    // GENERAL TASKS

    jekyll: {
      options: {
        bundleExec: true,
        config: '_config.yml,_config_prod.yml'
      },
      dev: {
        options: {
          config: '_config.yml',
          src: '<%= config.source %>',
          dest: '<%= config.dest %>'
        }
      },
      prod: {
        options: {
          src: '<%= config.source %>',
          dest: '<%= config.dest %>'
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
            '<%= config.dest %>/*.html',
            '<%= config.dest %>/css/*.css',
            '<%= config.dest %>/js/*.js',
            '<%= config.source %>/img/**/*.{jpg,png,svg,gif}'
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: '<%= config.dest %>'
          }
        }
      }
    },

    watch: {
      sass: {
        files: '<%= config.source %>/_scss/**/*.scss',
        tasks: ['sass', 'postcss:dev', 'penthouse']
      },
      jekyll: {
        files: ['Gruntfile.js', '<%= config.source %>/**/*.{html,md,js}'],
        tasks: ['jekyll:dev']
      }
    },

    copy: {
      OptimizedWebfontLoading: {
        files: {
          '<%= config.source %>/_includes/fontloader.js': 'bower_components/OptimizedWebfontLoading/build/fontloader.js'
        }
      },
      loadCSS: {
        files: {
          '<%= config.source %>/_includes/loadCSS.js': 'bower_components/loadcss/loadCSS.js'
        }
      },
      jQuery: {
        files: {
          '<%= config.source %>/js/vendor/jquery.js': 'bower_components/jquery/dist/jquery.js'
        }
      },
      normalize: {
        files: {
          '<%= config.source %>/_scss/vendor/_normalize.scss': 'bower_components/normalize.css/normalize.css'
        }
      },
    },


    // USEMIN SECTION

    useminPrepare: {
      options: {
        dest: '<%= config.dest %>',
        // staging: '<%= config.source %>/_tmp'
      },
      html: '<%= config.dest %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: '<%= config.dest %>',
        /* async / defer for generated JS - https://github.com/yeoman/grunt-usemin/issues/391
        blockReplacements: {
          js: function (block){
            return '<script async src='' + block.dest + '' defer=defer><\/script>';
          }
        } */
      },
      html: ['<%= config.dest %>/**/*.html'],
      // css: ['<%= config.dest %>/css/**/*.css'],
    },

    concat: { },

    uglify: { },


    // STYLESHEET SECTION

    sass: {
      options: {
        // includePaths: ['some/other/path']
      },
      dist: {
        files: {
          '.tmp/css/style.css': '<%= config.source %>/_scss/style.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions, > 2%, ie >= 8, Firefox ESR, Opera 12.1'}),
          require('css-mqpacker')()
        ]
      },
      dev: {
        src: '.tmp/css/style.css',
        dest: '<%= config.dest %>/css/style.css'
      },
      prod: {
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
        outfile : '<%= config.source %>/_includes/critical.css',
        css : '.tmp/css/style.css',
        url : 'http://localhost:3000',
        width : 1280,
        height : 800
      }
    },


    // JAVASCRIPT SECTION

    modernizr: {
      dist: {
        'devFile' : 'bower_components/modernizr/modernizr.js',
        'outputFile' : '<%= config.dest %>/js/modernizr-custom.js',
        'uglify' : true,
        'parseFiles' : false,
        files: {
          src: [
            '<%= config.dest %>/js/**/*.js',
            '<%= config.dest %>/css/style.css',
            '<%= config.dest %>/*.html'
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
          cwd: '<%= config.dest %>',
          src: '**/*.html',
          dest: '<%= config.dest %>'
        }]
      }
    },

    cacheBust: {
      assets: {
        options: {
          length: 8,
          deleteOriginals: true,
          // ignorePatterns: ['.png', '.jpg', '.ico'],
          baseDir: '<%= config.dest %>',
          assets: ['css/*', 'js/*']
        },
        src: ['<%= config.dest %>/**/*.html']
      }
    },


    // CODE QUALITY SECTION

    scsslint: {
      options: {
        bundleExec: true,
        colorizeOutput: true,
        config: '.scss-lint.yml',
      },
      check: '<%= config.source %>/_scss/*.scss'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      check: ['Gruntfile.js', '<%= config.source %>/js/*.js'],
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
      'postcss:dev',
      'browserSync',
    	'watch'
    ]);

    grunt.registerTask('prod', [
      'sass',
      'jekyll:prod',
      'modernizr',
      'useminPrepare',
      'concat',
      'postcss:prod',
      'csscomb',
      'cssmin',
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

  };
