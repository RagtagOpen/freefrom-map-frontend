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
    this.colorRange = [
      // lightest
      "rgb(191,209,229)",
      "rgb(166,189,219)",
      "rgb(104,149,197)",
      "rgb(72,120,170)",
      "rgb(7,87,152)"
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
      .select("body")
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
    svg.on('mouseover', function (d) {
      
      // decreases opacity slightly to provide feedback of selection
      d3.select(this)
        .style({opacity: '0.75'})
        .append("text")
        .text(function (d) {
          console.log(d.properties.score)
          return d.properties.score
        });

      // add the state infor to the tooltip
      d3.select("#tooltip")
        .selectAll("text")
        .text(d.properties.name + ': ' + d.properties.score + " (click for more info)")

      })
      // mouseOUT - the mouse leaves the selection
      .on('mouseout', function (d) {

        // returns opacity to normal when mouse leaves
        d3.select(this).style({ opacity: '1.0' });
        // destroy tooltip when hovering over nothing  
        tooltip
          .style("opacity", 0)
          // .append("text")
      })
      // mouseMOVE - continuous version of mouseOVER
      .on('mousemove', function(d) {

        // reveal the tooltip on mouseover
        tooltip
          .style("opacity", 1)
          .style("left", (d3.event.pageX - 0) + "px")
          .style("top", (d3.event.pageY - 0) + "px")
 
      })
      // click events
      .on("click", function (d) {
        alert("Click detected on " + d.properties.name + ", redirecting")
      })
  }

  render() { 
    return <div id ={"#" + this.props.id} > </div>
  }

}

export default UsMap
