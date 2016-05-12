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

    var byYear = new Map();

    prim.forEach(function(row){
        var year = row["année"];

        var yearRows = byYear.get(year);

        if(!yearRows){
            yearRows = [];
            byYear.set(year, yearRows);
        }

        yearRows.push(row);
    });

    return byYear;
})
//.then(data => console.log('data byYear', data))
.catch(err => console.error('err', err))


primitifByYearP
.then(function(byYear){
    var yearsDiv = document.body.querySelector('.years');
    var main = document.body.querySelector('main');

    // draw year buttons
    byYear.forEach(function(value, key){
        var b = document.createElement('button');
        b.textContent = key;

        b.addEventListener('click', function(e){
            main.textContent = JSON.stringify(value);
        })

        yearsDiv.appendChild(b);
    });

    // pick a year
    var year = 2010;

    var yearRows = byYear.get(year);

    console.log('2010', yearRows);
    var total = yearRows.reduce(function(acc, curr){ return acc + curr['montant']}, 0)

    var byType = new Map();
    var totalByType = new Map();

    yearRows.forEach(r => {
        var type = r['Fonctionnement ou Investissement'] + r['Recette ou dépense'];
        var typeRows = byType.get(type)

        if(!typeRows){
            typeRows = [];
            byType.set(type, typeRows);

            totalByType.set(type, 0);
        }

        typeRows.push(r);
        totalByType.set(type, totalByType.get(type)+r['montant']);
    })

    var svgxmlns = "http://www.w3.org/2000/svg";
    var svgElem = document.createElementNS(svgxmlns, "svg");
    svgElem.setAttribute('width', 1000);
    svgElem.setAttribute('height', 700);
    svgElem.classList.add('budget-nav');

    var completeBudget = document.createElementNS(svgxmlns, "rect");
    var width = 700;
    var height = 70;
    completeBudget.setAttribute('x', 20);
    completeBudget.setAttribute('y', 0);
    completeBudget.setAttribute('height', height);
    completeBudget.setAttribute('width', width);

    svgElem.appendChild(completeBudget);
    
    var nextXShift = 20;
    
    byType.forEach(function(rows, type){
        var typeTotal = totalByType.get(type);

        var portionWidth = width*typeTotal/total;
        
        var portion = document.createElementNS(svgxmlns, "g");
        portion.classList.add('portion');
        
        var rect = document.createElementNS(svgxmlns, "rect");
        rect.setAttribute('x', 0);
        rect.setAttribute('y', 0);
        rect.setAttribute('height', 70);
        rect.setAttribute('width', portionWidth);
        
        var text = document.createElementNS(svgxmlns, "text");
        text.textContent = type;
        text.setAttribute('dy', 35);
        text.setAttribute('dx', portionWidth/2);
        
        portion.setAttribute('transform', 'translate('+nextXShift+')')
        
        portion.appendChild(rect);
        portion.appendChild(text);
        
        portion.addEventListener('click', function(){
            console.log('portion', type, rows)
        });
        
        svgElem.appendChild(portion);
        
        nextXShift += portionWidth;
        
    })
    
    


    main.appendChild(svgElem);
})
            
            
            