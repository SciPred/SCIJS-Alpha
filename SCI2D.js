/* SciJS Canvas 2d: SCI2D
 * By SciPred, made 2019
 * Free To Use.
*/

//QUICK NOTE
/*
elm, sel and elmnt are supposed to be something like document.getElementById(id), not just id. (or so)
use Tab to get ---- instead of .... in space
no scenes for this
*/

//LIST
/*
Polyfills
drawVertices
Vector
useFunc
Geometries
*/

//This file is still beta, might remake some stuff

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SCI2D = function(arg) {return arg}));
}(this, function (exports) {'use strict';
	//POLYFILLS, SETUPS AND CUSTOMS
	if ( Math.sign === undefined ) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
		Math.sign = function ( x ) {
			return ( x < 0 ) ? - 1 : ( x > 0 ) ? 1 : + x;
		};
	}
	if ( 'name' in Function.prototype === false ) {
		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
		Object.defineProperty( Function.prototype, 'name', {
			get: function () {
				return this.toString().match( /^\s*function\s*([^\(\s]*)/ )[ 1 ];
			}
		} );
	}
	if ( Object.assign === undefined ) {
		// Missing in IE
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
		( function () {
			Object.assign = function ( target ) {
				if ( target === undefined || target === null ) {
					throw new TypeError( 'Cannot convert undefined or null to object' );
				}
				var output = Object( target );
				for ( var index = 1; index < arguments.length; index ++ ) {
					var source = arguments[ index ];
					if ( source !== undefined && source !== null ) {
						for ( var nextKey in source ) {
							if ( Object.prototype.hasOwnProperty.call( source, nextKey ) ) {
								output[ nextKey ] = source[ nextKey ];
							}
						}
					}
				}
				return output;
			};
		} )();
	}
	exports.constructor = Object;
	exports.constructor.IS_EXPORTS_DEPENDENT = true;
	exports.constructor.IS_GLOBALLY_SCATTERED = true;
	exports.constructor.IS_SCI = false;
	if (window.sci !== undefined) {exports.constructor.IS_IN_WINDOW = true}
	else {exports.constructor.IS_IN_WINDOW = false}
	exports.ownRegExp = /SCI2D/i;

	//drawVertices
	exports.drawVertices = function(ctx, vertices, stroke, fill) { //dependent
		this.ctx = ctx;
		var x, y;
		this.vertices = vertices || [100, 100];
		this.stroke = stroke || "black";
		this.fill = fill || "black";
		ctx.beginPath();
		ctx.moveTo(this.vertices[0], this.vertices[1]);
		for (var i=2; i<this.vertices.length; i+=2) {
			x = this.vertices[i]; y = this.vertices[i+1];
			ctx.lineTo(x, y);
		}
		ctx.strokeStyle = this.stroke || "black";
		ctx.stroke();
		if (this.fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
		else {ctx.closePath()}
	};
	Object.assign(exports.drawVertices.prototype, {
		addVertex: function(point) {this.vertices.push(point.x);this.vertices.push(point.y);return this},
		addVertices: function(points) {
			var point;
			for (var i=0; i<points.length; i++) {
				point = points[i];
				this.vertices.push(point.x);this.vertices.push(point.y);
			}
			return this;
		},
		getCtx: function() {return this.ctx},
		getFill: function() {return this.fill},
		getStroke: function() {return this.stroke},
		getVertices: function() {return this.vertices}
	});

	//vector
	exports.Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};
	Object.assign(exports.Vector.prototype, {
		getX: function() {return this.x},
		getY: function() {return this.y},
		set: function(x, y) {this.x = x;this.y = y;return this},
		setScalar: function(s) {this.x = s;this.y = s;return this},
		setX: function(x) {this.x = x;return this},
		setY: function(y) {this.y = y;return this}
	});

	//useFunc
    function useFunc(func) {
    	func.mainType = "Geometry";
    	Object.assign(func, {
    		setLineWidth: function(width) {this.ctx.lineWidth = width || 1;return this}
    	});
	};

	//geometries (this.position is now editable; thanks brain)
	exports.ArcGeometry = function(ctx, center, size, startAngle, endAngle, isCounter, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;
		this.sAngle = startAngle || 0; this.eAngle = endAngle || (2 * Math.PI);
		this.isCounter = isCounter || false;

		new exports.EllipseGeometry(this.ctx, this.position, this.size, this.size, 0, this.sAngle, this.eAngle, this.isCounter, this.stroke, this.fill);
	};
	exports.CircleGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.ArcGeometry(this.ctx, this.position, this.size, "", "", false, this.stroke, this.fill);
	};
	exports.DecagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 10, this.size, this.stroke, this.fill);
	};
	exports.EllipseGeometry = function(ctx, center, sizeX, sizeY, rotation, startAngle, endAngle, isCounter, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.sizeX = sizeX || 10; this.sizeY = sizeY || 15;
		this.rotation = rotation || 0;
		this.sAngle = startAngle || 0; this.eAngle = endAngle || (2 * Math.PI);
		this.isCounter = isCounter || false;

		ctx.beginPath();
		ctx.ellipse(this.position.x, this.position.y, this.sizeX, this.sizeY, this.rotation, this.sAngle, this.eAngle, this.isCounter);
		ctx.strokeStyle = this.stroke || "black";
    	ctx.stroke();
		if (this.fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
    	else {ctx.closePath()}
	};
	exports.HeptagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 7, this.size, this.stroke, this.fill);
	};
	exports.HexagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 6, this.size, this.stroke, this.fill);
	};
	exports.IcosagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 20, this.size, this.stroke, this.fill);
	};
	exports.LineGeometry = function(ctx, vertices, stroke) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.startingPoint = {x: vertices[0], y: vertices[1]};
		this.vertices = vertices || [100, 100, 200, 200];

		new exports.drawVertices(this.ctx, this.vertices, this.stroke);
	};
	exports.NonagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 9, this.size, this.stroke, this.fill);
	};
	exports.OctagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 8, this.size, this.stroke, this.fill);
	};
	exports.PentagonGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 5, this.size, this.stroke, this.fill);
	};
	exports.PolygonGeometry = function(ctx, center, sides, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = sides || 3;
		size = this.size;

		ctx.beginPath();
		ctx.moveTo (Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			ctx.lineTo (Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
		ctx.strokeStyle = this.stroke || "black";
		ctx.stroke();
		if (this.fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
		else {ctx.closePath()}
	};
	exports.SquareDiagonalGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 4, this.size, this.stroke, this.fill);
	};
	exports.SquareGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		var c = this.position, d = this.size;
		this.vertices = [
    	    c.x-d, c.y-d, //top left
    	    c.x+d, c.y-d, //top right
    	    c.x+d, c.y+d, //bottom right
    	    c.x-d, c.y+d, //bottom left
    	    c.x-d, c.y-d  //top left again
    	];
    	new exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
	};
	exports.TriangleGeometry = function(ctx, center, size, stroke, fill) {
		useFunc(this);
		this.ctx = ctx;
		this.stroke = stroke;
		this.fill = fill;
		this.position = center || new exports.Vector(100, 100);
		this.size = size || 10;

		new exports.PolygonGeometry(this.ctx, this.position, 3, this.size, this.stroke, this.fill);
	};

}));