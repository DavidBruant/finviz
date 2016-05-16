"use strict";

(function(global){
    
    global.makeYearSelector = function(years, onYearSelected){
        var container = document.createElement('div');
        container.classList.add('years');
        
        var selected;
        var selectedButton;
        
        years.forEach(function(y){
            var b = document.createElement('button');
            b.textContent = y;

            b.addEventListener('click', function(e){
                if(selectedButton)
                    selectedButton.classList.remove('selected');
                
                if(selected === y){
                    selectedButton = undefined;
                    selected = undefined;
                }
                else{
                    selectedButton = b;
                    selected = y;
                    b.classList.add('selected');
                }
                
                onYearSelected(selected);
            })

            container.appendChild(b);
        });
        
        return container;
    }
    
})(this);

