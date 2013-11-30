module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower: {
            install: {
                options: { targetDir: 'temp' }
            }
        },
        
        'local-inline-less': {
            bootstrap: {
                src:  'temp/strapless/less/bootstrap.less',
                dest: 'dist/bootstrap.less'
            }
        },
        
        'local-sync-version': {
            bootstrap : {
                options: {
                    sourcePkgPath: './bower_components/strapless/bower.json',
                    targetPkgPaths: [ 'package.json', 'bower.json' ]
                }
            }
        }
    });

    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-bower-task');

    grunt.registerMultiTask('local-sync-version', '', function() {
        var options = this.options();
        var sourcePkg = grunt.file.readJSON(options.sourcePkgPath);
        options.targetPkgPaths.forEach(function(targetPkgPath) {
            var targetPkg = grunt.file.readJSON(targetPkgPath);
            targetPkg.version = sourcePkg.version;
            grunt.file.write(targetPkgPath, JSON.stringify(targetPkg, null, '  '));
            
            grunt.log.ok('Updated ' + targetPkgPath.grey + ' to ' + targetPkg.version.cyan + ".");
        });
    });
    
    // Default task(s).
    grunt.registerTask('default', [
        'bower:install',
        'local-inline-less:bootstrap',
        'local-sync-version:bootstrap'
    ]);
};