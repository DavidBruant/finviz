"use strict";

// Redoing http://bl.ocks.org/mbostock/3887193

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
    donutWidth: number,
    width,
    height,
    show: true|false|"ghost"
}

interface DonutState{
    hoveredData: label
}

*/

const arc = d3.arc();

function computePieValues(recData){
    console.log('recData', recData);
    
    return Object.keys(recData).map(label => {
        const value = recData[label];
        var res = typeof value === "number" ?
            value :
            computePieValues(value).reduce((acc, curr) => {return acc + curr}, 0);
        
        console.log('recData lvr', label, value, res);
        
        return res;
    })
}




var Donut = React.createClass({
    displayName: 'Donut',
    
    render: function(){
        const {props, state} = this;
        const {
            data,
            startAngle, endAngle,
            innerRadius, donutWidth,
            width, height,
            show,
            onFragmentSelected
        } = props;
        
        //console.log('props', props)
        
        const pieValues = computePieValues(data);
        //console.log('d', data);
        
        const pie = d3.pie()
            .startAngle(startAngle)
            .endAngle(endAngle)
        
        var arcDescs = pie(pieValues).map(p => Object.assign(
            p,
            {
                innerRadius: innerRadius,
                outerRadius: innerRadius + donutWidth
            }
        ));
        
        // React.createElement('svg', {width: width, height: height}, ...  )
        
        return React.createElement(
            'g',
            {className: 'Donut'},
            Object.keys(data).map((label, i) => {
                const value = data[label];
                const arcDesc = arcDescs[i];

                //console.log('arcDesc', label, arcDesc);
                
                return React.createElement(
                    'g',
                    {
                        className: 'arc', 
                        key: i,
                        onMouseOver: e => {
                            console.log(label +' '+ arcDesc.value)
                            onFragmentSelected(
                                (dictionnaireFonctions[label] || label) +
                                ' '+
                                arcDesc.value
                            )
                            e.stopPropagation();
                        },
                        opacity: show === "ghost" ? 0.3 : (show ? 1 : 0)
                    },
                    React.createElement('path', {
                        d: arc(arcDesc), 
                        fill: 'hsl('+Math.random()*360+', 50%, 37%)'
                    }),
                    // if this one is shown, show the next as a ghost donut
                    show === true ?
                        (Object(value) === value ?
                            React.createElement(Donut, {
                                data : value, 
                                startAngle: arcDesc.startAngle, 
                                endAngle: arcDesc.endAngle, 
                                innerRadius: innerRadius + donutWidth, 
                                donutWidth, width, height,
                                show: "ghost",
                                onFragmentSelected
                            }) :
                            value
                        ) :
                        undefined
                )
            })      
        );
    }
})