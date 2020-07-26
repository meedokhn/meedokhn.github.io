module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass']
			},
			svg: {
				files: ['src/icons/*.svg'],
				tasks: ['shell']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify']
			}
		},
		shell: {
			command: ["node_modules/icon-font-generator/bin/icon-font-generator ./src/icons/*.svg -o ./public/assets/fonts --csspath ./public/assets/css/icons.css --height 1200 --types 'ttf, woff2, woff'"].join('&&')
		},
		sass: {
			dev: {
				files: {
					'public/assets/css/main.css': 'src/scss/main.scss'
				},
				options: {
					sourcemap: 'none',
					style: 'compressed',
					cacheLocation: 'node_modules/.sass-cache'
				}
			}
		}, 
		uglify: {
			options: {
				mangle: false
			},
			main: {
				files: {
					'public/js/main.min.js': ['src/js/main.js']
				}
			}
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'src/css/*.css',
						'src/*.js',
						'**/*.html'
					]
				},
				options: {
					watchTask: true
				}
			}
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// define default task
	grunt.registerTask('default', ['browserSync', 'watch']);
};