import React, { Component } from 'react'
import * as d3 from "d3"
import ReactDOM from 'react-dom'

import StateCard from './StateCard'
import usData from "../public/data/us-states.json"
import { toSlug } from 'utils'

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
        this.renderMap()
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
        //
        // Note: rectangle argument must be passed so that it is dynamically
        // recalculated when the mouse event occurs.
        function mouseInsideTooltip(rectangle) {
            const {left, right, bottom, top} = rectangle
            let {pageX: x, pageY: y} = d3.event
            // in the left/right bounds?
            if(x >= left && x <= right) {
                // in the up/down bounds? (inverted y)
                if(y <= bottom && y >= top) {
                    return true
                }
            }
            return false
        }
        // States data comes from props
        const { states } = this.props
        // just unpacking for tidier variable names downstream
        let { usData, colorRange, width, height } = this;

        // add the values to the state objects
        // usData = this.mapStatesToValues(statesLived, usData);
        usData = this.mapScoresToStates(states, usData)

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

        let svg = d3
            .select("#us-map")
            .append("svg")
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
            if(!mouseInsideTooltip(document.getElementById('tooltip').getBoundingClientRect())) {
                // decreases opacity slightly to provide feedback of selection
                d3.select(this)
                    .style({opacity: '0.75'})

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
            if(!mouseInsideTooltip(document.getElementById('tooltip').getBoundingClientRect())) {
                tooltip
                    .style("opacity", 0)
            }
            // mouseMOVE - continuous version of mouseOVER
        }).on('mousemove', function () {
            // will finish soon
            // let x = d3.event.pageX;
            // let y = d3.event.pageY;
            // console.log(y)
            // // if the mouse is way off the map, hide card
            // if(y > 550 || y < 75 || x > 900 || x < 75) {
            //   tooltip
            //     .style("opacity", 0)
            // }
            // only redraw the tooltip if we're NOT in the bounds of a tool tip card
            // console.log(mouseInsideTooltip(document.getElementById('tooltip').getBoundingClientRect()));
            // click events
        }).on("click", function (d) {
            // Navigate to state on click
            const { name } = d.properties
            window.location.href = `${window.location.href}states/${toSlug(name)}`
            // for now right clicking removes the card
        }).on("contextmenu", () => {
            d3.event.preventDefault();
            tooltip
                .style("opacity", 0)
        });
    }

    render() {
        return <div id='us-map' />
    }

}

export default UsMap
