function addWardMapCentered(geoJsonFile){
    
var width  = 600;
  var height = 800;

  var mapFrame = d3.select("#map_frame").append("svg")
      .attr("width", width).attr("height", height)

  d3.json("ward2015geo.json", function(json) {
      // create a first guess for the projection
      var center = d3.geo.centroid(json)
      var scale  = 150;
      var offset = [width/2, height/2];
      var projection = d3.geo.mercator().scale(scale).center(center)
          .translate(offset);

      // create the path
      var path = d3.geo.path().projection(projection);

      // using the path determine the bounds of the current map and use 
      // these to determine better values for the scale and translation
      var bounds  = path.bounds(json);
      var hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
      var vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
      var scale   = (hscale < vscale) ? hscale : vscale;
      var offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                        height - (bounds[0][1] + bounds[1][1])/2];

      // new projection
      projection = d3.geo.mercator().center(center)
        .scale(scale).translate(offset);
      path = path.projection(projection);

      // add a rectangle to see the bound of the svg
      /*mapFrame.append("rect").attr('width', width).attr('height', height)
        .style('stroke', 'black').style('fill', 'none');*/

      var pathArray = [];
      for(i = 0; i<json.features.length; i++) {
          pathArray.push(json.features[i].geometry.geometries[0]);
      }
      
      
      mapFrame.selectAll("path").data(pathArray).enter().append("path")
        .attr("d", path)
        .style("fill", "gray")
        .style("stroke-width", ".5")
        .style("stroke", "white")
      
      mapFrame.select("point").append("point").attr("
    });
}



    



