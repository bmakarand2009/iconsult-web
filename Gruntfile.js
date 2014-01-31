'use strict';
module.exports = function(grunt) {
// load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  var proxySnippet = require('grunt-connect-proxy/lib/utils').proxyRequest;


  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Concat & minify
    //mangle:true, compress:true, beautify:false, and delete the preserve comments
    uglify: {
      dev: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> version: <%= pkg.version %> \n author: <%= pkg.author %> */\n',
          mangle: false,
          //mangle:true,
          compress: false, 
          //compress:true,
          sourceMap: 'web-app/assets/sources.min.js.map',
          //delete preservecomments for prod
          preserveComments: 'all', 
          beautify: true, 

        },
        files: {
          'web-app/assets/welcome.min.js': [
            'web-app/welcome/app.js',
            'web-app/welcome/routes.js',            
          ],
          'web-app/assets/admin.min.js': [
            'web-app/admin/admin.service.js',
            'web-app/admin/admin.login.controller.js',
            'web-app/admin/admin.parent.controller.js',  
            'web-app/admin/admin.mytest.controller.js',  
                     
          ],
          'web-app/assets/shared.min.js': [
            'web-app/shared/shared.restmaster.service.js',
            'web-app/shared/shared.tableData.service.js',
            'web-app/shared/shared.records.controller.js',
            'web-app/shared/shared.jquery.datatable.controller.js',
            'web-app/shared/module.js',   
            'web-app/shared/shared.service.js',    

          ],
          'web-app/assets/vendor.min.js': [
            'web-app/vendors/vendors.controllers.js',
            'web-app/vendors/test.js'
          ],
          'web-app/assets/candidate.min.js': [
            'web-app/candidates/candidates.controllers.js',
          ],
          'web-app/assets/utils.min.js': [
            'web-app/utils/http-auth-interceptor.js',
            'web-app/utils/createDialog.js',
            'web-app/utils/toastr.js',
            'web-app/utils/ui-bootstap-tmpls.js',
            'web-app/utils/ui.typeahead.js',
            'web-app/utils/xeditable.js',
            'web-app/utils/ui-bootstrap-tpls-0.9.0.js',
          ],

        }
      },
      jquerylibs :{
        options: {
          mangle: false,
          compress: false,
        },
        files: {
          'web-app/assets/jquery.assets.min.js': [
            'web-app/js/lib/jquery/jquery-migrate-1.1.1.min.js',
            'web-app/js/lib/jquery/jquery-ui-1.9.2.min.js',  
            'web-app/js/lib/bootstrap/bootstrap.min.js',
            'web-app/js/lib/jquery/jquery.cookie.js',
            'web-app/js/lib/jquery/jquery.uniform.min.js',
            'web-app/js/lib/flot/jquery.flot.min.js',
            'web-app/js/lib/flot/jquery.flot.resize.min.js',
            'web-app/js/lib/jquery/jquery.dataTables.min.js',
            'web-app/js/lib/modernizr.min.js',
            'web-app/js/lib/responsive-tables.js',
            'web-app/js/lib/custom.js'
          ]
        }
      },
      angularlibs :{
        options: {
          mangle: false,
          compress: false,
        },
        files: {
          'web-app/assets/angular.assets.min.js': [
             'web-app/js/lib/angular/angular-resource.min.js',
             'web-app/js/lib/angular/angular-cookies.min.js',
             'web-app/js/lib/angular-ui-router/release/angular-ui-router.min.js',
          ]
        }
      },
    },

    connect: {
      'static': {
          options: {
              hostname: 'localhost',
              port: 8001
          }
      },
      server: {
        options: {
            hostname: 'localhost',
            port: 8000,
            middleware: function(connect) {
                return [proxySnippet];
            }
        },
        proxies: [
            {
                context: '/rest',
                host: 'localhost',
                port: 8080               
            },
            {
                context: '/auth',
                host: 'localhost',
                port: 8080
            },
            {
              context: '/',
              host: 'localhost',
              port: 8001
            }
        ]
      }
    },


    watch: {
        src: {
          files: ['src/*.html', 'web-app/**/*.js', 'js/**/*.js','assets/css/*.css', '!assets/js/app.min.js'], // ! means not
          tasks: ['compile'],
        },
    }

  });

  grunt.registerTask('server', ['connect:static', 'configureProxies:server', 'connect:server', 'watch']);


  grunt.registerTask('default', [
      'watch'
  ]);


  grunt.registerTask('libs', [
      'uglify:jquerylibs',
      'uglify:angularlibs',
       
  ]);
  
  grunt.registerTask('compile', [
      'uglify:dev'
  ]);
  grunt.event.on('watch', function(action, filepath) {
      grunt.log.writeln(filepath + ' has ' + action);
  });


};