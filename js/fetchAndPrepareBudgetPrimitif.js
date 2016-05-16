"use strict";

(function(global){

    global.fetchAndPrepareBudgetPrimitif = function(url){
        return fetch(url)
        .then(resp => resp.text())
        .then(d3.csv.parse)
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
    };
    
})(this);