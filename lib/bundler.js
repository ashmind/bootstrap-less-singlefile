"use strict";
var less = require('less');
var fs = require('fs');
var path = require('path');
var bootstrapLessDir = path.dirname(require.resolve('bower-strapless/less/bootstrap.less'));

var parser = new less.Parser({
    paths: [bootstrapLessDir],
    filename: 'bootstrap.less'
});

var content = fs.readFileSync(bootstrapLessDir + '/bootstrap.less', { encoding: 'utf-8' });
parser.parse(content, function(e, tree) {
    if (!tree)
        throw e;

    var rules = tree.rules;
    var resultFile = fs.openSync("dist/bootstrap.less", 'w');
    for (var i = 0; i < rules.length; i++) {
        var importedPath = rules[i].importedFilename;
        if (!importedPath)
            continue;

        var importedContent = fs.readFileSync(importedPath);
        fs.writeSync(resultFile, "// -------------------------------------------------- \n");
        fs.writeSync(resultFile, "// File: " + path.basename(importedPath) +  "\n");
        fs.writeSync(resultFile, "// -------------------------------------------------- \n\n");
        fs.writeSync(resultFile, importedContent + "\n");
        console.log("Appended", importedPath);
    }

    fs.closeSync(resultFile);
});