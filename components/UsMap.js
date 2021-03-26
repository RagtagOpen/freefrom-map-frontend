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
            "#F06449",
            "#FF9797",
            "#AAE5E1",
            "#47CCCC",
            "#FFB600"
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
        svg.on('mouseover', (d) => {
            // make the card visible
            tooltip
                .style("opacity", 1)
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 40) + "px")
            // Render state data into tooltip.
            ReactDOM.render(
                <StateCard hideLearnMore state={d.properties} />,
                document.getElementById('tooltip')
            )
        }).on('mouseout', () => {
            // Hide tooltip
            tooltip.style("opacity", 0)
            // mouseMOVE - continuous version of mouseOVER
        }).on("click", (d) => {
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
