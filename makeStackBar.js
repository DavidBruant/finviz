(function(global){
    'use strict';
    
    var svgxmlns = "http://www.w3.org/2000/svg";
    var BAR_HEIGHT = 70;
    
    function createZoomingTrapezoid(x, y, height, fromWidth, toWidth){
        var data = [
            [x, y],
            [x+fromWidth, y],
            [toWidth, y+height],
            [0, y+height]
        ];
        
        var path = d3_shape.line()(data);
        
        console.log('path', data, path);
        
        var pathEl = document.createElementNS(svgxmlns, "path");
        pathEl.setAttribute('d', path);
        pathEl.classList.add('zooming-trapezoid');
        
        return pathEl;
    }
    
    /*
    data: [
        {
            label: string
            value: number
            onPortionClick: label => void
        }
    ]
    
    */
    
    global.makeStackBar = function(data, options){
        console.log('opts', options);
        var stackBar = document.createElementNS(svgxmlns, "g");
        stackBar.classList.add('stack-bar');
        var width = options.width;
        console.log('width', width)
        var total = data.reduce(function(acc, d){ return acc + d.value }, 0);
        
        var nextXShift = 0;
        
        /*
        var mainRect = document.createElementNS(svgxmlns, "rect");
        var width = 700;
        var height = 70;
        mainRect.setAttribute('x', 20);
        mainRect.setAttribute('y', 0);
        mainRect.setAttribute('height', height);
        mainRect.setAttribute('width', width);
        */
        
        var trapezoid;
        
        data.forEach(function(d){
            console.log('d', d)
            
            var label = d.label;
            var value = d.value;
            var onPortionClick = d.onPortionClick;
            var xShift = nextXShift;

            var portionWidth = width*value/total;

            var portion = document.createElementNS(svgxmlns, "g");
            portion.classList.add('portion');

            var rect = document.createElementNS(svgxmlns, "rect");
            rect.setAttribute('x', 0);
            rect.setAttribute('y', 0);
            rect.setAttribute('height', BAR_HEIGHT);
            rect.setAttribute('width', portionWidth);

            var text = document.createElementNS(svgxmlns, "text");
            text.textContent = label + ' ('+value+')';
            text.setAttribute('dy', BAR_HEIGHT/2);
            text.setAttribute('dx', (portionWidth/2) - 20);
            
            portion.setAttribute('transform', 'translate('+xShift+')')

            portion.appendChild(rect);
            portion.appendChild(text);

            portion.addEventListener('click', function(){
                onPortionClick({
                    label: label,
                    rect: rect
                });
                
                if(trapezoid)
                    trapezoid.remove();
                
                trapezoid = createZoomingTrapezoid(xShift, BAR_HEIGHT, BAR_HEIGHT, portionWidth, width);
                stackBar.appendChild(trapezoid);
            });
            
            stackBar.appendChild(portion);

            nextXShift += portionWidth;
        });
        
        var totalText = document.createElementNS(svgxmlns, "text");
        totalText.textContent = total; 
        totalText.setAttribute('dy', 35);
        totalText.setAttribute('x', width+50);
        stackBar.appendChild(totalText);
        
        return stackBar;
    }
    
})(this);