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
function prepareData(rows) {
    var root = {
        "name": "root",
        "children": []
    };
    rows.forEach(function(r){
        var size = r["montant"];
        var parts = [
            r['Fonctionnement ou Investissement'] + r['Recette ou dépense'],
            r['1 nom'],
            r['2 sous catégories'],
            r['3 sous sous catégorie']
        ].filter(v => v);
        
        var currentNode = root;
        for (var j = 0; j < parts.length; j++) {
            var children = currentNode["children"];
            var nodeName = parts[j];
            var childNode;
            if (j + 1 < parts.length) {
                // Not yet at the end of the sequence; move down the tree.
                var foundChild = false;
                for (var k = 0; k < children.length; k++) {
                    if (children[k]["name"] == nodeName) {
                        childNode = children[k];
                        foundChild = true;
                        break;
                    }
                }
                // If we don't already have a child node for this branch, create it.
                if (!foundChild) {
                    childNode = {
                        "name": nodeName,
                        "children": []
                    };
                    children.push(childNode);
                }
                currentNode = childNode;
            } else {
                // Reached the end of the sequence; create a leaf node.
                childNode = {
                    "name": nodeName,
                    "size": size
                };
                children.push(childNode);
            }
        }
    });
    
    return root;
};

var WIDTH = 700;
var SVGXMLNS = "http://www.w3.org/2000/svg";

var YEAR = 2010;

var svgElem = document.createElementNS(SVGXMLNS, "svg");
svgElem.setAttribute('width', 1000);
svgElem.setAttribute('height', 700);
svgElem.classList.add('sunburst');



primitifByYearP
.then(function(byYear){
    var main = document.body.querySelector('main');

    // draw year buttons
    var yearSelector = makeYearSelector(Object.keys(byYear), function(year){
        console.log('selected year', year, 'TODO');
    });
    
    document.body.insertBefore(yearSelector, main);
    
    
    makeSunburst(
        prepareData(byYear[YEAR]),
        main
    )
    
});

