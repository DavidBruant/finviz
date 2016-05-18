"use strict";

var GIRONDE_URL = "./BP2016BudgetPrincipal.csv";
var HAUT_DE_SEINE_URL = "./M52-92.csv";

/*
    From csv data to the data the viz consumes
*/
var WIDTH = 700;
var SVGXMLNS = "http://www.w3.org/2000/svg";

var svgElem = document.createElementNS(SVGXMLNS, "svg");
svgElem.setAttribute('width', 1000);
svgElem.setAttribute('height', 700);
svgElem.classList.add('sunburst');

fetchAndPrepareM52Budget(GIRONDE_URL)
.then(function(prim){
    var container = document.body.querySelector('main #dept-33');

    makeSunburst(
        csvM52BudgetToHierarchicalData(prim),
        container
    )
})

fetchAndPrepareM52Budget(HAUT_DE_SEINE_URL)
.then(function(prim){
    var container = document.body.querySelector('main #dept-92');

    makeSunburst(
        csvM52BudgetToHierarchicalData(prim),
        container
    )
})

