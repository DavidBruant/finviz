"use strict";

(function(global){
    
    global.makeYearSelector = function(years, onYearSelected){
        var container = document.createElement('div');
        container.classList.add('years');
        
        years.forEach(function(y){
            var b = document.createElement('button');
            b.textContent = y;

            b.addEventListener('click', function(e){
                onYearSelected(y);
            })

            container.appendChild(b);
        });
        
        return container;
    }
    
})(this);

