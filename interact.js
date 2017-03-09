var svg = document.getElementById("vector");
var width = svg.getAttribute("width");
var height = svg.getAttribute("height");
var r = 20;
var rid = 0;

var circleClick = function(e) {
    if (this.getAttribute("fill") == "green") {
	this.setAttribute("fill", "blue");
    } else if (this.getAttribute("fill") == "blue") {
	svg.removeChild(this);
	var newX = Math.random() * (width - 2 * r) + r;
	var newY = Math.random() * (height - 2 * r) + r;
	var newDot = makeDot( newX, newY );
	newDot.addEventListener("click", circleClick);
	svg.appendChild( newDot );
    }
    e.stopPropagation();
}

var makeDot = function(x, y) {       
    var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", r);
    c.setAttribute("fill", "green");
    c.addEventListener("click", circleClick);
    return c;
}

var drawDot = function(e) {
    if ( this == e.target ) {
	var dot = makeDot( e.offsetX, e.offsetY );
	svg.appendChild( dot );
    }
}

var move = function() {
    window.cancelAnimationFrame( rid );
    
    var screensaver = function() {
	var dots = svg.children;
	var right = true;
	var down = true;
	
	for (var i = 0; i < dots.length; i++) {
	    var x = parseInt( dots[i].getAttribute("cx") );
	    var y = parseInt( dots[i].getAttribute("cy") );

	    if (x >= (width-r)) {
		right = false;
	    } else if (x <= 0) {
		right = true;
	    }
	    if (y >= (height-r)) {
		down = false;
	    } else if (y <= 0) {
		down = true;
	    }

	    if (right == true) {
		dots[i].setAttribute("cx", x++);
	    } else {
		dots[i].setAttribute("cx", x--);
	    }
	    if (down == true) {
		dots[i].setAttribute("cy", y++);
	    } else {
		dots[i].setAttribute("cy", y--);
	    }

	    rid = window.requestAnimationFrame( screensaver );
	    
	}
    }
    
    screensaver();
    
};

var clear = function(e) {
    while (svg.lastChild){
	svg.removeChild(svg.lastChild);
    }
};

var clearBtn = document.getElementById("clear_btn");
clearBtn.addEventListener("click", clear);

svg.addEventListener("click", drawDot, true);

var moveBtn = document.getElementById("move_btn");
moveBtn.addEventListener("click", move);
