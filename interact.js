var svg = document.getElementById("vector");
var width = svg.getAttribute("width");
var height = svg.getAttribute("height");
var r = 32;
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
	c.setAttribute("dx",1);
	c.setAttribute("dy",1);
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
	var dots = svg.children;
	var screensaver = function() {
		for (var i = 0; i < dots.length; i++) {
			var x = parseInt( dots[i].getAttribute("cx") );
			var y = parseInt( dots[i].getAttribute("cy") );
			var dx = parseInt( dots[i].getAttribute("dx") );
			var dy = parseInt( dots[i].getAttribute("dy") );
			var rad = parseInt( dots[i].getAttribute("r") );

			x += dx;
			y += dy;
			dots[i].setAttribute("cx",x);
			dots[i].setAttribute("cy",y);
			if(x-r <= 0 || x >= width-r){
				dx *= -1;
			}
			if(y-r <= 0 || y >= height-r){
				dy *= -1;
			}
			dots[i].setAttribute("dx",dx);
			dots[i].setAttribute("dy",dy);
			if (x == width/2){
				dots[i].setAttribute("r",rad/2);
				var circ = makeDot(x,y);
				circ.setAttribute("dx",dx *= -1);
				circ.setAttribute("dy",dy *= -1);
				circ.setAttribute("r", rad/2);
				svg.appendChild( circ );
			}


		}
		rid = window.requestAnimationFrame(screensaver);
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
