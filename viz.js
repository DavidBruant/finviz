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

    console.log('2010', yearRows);
    var total = yearRows.reduce(function(acc, curr){ return acc + curr['montant']}, 0)
    
    var byType = _.groupBy(
        yearRows, 
        r => r['Fonctionnement ou Investissement'] + r['Recette ou dépense']
    );
    var totalByType = Object.create(null);
    
    Object.keys(byType).forEach(function(k){
        var val = byType[k]
        totalByType[k] = val.reduce(function(acc, curr){ return acc + curr['montant']}, 0)
    })

    var svgxmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(svgxmlns, "svg");
    svgElem.setAttribute('width', 1000);
    svgElem.setAttribute('height', 700);
    svgElem.classList.add('budget-nav');

    var width = 700;
    var height = 70;
    
    var budgetCategories1 = makeStackBar([...Object.entries(byType)].map(([type, rows]) => {
        console.log('type, rows', type, rows)
        
        return {
            label: type,
            value: totalByType[type],
            onPortionClick: function(ev){
                var type = ev.label;
                var rect = ev.rect;
                
                console.log('click', type, rect, rows)
                
                if(budgetCategories2)
                    budgetCategories2.remove();
                
                var by1Nom = _.groupBy(
                    rows, 
                    r => r['1 nom']
                );
                var totalBy1Nom = Object.create(null);

                Object.keys(by1Nom).forEach(function(k){
                    var val = by1Nom[k]
                    totalBy1Nom[k] = val.reduce(function(acc, curr){ return acc + curr['montant']}, 0)
                })
                
                budgetCategories2 = makeStackBar([...Object.entries(by1Nom)].map(([_1Nom, rows]) => {
                    return {
                        label: _1Nom,
                        value: totalBy1Nom[_1Nom],
                        onPortionClick: function(ev){
                            var _1Nom = ev.label;
                            var rect = ev.rect;

                            console.log('click', _1Nom, rect, rows)
                        }
                    }
                }), {width: width, height: height, title: type})
                
                budgetCategories2.setAttribute('transform', 'translate(0, '+2*height+')')
                
                svgElem.appendChild(budgetCategories2)
            }
        }
    }), {width: width, height: height, title: 'Budget complet'})
    
    var budgetCategories2;
    var budgetCategories3;
    var budgetCategories4;
    
    svgElem.appendChild(budgetCategories1)
    

    main.appendChild(svgElem);
})
            
            
            