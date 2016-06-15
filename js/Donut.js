"use strict";

// Redoing http://bl.ocks.org/mbostock/3887193

var React = require('react');
var ReactDOM = require('react-dom');
var d3Shape = require('d3-shape');

/*

interface RecursiveData{
    [label]: number | RecursiveData
}

interface DonutProps{
    data: RecursiveData
    startAngle: number
    endAngle: number
    opacity: number
    innerRadius: number
    donutWidth: number
}

interface DonutState{
    hoveredData: label
}

*/

const pie = 
const arc = d3Shape.arc();

function computePieValues(recData){
    return Object.keys(recData).map(label => {
        const value = recData[label];
        
        return typeof value === "number" ?
            value :
            computePieValues(value).reduce((acc, curr) => acc + curr);
    })
}


module.exports = React.createClass({
    displayName: 'Donut',
    
    render: function(){
        const {props, state} = this;
        const {data, startAngle, endAngle, innerRadius, donutWidth} = props;
        
        var width = props.width;
        var height = props.height;
        
        const pieValues = computePieValues(data);
        const pie = d3Shape.pie()
            .startAngle(startAngle)
            .endAngle(endAngle)
        
        var arcDescs = Object.assign(
            pie(pieValues),
            {
                innerRadius: props.innerRadius,
                outerRadius: radius
            }
        );
        
        // React.createElement('svg', {width: width, height: height}, ...  )
        
        return React.createElement(
            'g',
            {
                transform: 'translate('+width/2+','+height/2+')'
            },
            Object.keys(data).map((label, i) => {
                const value = data[label];
                const arcDesc = arcDescs[i];

                return React.createElement(
                    'g',
                    {
                        className: 'arc', 
                        key: i,
                        onMouseOver: e => {
                            console.log('over', e);
                        }
                    },
                    React.createElement('path', {
                        d: arc(arcDesc), 
                        fill: 'hsl('+Math.random()*360+', 50%, 37%)'
                    }),
                    Object(value) === value ?
                        React.createElement(Donut, {
                            data : value, 
                            startAngle: arcDesc.startAngle, 
                            endAngle: arcDesc.endAngle, 
                            innerRadius: innerRadius + donutWidth, 
                            donutWidth: donutWidth
                        })
                )
            })      
        );
    }
})