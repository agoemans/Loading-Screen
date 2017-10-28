module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect:{
			server:{
				options: {
					port: 8000,
                    base: ['_build', 'node_modules']
				}
			}
		},
		watch: {
			scripts: {
				files: ['js/**/*.js', 'html/*'],
                tasks: ['clean:build', 'uglify:dev', 'copy',]
			}
		},
		uglify: {
			dev: {
				options: {
					mangle: false,
                    beautify: true
				},
				files: {
		            '_build/js/app.js': [
                        'js/timeHelper.js',
                        'js/arc.js',
                        'js/app.js'
                    ]
				}
			}
		},
		copy: {
			assets: {
				files: [
					{expand: true, flatten: true, src: ['assets/images/**'], dest: '_build/assets/images'},
					{expand: true, flatten: true, src: ['assets/css/**'], dest: '_build/assets/css'},
					{expand: true, flatten: true, src: ['assets/data/**'], dest: '_build/assets/data'},
                    {expand: true, flatten: true, src: ['html/index.html'], dest: '_build'}
				]
			}
		},
        clean: {
            build: ["_build/*"],
			tmp: ["tmp/**"]

        }
	});

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('dev', [
    	'clean:build',
        'uglify:dev',
        'copy',
        'connect',
        // 'clean:tmp',
        'watch'
    ]);

};