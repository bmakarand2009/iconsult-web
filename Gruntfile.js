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
          'assets/welcome.min.js': [
            'welcome/app.js',
            'welcome/routes.js',            
          ],
          'assets/admin.min.js': [
            'admin/admin.service.js',
            'admin/admin.login.controller.js',
            'admin/admin.parent.controller.js',  
            'admin/admin.mytest.controller.js',  
                     
          ],
          'assets/shared.min.js': [
            'shared/shared.restmaster.service.js',
            'shared/shared.tableData.service.js',
            'shared/shared.records.controller.js',
            'shared/shared.jquery.datatable.controller.js',
            'shared/module.js',   
            'shared/shared.service.js',    

          ],
          'assets/vendor.min.js': [
            'vendors/vendors.controllers.js',
            'vendors/test.js'
          ],
          'assets/candidate.min.js': [
            'candidates/candidates.controllers.js',
          ],
          'assets/utils.min.js': [
            'utils/http-auth-interceptor.js',
            'utils/createDialog.js',
            'utils/toastr.js',
            'utils/ui-bootstap-tmpls.js',
            'utils/ui.typeahead.js',
            'utils/xeditable.js',
            'utils/ui-bootstrap-tpls-0.9.0.js',
          ],

        }
      },
      jquerylibs :{
        options: {
          mangle: false,
          compress: false,

        },
        files: {
          'assets/jquery.assets.min.js': [
            'js/lib/jquery/jquery-migrate-1.1.1.min.js',
            'js/lib/jquery/jquery-ui-1.9.2.min.js',  
            'js/lib/bootstrap/bootstrap.min.js',
            'js/lib/jquery/jquery.cookie.js',
            'js/lib/jquery/jquery.uniform.min.js',
            'js/lib/flot/jquery.flot.min.js',
            'js/lib/flot/jquery.flot.resize.min.js',
            'js/lib/jquery/jquery.dataTables.min.js',
            'js/lib/modernizr.min.js',
            'js/lib/responsive-tables.js',
            'js/lib/custom.js'
          ]
        }
      },
      angularlibs :{
        options: {
          mangle: false,
          compress: false,
        },
        files: {
          'assets/angular.assets.min.js': [
             'js/lib/angular/angular-resource.min.js',
             'js/lib/angular/angular-cookies.min.js',
             'js/lib/angular/angular-route.min.js',
             'js/lib/angular-ui-router/release/angular-ui-router.min.js',
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