import React, { Component } from 'react'
import stateScores from "../public/data/state-scores.json"
import usData from "../public/data/us-states.json"
import * as d3 from "d3"

class UsMap extends Component {

    componentDidMount() {

        this.stateScores = stateScores;
        this.usData = usData;
        // FIXME: resize map on page resize?
        this.width = window.innerWidth * 0.75 - 40;
        this.height = this.width * 0.55;
        // I created this color scale using this: https://pinetools.com/lighten-color
        // I started with #32B4B4 and lightened by 20% and used that as the next step.
        // I continued to put the output color back into the 20% lightner until done
        this.colorRange = [
            // lightest
            "rgb(164,229,229)",
            "rgb(142,223,223)",
            "rgb(114,215,215)",
            "rgb(79,206,206)",
            "rgb(50,180,180)"
        ]
        this.renderMap();
    }

    mapScoresToStates(scoreData, usData) {
        for (var i = 0; i < scoreData.length; i++) {
            let scoreStateName = scoreData[i].state;
            var stateScores = scoreData[i].score;
            for (var j = 0; j < usData.features.length; j++) {
                var jsonStateName = usData.features[j].properties.name;
                if (scoreStateName == jsonStateName) {
                    usData.features[j].properties.score = stateScores;
                    break;
                }
            }
        }
        return usData
    }

    renderMap() {

        // a function to determine if the mouse is on the tooltip so we can
        // avoid redrawing it until they aren't use it (prevents states "under"
        // the tool tip from triggering and redraw while card is in use)
        function mouseInsideTooltip() {
            const location = document.getElementById('tooltip').getBoundingClientRect()
            let x = d3.event.pageX;
            let y = d3.event.pageY;
            // in the left/right bounds?
            if(x > location.left && x < location.right) {
                // in the up/down bounds? (inverted y)
                if(y < location.bottom && y > location.top) {
                    return true
                }
            }
            return false
        }

        // just unpacking for tidier variable names downstream
        let { usData, colorRange, width, height, stateScores } = this;

        // add the values to the state objects
        // usData = this.mapStatesToValues(statesLived, usData);
        usData = this.mapScoresToStates(stateScores, usData)

        let northeastZoom = false;

        /* create structures for map, tooltip, and buttons */

        // initalize the pojection and path
        let projection = d3
            .geo
            .albersUsa()
            .translate([width / 2, height / 2])
            .scale([1200]);

        let path = d3
            .geo
            .path()
            .projection(projection);

        let color = d3
            .scale
            .ordinal()
            .domain(d3.range(1, 5, 1))
            .range(colorRange);

        // an outer div for the map svg and the zoom button
        let mapContainer = d3
            .select("#us-map")
            .append("div")
            .attr("id", "map-container")
        
        // an svg for the map itself
        let svg = d3
            .select("#map-container")
            .append("svg")
            .style("width", "95%")
            .style("float", "left")
            .attr("id", "us-map-svg")
            .attr("viewBox", "0 0 " + width + " " + height)
            .selectAll("path")
            .data(usData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("stroke", "#fff")
            .style("stroke-width", "1")
            .style("fill", function (d) {
                return color(d.properties.score)
            });

        // button next to map - toggle a zoom-in on the small states of the eastern seaboard
        let northeastFocusButton = d3
            .select("#map-container")
            .append("button")
            .attr("id", "northeast-focus-button")
            .attr("type", "button")
            .text("Zoom to Small States")
            .style("width", "5%")
            .style("float", "right")
            .on("click", function(){
                if(northeastZoom) {
                    document.getElementById("us-map-svg").setAttribute("viewBox", "0 0 1440 700");
                } else {
                    document.getElementById("us-map-svg").setAttribute("viewBox", "700 85 540 545");
                }
                northeastZoom = !northeastZoom
            })

        // create tooltip div
        let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)

        // div is finished, add a text
        tooltip
            .attr("id", "tooltip")
            .append("text")


        /* handle inputs */

        // mouseOVER: user scrolls onto map
        svg.on('mouseover', function () {
            // only redraw the tooltip if we're NOT in the bounds of a tool tip card
            if(!mouseInsideTooltip()) {
                // decreases opacity slightly to provide feedback of selection
                d3.select(this).style({opacity: '0.75'})

                // make the card visible
                tooltip
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX - 40) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
            }
        }).on('mouseout', function () {
            // returns opacity to normal when mouse leaves
            d3.select(this).style({ opacity: '1.0' });
            // Hide tooltip if mouse outside tooltip (covers the case where the
            // mouse leaves the svg boundary).
            if(!mouseInsideTooltip()) {
                tooltip.style("opacity", 0)
            }
            // mouseMOVE - continuous version of mouseOVER
        }).on('mousemove', function() {
            // not sure what if anything we'll need in here - used to debug "mouseInsideTooltip()"
            // console.log(mouseInsideTooltip());
        }).on("click", function (d) {
            // whatever redirect we want to do goes here
            alert("Click detected on " + d.properties.name + ", redirecting")
            // for now right clicking removes the card
        }).on("contextmenu", function () {
            d3.event.preventDefault();
            tooltip.style("opacity", 0)
        });
    }

    render() { return <div id='us-map'></div > }

}

export default UsMap
