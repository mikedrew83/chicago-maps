var projection = d3.geo.mercator()
    .scale(1)
    .translate([0, 0]);
var path = d3.geo.path()
    .projection(projection);

function addWardMapCentered(geoJsonFile) {

    var width = 600;
    var height = 800;
    var active = d3.select(null);


    var projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);
    var path = d3.geo.path()
        .projection(projection);



    var mapSVG = d3.select("#map_frame").append("svg")
        .attr("width", width).attr("height", height);

    mapSVG.append("rect")
        .style("fill", "white")
        .style("stroke", "black")
        .style("stroke-width", "1.5px")
        .attr("width", width)
        .attr("height", height)
        .on("click", reset);



    var wardsG = mapSVG.append('g');
    var tifsG = mapSVG.append('g');


    var mapDiv = d3.select("#map_frame");

    d3.json(geoJsonFile, function (json) {
        // create a first guess for the projection

        var wards = topojson.feature(json, json.objects.wards);
        var tifs = topojson.feature(json, json.objects.tifs);


        // Create a path generator.



        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(wards),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.
        projection
            .scale(3 * s)
            .translate(t);

        /*var doubleT = [];
        doubleT.push(t[0]*2);
        doubleT.push(t[1]*2);
        console.log(t);
        console.log(s);
        console.log(path.bounds(wards));*/

        wardsG.selectAll("path").data(wards.features).enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return "w" + d.properties.ward
            })
            .style("fill", "royalblue")
            .style("stroke-width", ".25")
            .style("stroke", "white")
            .style("stroke-linecap", "round")
            .style("opacity", "0.3")
            //.attr("transform", "translate(" + t + ")scale(" + s+ ")")
            .on("click", clicked)
            .on("mouseover", function (d) {
                d3.select(this).style("fill", "yellow");
                d3.select("h1").text(JSON.stringify(d.properties.ward));
            })
            .on("mouseout", function (d) {
                d3.select(this).style("fill", "royalblue");
                d3.select("h1").text("");
            })

        var wardsPath = wardsG.select("path"); //.transition().style("opacity", "0.5").duration(1000);

        //var p = wardsG.select("path");
        //console.log(d3.select("path#w1"));
        var delay = 0;
        console.log(t);
        console.log(s);
        for (i = 1; i <= 50; i++) {
            var p = d3.select("path#w" + i);
            //console.log(path.bounds(p));

            p
                .transition()
                .duration(1000)
                //.ease("bounce")
                .attr("transform", "scale(0.9)")
                .style("opacity", "0.7")
                //.duration(1000)
                .delay(delay);

            delay = delay + 450;
        }
        //console.log(wardsG.node().children[0]);
        /*tifsG.selectAll("path").data(tifs.features).enter().append("path")
            .attr("d", path)
            .style("fill", "green")
            .style("stroke-width", ".25")
            .style("stroke", "black")
            .style("stroke-linecap", "round")
            .style("opacity", 0.0)
            .on("click", clicked)
            .on("mouseover", function (d) {
                d3.select(this).style("fill", "orange");
                d3.select("h1").text(d.properties.name);
            })
            .on("mouseout", function (d) {
                d3.select(this).style("fill", "green");
                d3.select("h1").text("");
            })*/

    });

    function clicked(d) {
        if (active.node() === this) return reset();
        active.classed("active", false);
        active = d3.select(this).classed("active", true);
        //console.log(path.bounds(d));
        //console.log(d);
        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .4 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];



        wardsG.transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");


        /* wardsG.transition()
             .duration(750)
             .style("stroke-width", 1.5 / scale + "px")
             .attr("transform", "translate(" + translate + ")scale(" + scale + ")");*/


    }

    function reset() {
        active.classed("active", false);
        active = d3.select(null);

        /* tifsG.transition()
             .duration(750)
             .style("stroke-width", "1.5px")
             .attr("transform", "");*/

        wardsG.transition()
            .duration(750)
            .style("stroke-width", "1.5px")
            .attr("transform", "");
    }
}



function addTifMapCentered(geoJsonFile) {

    var width = 600;
    var height = 800;

    //var mapSVG = d3.select("#map_frame").append("svg")
    //  .attr("width", width).attr("height", height);

    var mapDiv = d3.select("#map_frame");

    d3.json(geoJsonFile, function (json) {
        // create a first guess for the projection


        var tifs = topojson.feature(json, json.objects.tifs);

        var projection = d3.geo.mercator()
            .scale(1)
            .translate([0, 0]);

        // Create a path generator.
        var path = d3.geo.path()
            .projection(projection);


        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(tifs),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.
        projection
            .scale(s)
            .translate(t);



        d3.select("svg").selectAll("path").data(tifs.features).enter().append("path")
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

function removeJsonPoints(jsonFile) {
    var newjson = [];
    d3.json(jsonFile, function (json) {


        for (i = 0; i <= json.features.length - 1; i++) {
            json.features[i].geometry.geometries.splice(0, 1);
        }

        d3.select("h1").text(JSON.stringify(json));
    });
}
