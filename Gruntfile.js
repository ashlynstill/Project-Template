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
            src: ['src/scripts/lib/jquery/jquery.min.js'],
            dest: 'build/scripts/lib/jquery/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('.min','');
            }
          },
          {
            expand: true,
            src: ['src/scripts/lib/underscore/underscore-min.js'],
            dest: 'build/scripts/lib/underscore/',
            rename: function (dest, src) {
              return dest + src.substring(src.lastIndexOf('/')).replace('-min','');
            }
          },
          { expand: true, flatten: true, src: ['src/data/*'], dest: 'build/data/' }
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
          JQuery: true,
          $: true
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
          'build/scripts/my_js_file.js'   : ['src/scripts/my_js_file.js']
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
          'build/style/app.css': ['src/style/app.css'],
          'build/style/skeleton.css': ['src/style/skeleton.css']
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
      }
    },

    s3: {
      key: "<%= aws.key %>",
      secret: "<%= aws.secret %>",
      bucket: "<%= aws.bucket %>",
      access: "public-read",
      gzip: true,
      debug: false,
      upload: [
        { src: 'build/*.html', dest: '.' },
        { src: 'build/scripts/*', dest: 'scripts/' },
        { src: 'build/scripts/lib/*', dest: 'scripts/lib/' },
        { src: 'build/data/*', dest: 'data/' },
        { src: 'build/style/*', dest: 'style/' }
      ]
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-s3');


  grunt.registerTask('default', ['copy','uglify','cssmin','processhtml', 'htmlmin','s3']);
  grunt.registerTask('build', ['copy','uglify','cssmin','processhtml', 'htmlmin']);
  grunt.registerTask('deploy', ['s3']);
  grunt.registerTask('lint', ['jshint']);
};

