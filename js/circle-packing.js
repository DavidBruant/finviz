"use strict";

var readyP = new Promise(function(resolve, reject){
    document.addEventListener('DOMContentLoaded', resolve);
});

var URL = "./budgets-primitifs-2009-2016.csv";

var primitifByYearP = fetchAndPrepareBudgetPrimitif(URL)
.catch(err => console.error('err', err))

/*
    From csv data to the data the viz consumes
*/
var WIDTH = 700;
var SVGXMLNS = "http://www.w3.org/2000/svg";

var svgElem = document.createElementNS(SVGXMLNS, "svg");
svgElem.setAttribute('width', 1000);
svgElem.setAttribute('height', 700);
svgElem.classList.add('sunburst');

primitifByYearP
.then(function(byYear){
    var main = document.body.querySelector('main');

    // draw year buttons
    var yearSelector = makeYearSelector(Object.keys(byYear), function(year){
        console.log('selected year', year);
        if(!year){
            main.innerHTML = '';
        }
        else{
            makeCirclePacking(
                csvBudgetPrimitifToHierarchicalData(byYear[year]),
                main
            )
        }
        
    });
    
    document.body.insertBefore(yearSelector, main);
});

