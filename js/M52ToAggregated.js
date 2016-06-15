"use strict";

function M52ToAggregated(m52Budget){
    
    function amountByFilter(filterFunction){
        return m52Budget
            .filter(filterFunction)
            .map(r => r['Montant'])
            .reduce( (acc, curr) => {return acc+curr}, 0 );
    }
    
    const ActionSocialParPublicsFiltersByName = {
        "Personnes en handicapées": r => r['Rubrique fonctionnelle'] === 'R52'
    }
    
    return [
        {
            label: "Act Soc prest - frais heberg - pour pers handic",
            value: (function(){
                const A652221 = amountByFilter(r => r['Article'] === 'A652221')
                const A65242 = amountByFilter(r => r['Article'] === 'A65242')
                return A652221+A65242;
            })()
        },
        
        {
            label: "Act Soc prest - divers social - transport ét et él handic",
            value: amountByFilter(r => {
                return r['Rubrique fonctionnelle'] === 'R52' && r['Article'].match(/^A624.*/)
            })
        },
        
        {
            label: "Act Soc par public - Personnes en handicapées",
            value: amountByFilter(ActionSocialParPublicsFiltersByName["Personnes en handicapées"])
        },
        
        {
            label: "Act Soc par publics - Autres",
            value: (function(){
                const ActionSocialParPublicsFilters = Object.keys(ActionSocialParPublicsFiltersByName).map(n => ActionSocialParPublicsFiltersByName[n])
                
                return amountByFilter(r => {
                    return (r['Rubrique fonctionnelle'].match(/^R4.*/) ||
                        r['Rubrique fonctionnelle'].match(/^R5.*/)) && !ActionSocialParPublicsFilters.some(filterFun => filterFun(r))
                })
            })()
        }
    ]
}