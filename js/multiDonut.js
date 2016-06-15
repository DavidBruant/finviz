"use strict";

var M52_URL = "./BP2016BudgetPrincipal.csv";

var m52P = fetchAndPrepareM52Budget(M52_URL);

/*
    From csv data to the data the viz consumes
*/
var width = 1000;
var height = 700;

const main = document.body.querySelector('main');
main.appendChild(makeRDFISelector(rdfi => {
    
    m52P
    .then(prim => {
        console.log('prim', prim);
        return prim.filter(r => r['Dépense/Recette'] === rdfi.rd && r['Investissement/Fonctionnement'] === rdfi.fi)
    })
    .then(renderBudget)
    .catch(err => console.error('err', err))
    
}))

const multiDonutContainer = document.createElement('div');
multiDonutContainer.innerHTML = '<svg width="'+width+'" height="'+height+'">'+
    '<g class="multi-donut-container" transform="translate('+width/2+','+height/2+')"></g>'+
    '</svg>';

main.appendChild(multiDonutContainer);


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
    else
        return d3Data.size;
}


function renderBudget(budg){
    ReactDOM.render(
        React.createElement(
            Donut,
            {
                data: d3DataHierarchyFormatToGrouped(
                    csvM52BudgetToHierarchicalData(
                        budg
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
        main.querySelector('.multi-donut-container')
    )
}

