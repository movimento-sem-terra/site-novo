module.exports = function( grunt ) {

  require( 'time-grunt' )( grunt );
  require( 'load-grunt-tasks' )( grunt );

  grunt.initConfig({
    limit_posts: grunt.option('limit_posts') || 0,

    connect: {
      server: {
        options: {
          livereload: true,
          base: '_site/',
          port: 9000,
          hostname: '0.0.0.0',
        }
      }
    },

    shell : {
      options: {
        stdout: true,
        stderr: true,
      },

      jekyllBuild : {
        command : 'jekyll build --limit_posts <%= limit_posts %>',
      },

      sanitizeSass : {
        command : 'ruby -pi.bak -e "gsub(/---\n/, \'\')" assets/css/.sanitized-sass/*.scss',
      },
    },

    sass: {
      dist: {
        options: {
          loadPath: '_sass',
          style: 'compressed',
          cacheLocation: 'assets/css/.sass-cache'
        },
        files: [{
          expand: true,
          cwd: 'assets/css/.sanitized-sass/',
          src: ['*.scss'],
          dest: '_site/assets/css',
          ext: '.css',

        }]
      }
    },

    copy: {
      sassToSanitizedFolder: {
        expand: true,
        cwd: 'assets/css',
        src: '*.scss',
        dest: 'assets/css/.sanitized-sass'
      },
      css: {
        expand: true,
        cwd: 'assets/css',
        src: '*.css',
        dest: '_site/assets/css/'
      },
      js: {
        expand: true,
        cwd: 'assets/js',
        src: '*/*.js',
        dest: '_site/assets/js/'
      }
    },

    clean: {
      sanitizedSassFolder: 'assets/css/.sanitized-sass',
    },

    watch : {
      sass: {
        files: 'assets/css/*.scss',
        tasks: ['genetateStyles'],
      },

      css: {
        files: '_site/assets/css/*.css',
        options: {
          livereload: true
        },
      },
      js: {
        files: 'assets/js/*/*.js',
        tasks: ['copy:js'],
        options: {
          livereload: true
        },
      },

      html: {
        files : [ '_layouts/**.html',
                  '_posts/**.md',
                  '_pages/**/*.html',
                  '_includes/**/*.html',
                  '_data/**/*.yml',
                  '_config.yml',
                  'index.html',
                  '404.html' ],

        tasks : [ 'build' ],
        options: {
          livereload: true
        },
      }

    },

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask( 'build', [ 'shell:jekyllBuild', 'genetateStyles' ] )
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);
  grunt.registerTask('genetateStyles', ['clean:sanitizedSassFolder', 'copy:sassToSanitizedFolder', 'copy:css' , 'shell:sanitizeSass', 'sass']);

};
