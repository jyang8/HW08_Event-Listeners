var svg = document.getElementById("vector");

var circleClick = function(e) {
    console.log("CIRCLE: " + e.target);
    this.addEventListener("click", circleClick2, true);
    this.setAttribute("fill", "blue");
    //svg.removeChild(this);
    //e.stopPropagation();
}

var circleClick2 = function(e) {
    console.log("CIRCLE: " + e.target);
    svg.removeChild(this);
    var newDot = makeDot( 123, 123 ); // replace 123 with random
    svg.appendChild( newDot );
}

var makeDot = function(x, y) {    
    var r = 20;   
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.addEventListener("click", circleClick, true);
    return c;
}

var drawDot = function(e) {
    console.log("SVG:" + e.target);
    if ( this == e.target ) {
	var dot = makeDot( e.offsetX, e.offsetY );
	svg.appendChild( dot );
    }
}

var clear = function(e) {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

svg.addEventListener("click", drawDot, true);
