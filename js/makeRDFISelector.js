"use strict";

(function(global){
    
    global.makeRDFISelector = function(onRDFIChange){
        var container = document.createElement('div');
        container.classList.add('rdfi');
        
        container.innerHTML = `
            <div style="padding:1em;">Répartition des</div>
            <div class="selector">
                <label>dépenses<input type="radio" name="rd" value="D" checked></label>
                <label>recettes<input type="radio" name="rd" value="R"></label>
            </div>
            <div class="selector">
                <label>de fonctionnement<input type="radio" name="fi" value="F" checked></label>
                <label>d'investissement<input type="radio" name="fi" value="I"></label>
            </div>
        `;
        
        container.addEventListener('change', e => {
            onRDFIChange({
                rd: container.querySelector('input[type="radio"][name="rd"]:checked').value,
                fi: container.querySelector('input[type="radio"][name="fi"]:checked').value
            })
        })
        
        onRDFIChange({
            rd: container.querySelector('input[type="radio"][name="rd"]:checked').value,
            fi: container.querySelector('input[type="radio"][name="fi"]:checked').value
        })
        
        return container;
    }
    
})(this);

