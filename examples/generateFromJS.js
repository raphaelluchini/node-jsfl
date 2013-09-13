var jsfl = require('node-jsfl');


var file = {
  hello: "Hello node.js",
  flaName: "helloNode.fla",
  swfName: "helloNode.swf",
  filePath: "file:///" + process.cwd().replace(/\\/g, "/").replace(":", "|") + "/",
  init:function(){
    trace(hello);
    trace("Will be saved: " + filePath + swfName);
    var doc = fl.createDocument();
    
    for (i=0; i<5; i++)
    {
      doc.addNewOval({left:(i*50), top:(i*50), right:(i*50)+50, bottom:(i*50)+50});
    }
    
    for ( var i = 0; i < doc.selection.length; i++ )
    {
      if ( doc.selection[i].elementType == "shape" )
      {
         editShape(doc.selection[i]);
      }
    }
    
    fl.saveDocument(doc, filePath + flaName);
    doc.exportSWF(filePath + swfName);
    
    doc.close(true);
    fl.quit();
  },
  editShape:function(element){
    var fill = element.getCustomFill();
    fill.color = "#FF0000";
    element.setCustomFill( fill );

    var stroke = doc.getCustomStroke("toolbar"); 
    stroke.color = "noStroke";
    element.setCustomStroke(stroke);
  },
  trace:function(txt){
    fl.trace(txt);
  }
};

var fileName = "teste";
jsfl.generateFromJS(file, "", fileName, function(err){
    jsfl.run(jsfl.addJSFLExtension(fileName), function(err){
      if(err){
        console.log("Some Error");
      }else{
        console.log("Success");
      }
    });
}); 