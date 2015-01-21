module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('config/aws.json'),
    copy: {
      target: {
        files: [
          {
            expand: true,
            src: ['bower/jquery/dist/jquery.min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('.min','');
            }
          },
          {
            expand: true,
            src: ['bower/underscore/underscore-min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('-min','');
            }
          },
          {
            expand: true,
            src: ['bower/backbone/backbone-min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('-min','');
            }
          },
          {
            expand: true,
            src: ['bower/d3/d3.min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('.min','');
            }
          },
          {
            expand: true,
            src: ['bower/d3bb/build/d3bb.min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('.min','');
            }
          },
          {
            expand: true,
            src: ['bower/foundation/js/foundation.min.js'],
            dest: 'build/scripts/lib/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('.min','');
            }
          },
          {
            expand: true,
            flatten: true,
            src: [
              'src/scripts/lib/underscore.js',
              'src/scripts/lib/json2.js',
              'src/scripts/lib/flatpage_stubs.js'
            ],
            dest: 'build/scripts/lib/'
          },
          { expand: true, flatten: true, src: ['bower/foundation/css/foundation.css'], dest: 'build/style/' },
          { expand: true, flatten: true, src: ['src/data/*'], dest: 'build/data/' },
          { expand: true, flatten: true, src: ['src/images/*'], dest: 'build/images/' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomer/*'], dest: 'build/style/fonts/boomer/' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomer_cond/*'], dest: 'build/style/fonts/boomer_cond/' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomer_extracond/*'], dest: 'build/style/fonts/boomer_extracond/' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomerslab/*'], dest: 'build/style/fonts/boomerslab/' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomerslab_cond*'], dest: 'build/style/fonts/boomerslab_cond' },
          { expand: true, flatten: true, src: ['src/style/fonts/boomerslab_extracond/*'], dest: 'build/style/fonts/boomerslab_extracond/' },
          { expand: true, flatten: true, src: ['src/style/fonts/publico/*'], dest: 'build/style/fonts/publico/' },
          { expand: true, flatten: true, src: ['bower/modernizr/modernizr.js'], dest: 'build/scripts/lib/' },
          { expand: true, flatten: true, src: ['src/scripts/lib/flatpage_stubs.js'], dest: 'build/scripts/lib/' },
          { expand: true, flatten: true, src: ['src/robots.txt'], dest: 'build/' }
        ]
      }
    },

    jshint: {
      files: [
        'src/scripts/*.js'
      ],
      options: {
        browser: true,
        curly: true,
        eqeqeq: true,
        latedef: true,
        undef: true,
        unused: true,
        trailing: true,
        smarttabs: true,
        indent: 2,
        globals: {
          jQuery: true,
          $: true,
          _: true
        }
      }
    },

    uglify: {
      options: {
        mangle: { except: ['d3', '_','$'] },
        compress: true,
        report: 'gzip'
      },
      my_target: {
        files: {
          'build/scripts/main.js'   : ['src/scripts/main.js']
        }
      }
    },

    processhtml: {
      options: {
        process: true,
        strip: true
      },
      build: {
        files: {
          'tmp/index.html': ['src/index.html']
        }
      }
    },

    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapsWhitespace: true,
          useShortDoctype: true
        },
        files: {
          'build/index.html'    : 'tmp/index.html'
        }
      }
    },

    cssmin: {
      compress: {
        options: {
          report: 'gzip'
        },
        files: {
          'build/style/app.css'       : ['src/style/app.css'],
          'build/style/fonts.css'     : ['src/style/fonts.css'],
          'build/style/normalize.css' : ['src/style/normalize.css'],
          'build/style/foundation.css': ['src/style/foundation.css']
        }
      }
    },

    imagemin: {
      jpg: {
        options: { progressive: true },
        files: [{
          expand: true,
          cwd: "src/images",
          src: ["*.jpg"],
          dest: "build/images"
        }]
      },
      png: {
        options: { optimizationLevel: 3 },
        files: [{
          expand: true,
          cwd: "src/images",
          src: ["*.png"],
          dest: "build/images"
        }]
      },
      gif: {
        options: { interlaced: true },
        files: [{
          expand: true,
          cwd: "src/images",
          src: ["*.gif"],
          dest: "build/images"
        }]
      },
      svg: {
        options: {
          removeViewBox: false,
          removeEmptyAttrs: false
        },
        files: [{
          expand: true,
          cwd: "src/images",
          src: ["*.svg"],
          dest: "build/images"
        }]
      }
    },

    s3: {
      options: {
        accessKeyId: "<%= aws.key %>",
        secretAccessKey: "<%= aws.secret %>",
        bucket: "<%= aws.bucket %>",
        access: "public-read",
        gzip: true,
        cache: false
      },
      build: {
        cwd: "build/",
        src: "**"
      }
    },

    bowercopy: {
      options: {
        // clean: true,
        runBower: true,
        report: true
      },
      test: {
        options: {
          destPrefix: 'test'
        },
        files: {
          "boot.js": "jasmine/lib/jasmine-core/boot.js",
          "console.js": "jasmine/lib/console/console.js",
          "jasmine-html.js": "jasmine/lib/jasmine-core/jasmine-html.js",
          "jasmine.css": "jasmine/lib/jasmine-core/jasmine.css",
          "jasmine.js": "jasmine/lib/jasmine-core/jasmine.js",
          "jasmine_favicon.png": "jasmine/images/jasmine_favicon.png",
          "sinon.js": "sinon/lib/sinon.js"
        }
      },
      lib_scripts: {
        options: {
          destPrefix: 'src/scripts/lib'
        },
        files: {
          "jquery.js": "jquery/dist/jquery.js",
          "underscore.js": "underscore/underscore.js",
          "json2.js": "json2/json2.js",
          "backbone.js": "bower/backbone/backbone.js",
          "d3.js": "bower/d3/d3.min.js",
          "d3bb.js": "bower/d3bb/build/d3bb.js",
          "modernizr.js": "modernizr/modernizr.js",
          "foundation.js": "bower/foundation/js/foundation.js",
        }
      },
      lib_style: {
        options: {
          destPrefix: 'src/style'
        },
        files: {
          "foundation.css": "bower/foundation/css/foundation.css"
        }
      }
    },

    express: {
      dev: {
        options: {
          hostname: '*',
          port: 8000,
          bases: 'src',
          livereload: true,
          showStack: true
        }
      },
      test: {
        options: {
          hostname: '*',
          port: 8080,
          bases: '.',
          livereload: true
        }
      }
    },

    open: {
      dev: {
        path: 'http://localhost:<%= express.dev.options.port %>',
        app: "Google Chrome"
      },
      test: {
        path: 'http://localhost:<%= express.test.options.port %>/SpecRunner.html'
      }
    },

    watch: {
      dev: {
        files: ['src/index.html','src/scripts/*.js','src/style/**/*.css'],
        options: {
          livereload: true
        }
      },
      test: {
        files: ['src/index.html','src/scripts/*.js','spec/*.js'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-aws');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['bowercopy','copy','uglify','cssmin','processhtml', 'htmlmin','s3']);
  grunt.registerTask('build', ['bowercopy','copy','uglify','cssmin','processhtml', 'htmlmin']);
  grunt.registerTask('deploy', ['s3']);
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('server', ['express:dev','open:dev','watch:dev','express-keepalive']);
  grunt.registerTask('server:test', ['express:test','open:test','watch:test','express-keepalive']);
};

