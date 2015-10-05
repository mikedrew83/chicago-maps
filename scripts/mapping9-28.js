function addWardMapCentered(geoJsonFile){
    
var width  = 600;
  var height = 800;

  var mapSVG = d3.select("#map_frame").append("svg")
      .attr("width", width).attr("height", height);
  
  var mapDiv = d3.select("#map_frame");
  
var projection = d3.geo.mercator()
    .scale(1)
    .translate([0, 0]);
    
  d3.json(geoJsonFile, function(json) {
      // create a first guess for the projection
    
    var wards = topojson.feature(json, json.objects.wards);
      
    /*var projection = d3.geo.mercator()
    .scale(1)
    .translate([0, 0]);*/

// Create a path generator.
var path = d3.geo.path()
    .projection(projection);
      

// Compute the bounds of a feature of interest, then derive scale & translate.
var b = path.bounds(wards),
    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

// Update the projection to use computed scale & translate.
projection
    .scale(s)
    .translate(t);
      
      
      
      mapSVG.selectAll("path").data(wards.features).enter().append("path")
        .attr("d", path)
        .style("fill", "royalblue")
        .style("stroke-width", ".25")
        .style("stroke", "white")
        .style("stroke-linecap", "round")
        .on("mouseover", function(d) {
          d3.select(this).style("fill", "yellow");
          d3.select("h1").text(d.properties.ward);
      })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "royalblue");
          d3.select("h1").text("");
      })

    });
    
d3.json('topos/tifTopo.json', function(json) {
    var tifs = topojson.feature(json, json.objects.tifs);
    
    
// Create a path generator.
    var path = d3.geo.path()
    .projection(projection);
      

// Compute the bounds of a feature of interest, then derive scale & translate.
/*var b = path.bounds(tifs),
    s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
    t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

// Update the projection to use computed scale & translate.
projection
    .scale(s)
    .translate(t);*/
      
      
      
      mapSVG.selectAll("path").data(tifs.features).enter().append("path")
        .attr("d", path)
        .style("fill", "silver")
        .style("stroke-width", ".25")
        .style("stroke", "black")
        .style("stroke-linecap", "round")
/*        .on("mouseover", function(d) {
          d3.select(this).style("fill", "red");
          d3.select("h1").text(d.properties.name);
      })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "royalblue");
          d3.select("h1").text("");
      })*/

    });
}

function addTifMapCentered(geoJsonFile){
    
var width  = 600;
  var height = 800;

  //var mapSVG = d3.select("#map_frame").append("svg")
    //  .attr("width", width).attr("height", height);
  
  var mapDiv = d3.select("#map_frame");
  
  //d3.json(geoJsonFile, function(json) {
      // create a first guess for the projection
    
      
    
}

function removeJsonPoints(jsonFile) {
    var newjson = [];
    d3.json(jsonFile, function(json) {
        
        
        for(i=0; i<= json.features.length-1; i++) {
            json.features[i].geometry.geometries.splice(0,1);}
        
        d3.select("h1").text(JSON.stringify(json));
    });
}
            
        

    



