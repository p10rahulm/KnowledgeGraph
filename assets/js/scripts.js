function start() {
    const legend = document.getElementById("legend");
    const refWidth = legend.clientWidth;
    var width = 0.9 * refWidth,
        height = 0.7 * screen.height;

    var svg = d3.select("#legend").append("svg")
        .attr("width", width)
        .attr("height", height);

    var force = d3.layout.force()
        .gravity(0.25)
        .distance(50 * refWidth / 250)
        .charge(-200 * refWidth / 300)
        .size([width, height])

        .size([width, height]);
    var color = d3.scale.category20();
    d3.json("content/artjson.json", function (error, json) {
        if (error) throw error;

        force
            .nodes(json.nodes)
            .links(json.links)
            .start();

        var link = svg.selectAll(".link")
            .data(json.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", 0.2);

        var node = svg.selectAll(".node")
            .data(json.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function (d) {
                return color(d.group);
            })
            .call(force.drag);
        node.append("circle")
            .attr("r", 4);


        node.append("text")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(function (d) {
                return d.name
            });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });
    });
}


/*


    var force = d3.layout.force()
        .charge(-400)
        .linkDistance(20)
        .size([width, height]);

    var svg = d3.select("#legend").append("svg")
        .attr("width", width)
        .attr("height", height);

    d3.json("content/artjson.json", function (error, graph) { //d3.json("artjson.json", function(error, graph) {
        if (error) throw error;

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .start();

        var link = svg.selectAll(".link")
            .data(graph.links)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke-width", function (d) {
                return Math.sqrt(d.value);
            });

        var node = svg.selectAll(".node")
            .data(graph.nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .style("fill", function (d) {
                return color(d.group);
            })
            .call(force.drag);


        node.append("text")
            .attr("x", 12)
            .attr("dy", ".35em")
            .text(function(d) { return "hihihi"; });
            // .text(function(d) { return d.name; });

        force.on("tick", function () {
            link.attr("x1", function (d) {
                return d.source.x;
            })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("cx", function (d) {
                return d.x;
            })
                .attr("cy", function (d) {
                    return d.y;
                });
        });

    });

 */


