"use strict";
module.exports = function(grunt) {
    var less = require('less');
    var path = require('path');
  
    grunt.registerMultiTask('local-inline-less', '', function() {
        var done = this.async();
        this.files.forEach(function(file) {
            var content = grunt.file.read(file.src[0]);
            var parser = new less.Parser({
                filename: file.src[0]
            });

            parser.parse(content, function(e, tree) {
                if (!tree)
                    grunt.fail.warn("Failed to parse " + src.grey + ".");

                inline(tree, file.dest);
                grunt.log.ok('Created ' + file.dest.grey);
                done();
            });
        });
    });
  
    function inline(tree, targetPath) {
        var rules = tree.rules;
        var result = '';
        for (var i = 0; i < rules.length; i++) {
            var importedPath = rules[i].importedFilename;
            if (!importedPath)
                continue;

            result += '// -------------------------------------------------- \n';
            result += '// File: ' + path.basename(importedPath) +  '\n';
            result += '// -------------------------------------------------- \n\n';
            result += grunt.file.read(importedPath) + '\n';
            grunt.verbose.writeln('Inlined ' + importedPath.grey + '.');
        }

        grunt.file.write(targetPath, result);
    }
};