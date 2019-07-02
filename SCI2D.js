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
	(global = global || self, factory(global.SCI2DBeta = function(arg) {return arg}));
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

/*
Polyfills
Vector
Scene
Geometritize (unoff.)
Geometries
*/
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SCI2D = {}));
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
	}//always put type and isThing

	exports.Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};
	Object.assign(exports.Vector.prototype, {
		type: "Vector",
		isVector: true,

		add: function(x, y) {
			this.x += Math.abs(x); //no trickery in my sight, bub
			this.y += Math.abs(y);
			return this;
		},
		addScalar: function(s) {
			this.add(s, s);
			return this;
		},
		angle: function () {
			// computes the angle in radians with respect to the positive x-axis
			var angle = Math.atan2( this.y, this.x );
			if ( angle < 0 ) angle += 2 * Math.PI;
			return angle;
		},
		clone: function () {
			return new this.constructor( this.x, this.y );
		},
		copy: function ( v ) {
			this.x = v.x;
			this.y = v.y;
			return this;
		},
		distanceTo: function ( v ) {
			return Math.sqrt( this.distanceToSquared( v ) );
		},
		distanceToSquared: function ( v ) {
			var dx = this.x - v.x, dy = this.y - v.y;
			return dx * dx + dy * dy;
		},
		divide: function(x, y) {
			this.x /= x;
			this.y /= y;
			return this;
		},
		divideScalar: function(s) {
			this.divide(s, s);
			return this;
		},
		equals: function ( v ) {
			return ( ( v.x === this.x ) && ( v.y === this.y ) );
		},
		fromVerticeArray: function(array) {
			this.x = array[0];
			this.y = array[1];
			return this;
		},
		getX: function() {return this.x},
		getY: function() {return this.y},
		hasScalarCoordinates: function() {return this.x === this.y},
		identity: function() {
			this.x = 0;
			this.y = 0;
			return this;
		},
		isBothNaN: function() {return isNaN(this.x) && isNaN(this.y)},
		isNaN: function() {return isNaN(this.x) || isNaN(this.y)},
		multiply: function(x, y) {
			this.x *= x;
			this.y *= y;
			return this;
		},
		multiplyScalar: function(s) {
			this.multiply(s, s);
			return this;
		},
		negate: function() {
			this.x = - this.x;
			this.y = - this.y;
			return this;
		},
		paste: function(v) {
			v.x = this.x;
			v.y = this.y;
			return v;
		},
		rotate: function(angle) {
			return this.rotateAround(new exports.Vector(), angle);
		},
		rotateAround: function ( center, angle ) {
			var c = Math.cos( angle ), s = Math.sin( angle );
			var x = this.x - center.x;
			var y = this.y - center.y;
			this.x = x * c - y * s + center.x;
			this.y = x * s + y * c + center.y;
			return this;
		},
		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
		setScalar: function(s) {
			this.set(s, s);
			return this;
		},
		setX: function(x) {this.x = x;return this},
		setY: function(y) {this.y = y;return this},
		subtract: function(x, y) {
			this.x -= Math.abs(x); //no trickery in my sight, bub
			this.y -= Math.abs(y);
			return this;
		},
		subtractScalar: function(s) {
			this.subtract(s, s);
			return this;
		},
		toVerticeArray: function() {
			return [this.x, this.y];
		},
		//array
		fromArray: function ( array, offset ) {
			if ( offset === undefined ) offset = 0;
			this.x = array[ offset ];
			this.y = array[ offset + 1 ];
			return this;
		},
		toArray: function ( array, offset ) {
			if ( array === undefined ) array = [];
			if ( offset === undefined ) offset = 0;
			array[ offset ] = this.x;
			array[ offset + 1 ] = this.y;
			return array;
		}
	});

	exports.Scene = function() {
		this.background = "#000000";
		this.geometries = [];
		this.autoClear = true;
	};
	Object.assign(exports.Scene.prototype, {
		type: "Scene",
		isScene: true,

		add: function(geometry) {
			this.geometries.push(geometry);
			return this;
		},
		empty: function() {
			this.geometries = [];
			return this;
		},
		render: function(canvas) {
			var ctx = canvas.getContext("2d");
			var halfW = canvas.width/2,
				halfH = canvas.height/2;
			var geometry, x, y, vector, vertex;

			if (this.autoClear) {ctx.clearRect(0, 0, canvas.width, canvas.height)}

			for (var i=0; i<this.geometries.length; i++) {
				geometry = this.geometries[i];
				ctx.beginPath();
				ctx.moveTo(geometry.vertices[0] + halfW, geometry.vertices[1] + halfH);
				for (var j=2; j<geometry.vertices.length; j+=2) {
					x = geometry.vertices[j];
					y = geometry.vertices[j+1];
					ctx.lineTo(x + halfW, y + halfH);
				}
				ctx.strokeStyle = geometry.stroke;
				ctx.stroke();
				if (geometry.fill === undefined) {ctx.closePath()}
				else {ctx.fillStyle = geometry.fill; ctx.fill()}
			}
		}
	});

	function Geometritize(func) {
		func.name = '';
		func.maintype = "Geometry";

		func.stroke = "#000000";
		func.fill = null;

		func.position = new exports.Vector();
		func.movement = new exports.Vector();
		func.rotation = 0; //angle
		func.vertices = [];

		Object.assign(func, {
			isGeometry: true,

			getString: function() {
				return func.toString();
			},
			rotate: function(angle) {
				angle = angle || func.rotation;
				return func.rotateAround(func.position, angle);
			},
			rotateAround: function(center, angle) {
				var vertex, vector, x, y, a = angle || 0;
				for (var i=0; i<func.vertices.length; i+=2) {
					x = func.vertices[i]; y = func.vertices[i + 1];
					vector = new exports.Vector(x, y);
					vertex = vector.rotateAround(center, a);
					func.vertices[i] = vertex.x; func.vertices[i + 1] = vertex.y;
				}
				return func;
			},
			setFill: function(fill) {
				func.fill = fill;
				return func;
			},
			setMovement: function(movement) {
				func.movement = movement || new exports.Vector(1, 1);
				return func;
			},
			setStroke: function(stroke) {
				func.stroke = stroke;
				return func;
			}
		});
	};

	//geometries
	exports.HexagonGeometry = function(size) {
		Geometritize(this);
		this.type = "HexagonGeometry";
		this.parameters = {
			size: size
		};
		this.size = size || 10;

		//nonset
		this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
		for (var i = 1; i <= 6; i += 1) {
			this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.position.y + this.size * Math.sin(i * 2 * Math.PI / 6));
		}

		this.set = function() {
			this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
			for (var i = 1; i <= 6; i += 1) {
				this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.position.y + this.size * Math.sin(i * 2 * Math.PI / 6));
			}
			return this;
		};
	};
	exports.PentagonGeometry = function(size) {
		Geometritize(this);
		this.type = "PentagonGeometry";
		this.parameters = {
			size: size
		};
		this.size = size || 10;

		//nonset
		this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
		for (var i = 1; i <= 5; i += 1) {
			this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / 5), this.position.y + this.size * Math.sin(i * 2 * Math.PI / 5));
		}

		this.set = function() {
			this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
			for (var i = 1; i <= 5; i += 1) {
				this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / 5), this.position.y + this.size * Math.sin(i * 2 * Math.PI / 5));
			}
			return this;
		};
	};
	exports.PolygonGeometry = function(vertices) {
		Geometritize(this);
		this.type = "RegPolGeometry";
		this.parameters = {
			vertices: vertices
		};
		this.vertices = vertices || [];
	};
	exports.RegPolGeometry = function(sides, size) {
		Geometritize(this);
		this.type = "RegPolGeometry";
		this.parameters = {
			sides: sides,
			size: size
		};
		this.size = size || 10;
		this.sides = sides || 3;

		//nonset
		this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
		for (var i = 1; i <= this.sides; i += 1) {
			this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / this.sides), this.position.y + this.size * Math.sin(i * 2 * Math.PI / this.sides));
		}

		this.set = function() {
			this.vertices.push(this.position.x + this.size * Math.cos(0), this.position.y + this.size *  Math.sin(0));
			for (var i = 1; i <= this.sides; i += 1) {
				this.vertices.push(this.position.x + this.size * Math.cos(i * 2 * Math.PI / this.sides), this.position.y + this.size * Math.sin(i * 2 * Math.PI / this.sides));
			}
			return this;
		};
	};
	exports.SquareGeometry = function(size) {
		Geometritize(this);
		this.type = "SquareGeometry";
		this.parameters = {
			size: size
		};
		this.size = size || 10;

		this.vertices = [
			this.position.x - this.size, this.position.y - this.size,
			this.position.x + this.size, this.position.y - this.size,
			this.position.x + this.size, this.position.y + this.size,
			this.position.x - this.size, this.position.y + this.size,
			this.position.x - this.size, this.position.y - this.size
		];
	};
}));