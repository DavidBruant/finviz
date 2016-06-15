"use strict";

var GIRONDE_URL = "./BP2016BudgetPrincipal.csv";


fetchAndPrepareM52Budget(GIRONDE_URL)
.then(function(prim){
    console.log('m52', prim);
    console.log('Aggregated', M52ToAggregated(prim));
})
