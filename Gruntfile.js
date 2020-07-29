module.exports = function (grunt) {
	grunt.initConfig({
		watch: {
			css: {
				files: ['src/scss/**/*.scss'],
				tasks: ['sass:dev']
			},
			svg: {
				files: ['src/icons/*.svg'],
				tasks: ['shell']
			},
			js: {
				files: ['src/js/**/*.js'],
				tasks: ['uglify:dev']
			},
			html: {
				files: ['src/**/*.html'],
				tasks: ['bake:dev']
			}
		},
		shell: {
			command: ["node_modules/icon-font-generator/bin/icon-font-generator ./src/icons/*.svg -o ./public/assets/fonts --csspath ./public/assets/css/icons.css --height 1200 --types 'ttf, woff2, woff'  --htmlpath ./public/icons.html"].join('&&')
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
			dev: {
				options: {
					mangle: false
				},
				main: {
					files: {
						'public/js/main.min.js': ['src/js/main.js']
					}
				}
			}
		},
		bake: {
			dev: {
				options: {
					
				},
	 
				files: {
					"public/index.html": "src/pages/index.html",
					"public/dash.html": "src/pages/dash.html",
					"public/404.html": "src/pages/404.html",
				}
			},
		},
		browserSync: {
			dev: {
				bsFiles: {
					src: [
						'public/assets/css/*.css',
						'public/assets/*.js',
						'public/*.html'
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
	grunt.loadNpmTasks('grunt-bake');

	// define default task
	grunt.registerTask('default', ['browserSync', 'watch']);
};