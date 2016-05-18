"use strict";

(function(global){

    global.fetchAndPrepareM52Budget = function(url){
        return fetch(url)
        .then(resp => resp.text())
        .then(function(text){
            var firstLine = text.slice(0, text.indexOf('\n'));
            
            if(firstLine.split(',').length > firstLine.split(';').length)
                return d3.csv.parse(text)
            else
                return d3.dsv(';', 'text/plain').parse(text);
        })
        .then(function(prim){
            // mutation
            prim.forEach(function(row){
                row["Montant"] = Number(row["Montant"]);
                
                if(row["Exercice"])
                    row["Exercice"] = Number(row["Exercice"]);
                
                if(row["Année"])
                    row["Exercice"] = Number(row["Année"]);
                
                Object.freeze(row);
            });
            console.log('prim', prim);
            
            return prim.filter(r => r["Exercice"] >= 2015);
        })
    };
    
})(this);