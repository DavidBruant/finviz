"use strict";

(function(global){

    global.csvM52BudgetToHierarchicalData = function prepareData(rows) {
        var root = {
            "name": "root",
            "children": []
        };
        rows.forEach(function(r){
            var size = r["Montant"];
            var R/*ubrique fonctionnelle*/ = r['Rubrique fonctionnelle'];
            
            var parts = [
                R[1],
                R[2] ? R[1]+R[2] : undefined,
                R[3] ? R[1]+R[2]+R[3] : undefined,
                R[4] ? R[1]+R[2]+R[3]+R[4] : undefined
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
        })
    
        return root;
    };
    
})(this);