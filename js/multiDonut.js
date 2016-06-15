"use strict";

var M52_URL = "./BP2016BudgetPrincipal.csv";

var m52P = fetchAndPrepareM52Budget(M52_URL);

/*
    From csv data to the data the viz consumes
*/
var width = 1000;
var height = 600;

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
    '<text transform="translate('+width/2+','+height/2+')"></text>'+
    '</svg>';

main.appendChild(multiDonutContainer);


function FonctionGroupedM52BudgetData(m52Rows){
    //var R/*ubrique fonctionnelle*/ = r['Rubrique fonctionnelle'];
    /*[
        R[1],
        R[2] ? R[1]+R[2] : undefined,
        R[3] ? R[1]+R[2]+R[3] : undefined,
        R[4] ? R[1]+R[2]+R[3]+R[4] : undefined
    ].filter(v => v);*/
    
    const res = _.groupBy(m52Rows, r => r['Rubrique fonctionnelle'][1]);
    
    Object.keys(res).forEach(key => {
        const val = res[key];
        
        const grouped1 = _.groupBy(val, r =>
            r['Rubrique fonctionnelle'][2] ?
                r['Rubrique fonctionnelle'][1]+r['Rubrique fonctionnelle'][2] : 
                ''
        );
        
        const selfValues = grouped1['']; // when r['Rubrique fonctionnelle'][2] === ''
        delete grouped1[''];
        // subdivide again
        Object.keys(grouped1).forEach(key => {
            const val = grouped1[key];

            const grouped2 = _.groupBy(val, r =>
                r['Rubrique fonctionnelle'][3] ?
                    r['Rubrique fonctionnelle'][1]+r['Rubrique fonctionnelle'][2]+r['Rubrique fonctionnelle'][3] :
                    ''
            );

            const selfValues = grouped2['']; // when r['Rubrique fonctionnelle'][3] === ''
            delete grouped2[''];
            // subdivide again ?
            if(selfValues)
                grouped2.selfValues = selfValues;
            
            grouped1[key] = grouped2;
        })
        
        if(selfValues)
            grouped1.selfValues = selfValues;
        
        res[key] = grouped1
    })
    
    return res;
}

function sum(grouped){
    var res = {};
    
    Object.keys(grouped).forEach(key => {
        const value = grouped[key];
        
        if(Array.isArray(value)){ //leaf case
            res[key] = value.reduce((acc, curr) => {return acc + curr['Montant']}, 0)
        }
        else{
            var selfValue = Array.isArray(value.selfValues) ?
                value.selfValues.reduce((acc, curr) => {return acc + curr['Montant']}, 0)  :
                0;
            delete value.selfValues;
            
            res[key] = sum(value);
            res[key].selfValue = selfValue;
        }
    });
    
    return res;
}


function renderBudget(budg){
    const grouped = FonctionGroupedM52BudgetData(budg);
    const data = sum(grouped)
    
    console.log('renderBudget', grouped, data);
    
    ReactDOM.render(
        React.createElement(
            Donut,
            {
                data: data,
                startAngle: 0, 
                endAngle: 2*Math.PI, 
                innerRadius: 100, 
                donutWidth: 50,
                width, height,
                show: true,
                onFragmentSelected: text => multiDonutContainer.querySelector('text').textContent = text
            }
        ),
        main.querySelector('.multi-donut-container')
    )
}

