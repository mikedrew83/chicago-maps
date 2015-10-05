var projection = d3.geo.mercator()
    .scale(1)
    .translate([0, 0]);
var path = d3.geo.path()
    .projection(projection);

var currWard = null;
var heightOffset = 60;

///returns color given value, not sure how its implemented yet
var color = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["red", "white", "green"]);

function addLayer(topoFile) {
    var mapSVG = d3.select("#map_svg");

    d3.json(topoFile, function (json) {

        for (var prop in json.objects) {
            var topos = topojson.feature(json, json.objects[prop]);
            //topos = json.objects[prop];
            
            mapG = d3.select("#map_svg").append("g")
                .attr("id", prop)
                //.attr("height", mapSVG.height)
                //.attr("width", mapSVG.width);

            mapG.selectAll("path").data(topos.features).enter().append("path")
                .attr("d", path)
                .style("fill", "white")
                .style("stroke", "black");
        }
    });
}

//        var mapG = mapSVG.append("g").attr("id", json.features[0]


function addWardMapCentered(geoJsonFile) {

    var mapFrame = d3.select("#map_frame");

    var width = 600; //mapFrame.width;
    var height = 800; //mapFrame.height;
    var active = d3.select(null);


    projection = d3.geo.mercator()
        .scale(1)
        .translate([0, 0]);
    path = d3.geo.path()
        .projection(projection);



    var mapSVG = d3.select("#map_frame").append("svg").attr("id", "map_svg")
        .attr("width", width).attr("height", height);

    mapSVG.append("rect")
        .style("fill", "white")
        .style("stroke", "")
        .style("stroke-width", "1.5px")
        .attr("width", width)
        .attr("height", height)
        .on("click", reset);



    var tractsG = mapSVG.append('g').attr("id", "tracts"); //.attr("width", width).attr("height",height);

    var tifsG = mapSVG.append('g').attr("id", "tifs");
    var wardsG = mapSVG.append('g').attr("id", "wards");

    var mapDiv = d3.select("#map_frame");

    d3.json(geoJsonFile, function (json) {
        // create a first guess for the projection
        //console.log(json.objects);
        var wards = topojson.feature(json, json.objects.neighborhoods);
        //var tifs = topojson.feature(json, json.objects.tifs);
        //var tracts = topojson.feature(json, json.objects.tracts);
        //var precincts = topojson.feature(json, json.objects.precincts);
        //console.log(json.objects);
        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(wards),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, ((height - s * (b[1][1] + b[0][1])) / 2) - heightOffset];

        // Update the projection to use computed scale & translate.

        projection.scale(s).translate(t);

        wardsG.selectAll("path").data(wards.features).enter().append("path")
            .attr("d", path)
            /*.attr("id", function (d) {
                return "w" + d.properties.ward
            })*/
            .style("fill", "royalblue")
            .style("stroke-width", ".25")
            .style("stroke", "white")
            .style("stroke-linecap", "round")
            .style("opacity", "1")
            //.attr("transform", "scale(2)")
            .on("click", clicked)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", "aqua")
                    .style("stroke", "deeppink")
                    .style("stroke-width", "0")
                    //.attr("transform", "scale(1.5)");
                ;
                d3.select("h1").text(d.properties.ward);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .ease("bounce")
                    .duration(100)
                    .style("fill", "royalblue")
                    .style("stroke", "white")
                    .style("stroke-width", ".25")
                    .attr("transform", "");
                d3.select("h1").text("");
            })

        /*tractsG.selectAll("path").data(tracts.features).enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return "w" + d.properties.NAME1
            })
            .style("fill", "white")
            .style("stroke-width", ".25")
            .style("stroke", "black")
            .style("stroke-linecap", "round")
            .style("opacity", ",")

        tractsG.selectAll("path").data(precincts.features).enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return "w" + d.properties.Name
            })
            .style("fill", "white")
            .style("stroke-width", ".25")
            .style("stroke", "black")
            .style("stroke-linecap", "round")
            .style("opacity", "1")
            //.attr("transform", "scale(1.2)")
            /*.on("click", clicked)
            .on("mouseover", function (d) {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .style("fill", "aqua")
                    .style("stroke", "deeppink")
                    .style("stroke-width", "0")
                    //.attr("transform", "scale(1.5)");
                ;
                d3.select("h1").text(d.properties.NAME10);
            })
            .on("mouseout", function (d) {
                d3.select(this)
                    .transition()
                    .ease("bounce")
                    .duration(100)
                    .style("fill", "royalblue")
                    .style("stroke", "white")
                    .style("stroke-width", ".25")
                    .attr("transform", "");
                d3.select("h1").text("");
            })*/

        /*var wardsPath = wardsG.select("path"); //.transition().style("opacity", "0.5").duration(1000);

        //var p = wardsG.select("path");
        //console.log(d3.select("path#w1"));
        var delay = 0;

        for (i = 1; i <= 50; i++) {
            var p = d3.select("path#w" + i);
            //console.log(path.bounds(p));

            p
                .transition()
                .duration(1000)
                .ease("elastic")
                //.attr("transform", "translate(" + (t) + ")scale(.9)")

            //.attr("transform", "translate("+tran+")")
            .attr("transform", "scale(1)")
                .style("opacity", "1")
                //.duration(1000)
                .delay(delay);

            delay = delay + 100 - i;
        }*/


        //.attr("transform", "scale(2)")



    });


    function clicked(d) {
        for (i = 1; i <= 50; i++) {
            var p = d3.select("path#w" + i);
            //console.log(path.bounds(p));
            var delay = 40;
            if (i != d.properties.ward) {
                //console.log(p);
                p
                    .transition()
                    .duration(1500)
                    .ease("bounce")
                    //.attr("transform", "translate(" + (t) + ")scale(.9)")

                .attr("transform", "translate(0, 800)")
                    //.attr("transform", "scale(1)")
                    .style("opacity", "0.0")
                    //.duration(1000)
                    .delay(delay);

                delay = delay + 100 - i;
            } else {
                var bounds = path.bounds(d),
                    dx = bounds[1][0] - bounds[0][0],
                    dy = bounds[1][1] - bounds[0][1],
                    x = (bounds[0][0] + bounds[1][0]) / 2,
                    y = (bounds[0][1] + bounds[1][1]) / 2,
                    scale = .4 / Math.max(dx / width, dy / height),
                    translate = [width / 2 - scale * x, height / 2 - scale * y - heightOffset];



                wardsG.transition()
                    .duration(750)
                    .ease("behind")
                    .style("stroke-width", 1.5 / scale + "px")
                    .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
                currWard = d;
            }
        }




    }
    var delay = 40;

    function reset() {
        if (currWard != null) {
            active.classed("active", false);
            active = d3.select(null);

            /* tifsG.transition()
                 .duration(750)
                 .style("stroke-width", "1.5px")
                 .attr("transform", "");*/
            var delay = 40;
            for (i = 50; i > 0; i--) {
                var p = d3.select("path#w" + i);
                //console.log(path.bounds(p));

                if (i != currWard.properties.ward) {
                    //console.log(p);
                    p
                        .transition()
                        .duration(500)
                        .ease("elastic")
                        //.attr("transform", "translate(" + (t) + ")scale(.9)")

                    .attr("transform", "translate(0, 0)")
                        //.attr("transform", "")
                        .style("opacity", "1")
                        //.duration(1000)
                        .delay(delay);

                    delay = delay + 40;

                } else {
                    /*currWard.transition()
                        .duration(70)
                        .attr("transform", "");*/
                }

                wardsG.transition()
                    //.delay(50)
                    .duration(750)
                    .ease("elastic")
                    .style("stroke-width", "1.5px")
                    .attr("transform", "");
            }
        }
    }

}

function precinctsOnTop() {
    var mapSVG = d3.select("#map_svg");
    var precinctsG = mapSVG.select("#precincts");
    d3.select("#wards")
        .transition()
        .duration(500)
        .attr("transform", "translate(-600,0)");
}

function drawAnimatedPaths(geoJsonFile) {

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
        .on("click", pickItUp);



    var wardsG = mapSVG.append('g');
    var tifsG = mapSVG.append('g');


    var mapDiv = d3.select("#map_frame");

    d3.json(geoJsonFile, function (json) {
        // create a first guess for the projection

        var wards = topojson.feature(json, json.objects.wards);
        var tifs = topojson.feature(json, json.objects.tifs);
        var precincts = topojson.feature(json, json.objects.precincts);

        // Create a path generator.



        // Compute the bounds of a feature of interest, then derive scale & translate.
        var b = path.bounds(wards),
            s = .95 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        // Update the projection to use computed scale & translate.

        projection.scale(s).translate(t);


        wardsG.selectAll("path").data(wards.features).enter().append("path")
            .attr("d", path)
            .attr("id", function (d) {
                return "w" + d.properties.ward
            })
            .style("fill", "white")
            .style("stroke-width", "0")
            .style("stroke", "white")
            .style("stroke-linecap", "round")
            .style("opacity", "0.7") //function (d) {return d.properties.ward / 50})
            .on("click", fallApart)
            //.on("mouseenter", function(){d3.select(this).attr("transform", "scale(1.2)")});

        var delay = 0;

        for (i = 1; i <= 50; i++) {
            var p = d3.select("path#w" + i);
            //console.log(path.bounds(p));
            var bb = p.node().getBBox();
            var totalLength = p.node().getTotalLength();

            p
                .style("stroke", "black")
                .style("stroke-width", "1")
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .delay(delay)
                .duration(1000)
                .ease("linear")
                .attr("stroke-dashoffset", 0)
                .transition()
                .duration(1000)
                .style("fill", "gray");
            p.append("rect").attr("height", bb.height).attr("width", bb.width).style("stroke", "black").style("stroke-width", 2);
            //Random color generator
            //'#' + Math.floor(Math.random() * 16777215).toString(16)

            delay = delay + 10;
        }



    });

    function fallApart(d) {
        //console.log('fellapart');
        //get bounding box of g element
        //var wardsG = d3.select(this).parentNode();
        var bbox = mapSVG.node().getBBox();
        var bottom = bbox.y - bbox.height;
        console.log(bbox);
        var delay = 0;

        var paths = wardsG.selectAll("path");


        for (i = 0; i <= paths[0].length - 1; i++) {

            var p = d3.select(paths[0][i]);
            var angle = 5;
            if (Math.random() > .5) {
                angle = -2 * Math.random() * 10;
            }
            //console.log(p.node());
            pbox = p.node().getBBox();
            console.log(pbox);
            /*mapSVG.append("rect")
            .style("fill", "none")
            .style("stroke", "black")
            .style("stroke-width", "5")
            .attr("width", bbox.width)
            .attr("height", bbox.height)
            .attr("opacity", "1")*/
            var cx = pbox.x + (pbox.width / 2);
            var cy = pbox.y + (pbox.height / 2);
            var down = bbox.height - cy - 25;
            p.transition()
                .delay(delay)
                .duration(250)
                .ease("exp")
                .attr("transform", "translate(0," + down + ")rotate(" + angle + "," + cx + "," + cy + ")");
            delay = delay + 10;
        }
    }

    function pickItUp(d) {
        var delay = 0;

        var paths = wardsG.selectAll("path");


        for (i = 0; i <= paths[0].length - 1; i++) {

            var p = d3.select(paths[0][i]);

            p.transition()
                .delay(delay)
                .duration(250)
                .ease("exp")
                .attr("transform", "");
            delay = delay + 10;
        }
    }



}



function spinOff(d) {
    var p = d3.select(this);
    var bbox = p.node().getBBox();
    var x = bbox.x + (bbox.width / 2);
    var y = bbox.y + (bbox.height / 2);
    var frame = d3.select("#map_frame");
    frame.select("svg").
    append("rect")
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "5")
        .attr("width", bbox.width)
        .attr("height", bbox.height)
        .attr("opacity", "1")
        .attr("transform", "translate(" + bbox.x + "," + bbox.y + ")")


    /*frame
    .append("rect").style("stroke", "black").style("stroke-width")
    .attr("height", bbox.height).attr("width", bbox.width).attr("transform", "translate("+x+","+y+")");*/

    //console.log(x,y);
    this.rotateAngle = 1500;
    p.transition()
        .duration(500)
        .delay(250)
        //.attr("transform", "translate("+x+","+y+")")
        //    .delay(250)
        //        .duration(500)
        //.attr("transform", "rotate(180,"+x+","+y+")")
        //    .delay(250)
        //        .duration(500)
        //        .attr("transform", "rotate(90,"+x+","+y+")")
        //        .transition()
        //        .duration(500)
        //        .attr("transform", "translate(-800, -100)")
        //        .transition()
        //        .duration(500)
        //        //.delay(250)
        //        .attr("transform", "rotate(180,"+x+","+y+")")
        //.transition()
        //.duration(2000)
        //.attrTween("transform", rotTween)
    ;

}

function spinOff2(d) {
    var p = d3.select(this);
    var bbox = p.node().getBBox();
    //console.log(bb);
    var x = bbox.x + bbox.width / 2;
    var y = bbox.y + bbox.height / 2
    this.rotateAngle = 1500;
    p.transition()
        .duration(1500)
        .attr("transform", "translate(-800, -100) rotate(180," + x + "," + y + ")");

}

///use with .attrTween("transform"m rotTween) -- set this.rotateAngle, defaults to 360
function rotTween() {
    var endAng = 360;
    if (this.rotateAngle != null) {
        endAng = this.rotateAngle
    }
    var i = d3.interpolate(0, this.rotateAngle);
    var p = d3.select(this);
    var bbox = p.node().getBBox();
    var x = bbox.x + bbox.width / 2;
    var y = bbox.y + bbox.height / 2
    return function (t) {
        //return "rotate(" + i(t) + ",100,100)";
        return "rotate(" + i(t) + "," + x + "," + y + ")";
        //return "rotate(" + i(t) + ","+bbox.x+bbox.width/2+","+bbox.y+bbox.height/2+")"
    };
}




function goAway(w, h) {

    var n = Math.random();
    if (n > .5) {
        var x = Math.floor(Math.random() * w) + 1;
        var y = -Math.floor(Math.random() * h) + 1;
    } else {
        var x = -Math.floor(Math.random() * w) + 1;
        var y = Math.floor(Math.random() * h) + 1;
    }
    return [x, y];
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

function removeFeature(jsonFile) {
    var newjson = [];
    d3.json(jsonFile, function (json) {

        //var tracts = topojson.feature(json, json.objects.neighborhoods);
        console.log(json);
        
        for (i = 0; i <=tracts.length - 1; i++) {
            //console.log(tracts.features[i][0]);
        }

        //d3.select("h1").text(JSON.stringify(topojson.topology(json)));
    });
}

///SVG Map Manipulation Functions
