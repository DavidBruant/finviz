"use strict";
            
var readyP = new Promise(function(resolve, reject){
    document.addEventListener('DOMContentLoaded', resolve);
});

var primitifP = fetch("./budgets-primitifs-2009-2016.csv")
.then(resp => resp.text())
.then(d3.csv.parse)
.catch(err => console.error('err', err))

var primitifByYearP = primitifP
.then(function(prim){
    // mutation
    prim.forEach(function(row){
        row["année"] = Number(row["année"])
        row["montant"] = Number(row["montant"])
        Object.freeze(row);
    });
    return prim;
})
.then(function(prim){
    console.log('prim', prim)

    return _.groupBy(prim, r => r["année"]);
})
//.then(data => console.log('data byYear', data))
.catch(err => console.error('err', err))

var WIDTH = 700;
var HEIGHT = 70;
var svgxmlns = "http://www.w3.org/2000/svg";

function makeRecursiveStackBarWithData({data, groupFunction, title, next}, container){
    var byGroup = _.groupBy(data, groupFunction);
    var totalByGroup = Object.create(null);
    
    Object.keys(byGroup).forEach(function(k){
        var val = byGroup[k]
        totalByGroup[k] = val.reduce(function(acc, curr){ return acc + curr['montant']}, 0)
    });
    
    var nextStackBar;
    var g = document.createElementNS(svgxmlns, "g");
    var stackBar = makeStackBar([...Object.entries(byGroup)].map(([group, rows]) => {
        console.log('group, rows', group, rows)
        
        return {
            label: group,
            value: totalByGroup[group],
            onPortionClick: next ? function(ev){
                var type = ev.label;
                var rect = ev.rect;
                
                if(nextStackBar)
                    nextStackBar.remove();
                
                nextStackBar = makeRecursiveStackBarWithData({
                    data: rows,
                    title: group,
                    groupFunction: next.groupFunction,
                    next: next.next
                }, g);
                nextStackBar.setAttribute('transform', 'translate(0, '+2*HEIGHT+')')
                
                g.appendChild(nextStackBar)
            } : undefined
        }
    }), {width: WIDTH, height: HEIGHT, title: title})
    
    g.appendChild(stackBar);
    
    return g;
}



primitifByYearP
.then(function(byYear){
    var yearsDiv = document.body.querySelector('.years');
    var main = document.body.querySelector('main');

    // draw year buttons
    Object.keys(byYear).forEach(function(key){
        var value = byYear[key];
        var b = document.createElement('button');
        b.textContent = key;

        b.addEventListener('click', function(e){
            main.textContent = JSON.stringify(value);
        })

        yearsDiv.appendChild(b);
    });

    // pick a year
    var year = 2010;

    var yearRows = byYear[year];

    var svgElem = document.createElementNS(svgxmlns, "svg");
    svgElem.setAttribute('width', 1000);
    svgElem.setAttribute('height', 700);
    svgElem.classList.add('budget-nav');

    var budgetCategories1 = makeRecursiveStackBarWithData(
        {
            data: yearRows,
            title: 'Budget complet',
            groupFunction: r => r['Fonctionnement ou Investissement'] + r['Recette ou dépense'],
            next: {
                groupFunction: r => r['1 nom'],
                next: {
                    groupFunction: r => r['2 sous catégories'],
                    next: {
                        groupFunction: r => r['3 sous sous catégorie']
                    }
                }
            }
        }, 
        svgElem
    );
    
    svgElem.appendChild(budgetCategories1)
    

    main.appendChild(svgElem);
})
            
            
            