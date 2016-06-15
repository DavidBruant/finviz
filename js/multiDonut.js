"use strict";

var M52_URL = "./BP2016BudgetPrincipal.csv";

/*
    From csv data to the data the viz consumes
*/
var width = 1000;
var height = 700;

const main = document.body.querySelector('main');
main.innerHTML = '<svg width="'+width+'" height="'+height+'">'+
    '<g transform="translate('+width/2+','+height/2+')"></g>'+
    '</svg>';

function d3DataHierarchyFormatToGrouped(d3Data){
    
    /*
        Object is either {name, children} or {name, size}
    */
    
    var res = {};
    
    if(Array.isArray(d3Data.children)){
        d3Data.children.forEach(obj => {
            const {name} = obj;
            res[name] = d3DataHierarchyFormatToGrouped(obj);
        });
        
        return res;
    }
    else{
        return d3Data.size;
    }
}

fetchAndPrepareM52Budget(M52_URL)
.then(function(prim){

    ReactDOM.render(
        React.createElement(
            Donut,
            {
                data: d3DataHierarchyFormatToGrouped(
                    csvM52BudgetToHierarchicalData(
                        prim
                    )
                ),
                startAngle: 0, 
                endAngle: 2*Math.PI, 
                innerRadius: 100, 
                donutWidth: 50,
                width, height,
                show: true
            }
        ),
        main.querySelector('g')
    )
})
.catch(err => console.error('err', err))
