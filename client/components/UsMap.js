import React, { Component } from 'react'
import stateScores from "../public/data/state-scores.json"
import usData from "../public/data/us-states.json"
import * as d3 from "d3"

class UsMap extends Component {

    componentDidMount() {

        this.stateScores = stateScores;
        this.usData = usData;
        this.height = 500;
        this.width = 960;
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
        function mouseInsideTooltip(location) {
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

        // initalize the pojection and path
        let projection = d3
            .geo
            .albersUsa()
            .translate([width / 2, height / 2])
            .scale([1000]);

        let path = d3
            .geo
            .path()
            .projection(projection);

        let color = d3
            .scale
            .ordinal()
            .domain(d3.range(1, 5, 1))
            .range(colorRange);

        let svg = d3
            .select("#us-map")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
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

        // mouseOVER, user scrolls onto
        svg.on('mouseover', function () {
            // on rollover, note the location of the mouse
            let tooltipDimensions = document.getElementById('tooltip').getBoundingClientRect()
            // only redraw the tooltip if we're NOT in the bounds of a tool tip card
            let mouseInHovercard = mouseInsideTooltip(tooltipDimensions);
            if(mouseInHovercard == false) {

                // decreases opacity slightly to provide feedback of selection
                d3.select(this)
                    .style({opacity: '0.75'})
      
                // make the card visible
                tooltip
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX - 40) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
            }
            
        }).on('mouseout', function () {
            // returns opacity to normal when mouse leaves
            d3.select(this).style({ opacity: '1.0' });
            // mouseMOVE - continuous version of mouseOVER
        }).on('mousemove', function() {
            // will finish soon
            // let x = d3.event.pageX;
            // let y = d3.event.pageY;
            // console.log(y)
            // // if the mouse is way off the map, hide card
            // if(y > 550 || y < 75 || x > 900 || x < 75) {
            //   tooltip
            //     .style("opacity", 0)
            // }
            let tooltipDimensions = document.getElementById('tooltip').getBoundingClientRect()
            // only redraw the tooltip if we're NOT in the bounds of a tool tip card
            let mouseInHovercard = mouseInsideTooltip(tooltipDimensions);
            console.log(mouseInHovercard);
            // click events
        }).on("click", function (d) {
            // whatever redirect we want to do goes here
            alert("Click detected on " + d.properties.name + ", redirecting")
        })
    }

    render() { return <div id='us-map'></div > }

}

export default UsMap