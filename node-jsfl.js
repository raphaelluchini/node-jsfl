var fs = require('fs'),
    spawn = require('child_process').spawn;

// Extension Manager
var getExtension = function (filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
}

var isJSFL = function (filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
        case 'jsfl':
            return true;
    }
    return false;
}

var addJSFLExtension = function (fileName) {
    var extension = "";
    if(!isJSFL(fileName)){
        extension = ".jsfl";
    }
    return fileName + extension;
}

//JSFL file manager
var run = function (file, callback){
    ls  = spawn(process.env.comspec, ['/c', file]);
}

var generate = function (instructions, location, fileName, callback){
    fs.writeFile(location + addJSFLExtension(fileName), instructions, function(err) {
        if(err) {
           callback(err);
        } else {
           callback(false);
        }
    }); 
}

var generateFromJS = function (instructions, location, fileName, callback){
    var txt = "";
    for (method in instructions){
        //console.log(instructions[method].toString())
        if (typeof(instructions[method]) == "function") {
            txt += method + " =  "+instructions[method].toString()+";\n";
        }
        else if(typeof(instructions[method]) == "number")
        {
            txt += "var "+ method + " = " + instructions[method].toString()+";\n";
        }else
        {
            txt += "var "+ method + " = '" + instructions[method].toString()+"';\n";
        }
    }
    txt += "init();"
    fs.writeFile(location + addJSFLExtension(fileName), txt, function(err) {
        if(err) {
           callback(err);
        } else {
           callback(false);
        }
    });
}

var unlink = function (location, fileName, callback){
    fs.unlink(location + fileName + ".jsfl", function (err) {
      if (err) throw err;
      callback(false);
    });
}

//Public Methods
exports.run = run;
exports.generate = generate;
exports.generateFromJS = generateFromJS;
exports.unlink = unlink;
exports.addJSFLExtension = addJSFLExtension;