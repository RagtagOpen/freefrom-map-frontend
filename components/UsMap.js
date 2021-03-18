import React, { Component } from 'react'
import * as d3 from "d3"
import ReactDOM from 'react-dom'

import StateCard from './StateCard'
import usData from "../public/data/us-states.json"

class UsMap extends Component {
    componentDidMount() {
        this.usData = usData;
        // FIXME: resize map on page resize?
        this.width = window.innerWidth * 0.75 - 40;
        this.height = this.width * 0.55;
        // I created this color scale using this: https://pinetools.com/lighten-color
        // I started with #32B4B4 and lightened by 20% and used that as the next step.
        // I continued to put the output color back into the 20% lightner until done
        this.colorRange = [
            // lightest
            "#f0654a",
            "#ff9797",
            "#abe4e1",
            "#48cacc",
            "#136b5a"
        ]
        this.renderMap();
    }

    mapScoresToStates(states, mapData) {
        // Iterate over states and assign score/grade to map data.
        states.forEach(state => {
            const { name } = state
            const feature = mapData.features.find(f => f.properties.name === name)
            feature.properties = state
        })
        return mapData
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

        // toggle a zoom-in on the small states of the eastern seaboard
        function zoomNortheast(t) {
            // approximate y axes to center vertically on small states of interest
            let yCoordsObj = {
                "VT": 65,
                "NH": 65,
                "MA": 75,
                "CT": 95,
                "RI": 150,
                "NJ": 175,
                "DE": 200,
                "MD": 200,
            }
            let y = yCoordsObj[t];
            if(northeastZoom) {
                // is there a better way to do this interpolation?-------------------V
                document.getElementById("us-map-svg").setAttribute("viewBox", "0 " + y + " 1440 700");
            } else {
                document.getElementById("us-map-svg").setAttribute("viewBox", "700 " + y + " 540 545");
            }
            // flip "zoomed" state
            northeastZoom = !northeastZoom
        }

        // adds zoom buttons to top right of map to zoom in on small states
        function addNortheastZoomButton(stateName) {

            d3.select("#map-container")
                .append("button")
                .attr("id", "northeast-focus-button")
                .attr("type", "button")
                .text(stateName)
                .attr("class", "ne-zoom-button")
                .style("width", "5%")
                .style("float", "right")
                // the zoom function will reset the y axis location up or down the eastern seaboard based on the state name
                .on("click", function(){ zoomNortheast(d3.select(this).text()) })
        }

        // States data comes from props
        const { states } = this.props
        // just unpacking for tidier variable names downstream
        let { usData, colorRange, width, height } = this;

        // add the values to the state objects
        // usData = this.mapStatesToValues(statesLived, usData);
        usData = this.mapScoresToStates(states, usData)

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
            // Scores range from -1 to 4
            .domain(d3.range(-1, 4, 1))
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
                // FIXME: Puerto Rico is undefined!
                return color(d.properties.grade && d.properties.grade.grade)
            });
        
        // add zoom buttons for little northeastern states
        addNortheastZoomButton("VT")
        addNortheastZoomButton("NH")
        addNortheastZoomButton("MA")
        addNortheastZoomButton("CT")
        addNortheastZoomButton("RI")
        addNortheastZoomButton("NJ")
        addNortheastZoomButton("MD")
        addNortheastZoomButton("DE")

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
        svg.on('mouseover', function (d) {
            // on rollover, note the location of the mouse
            // only redraw the tooltip if we're NOT in the bounds of a tool tip card
            if(!mouseInsideTooltip()) {
                // decreases opacity slightly to provide feedback of selection
                d3.select(this).style({opacity: '0.75'})

                // make the card visible
                tooltip
                    .style("opacity", 1)
                    .style("left", (d3.event.pageX - 40) + "px")
                    .style("top", (d3.event.pageY - 40) + "px")
                // Render state data into tooltip.
                ReactDOM.render(<StateCard state={d.properties} />, document.getElementById('tooltip'))
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
            // Navigate to state on click
            // FIXME: replace with toSlug method from utils
            const { name } = d.properties
            window.location.href = `${window.location.href}states/${name.toLowerCase().replace(' ', '-')}`
            // for now right clicking removes the card
        }).on("contextmenu", function () {
            d3.event.preventDefault();
            tooltip.style("opacity", 0)
        });
    }

    render() {

        return <div id='us-map'></div >
    }

}

export default UsMap
