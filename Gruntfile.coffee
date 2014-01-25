module.exports = (grunt) ->
  
  grunt.initConfig
    coffee: 
      main: 
        files: 
          'dist/changeit.js': 'src/changeit.coffee'
      tests:
        files:
          'test/test.js': 'test/test.coffee'

    uglify:
      all:
        files:
          'dist/changeit.min.js': 'dist/changeit.js'

    qunit:
      all: ['test/index.html']

    watch:
      main: 
        files: ['src/changeit.coffee']
        tasks: ['build']

  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-qunit'

  grunt.registerTask 'build', ['coffee:main', 'uglify:all']
  grunt.registerTask 'test', ['build', 'coffee:tests', 'qunit:all']
  grunt.registerTask 'dist', ['build', 'test'] 
  grunt.registerTask 'default', ['build']