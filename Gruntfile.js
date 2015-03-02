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
      jekyllBuild : {
        command : 'jekyll build --limit_posts <%= limit_posts %>',
        options: {
          stdout: true,
        }
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
          cwd: 'assets',
          src: ['css/*.scss'],
          dest: '_site/assets',
          ext: '.css',

        }]
      }
    },

    watch : {
      sass: {
        files: 'assets/*/*.scss',
        tasks: ['sass'],
      },

      css: {
        files: '_site/assets/css/*.css',
        options: {
          livereload: true
        },
      },

      html: {
        files : [ '_layouts/*.html',
                  '_posts/*.md',
                  '_includes/*/*.html',
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
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask( 'build', [ 'shell:jekyllBuild', 'sass' ] )
  grunt.registerTask('serve', ['build', 'connect:server', 'watch']);

};
