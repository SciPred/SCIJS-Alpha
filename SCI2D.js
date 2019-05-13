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
_Math
renderScene (anonymous) and Scene
Vector
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

	var _Math = {
		type: "Math",
		isMath: true,

		add: function (values) {
			var count = 0;
			for (var i=0; i<values.length; i++) {
				count += values[i];
			}
			return count;
		},
		multiply: function (values) {
			var count = 1;
			for (var i=0; i<values.length; i++) {
				if (values[i]==0) {
					return 0;
				}
				if (typeof values[i] !== 'number') {
					return NaN;
				}
				count *= values[i];
			}
			return count;
		},
		DEG2RAD: Math.PI / 180,
		RAD2DEG: 180 / Math.PI,
		FRAME: 100/6,
		generateUUID: ( function () {
			var lut = [];
			for ( var i = 0; i < 256; i ++ ) {
				lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );
			}
			return function generateUUID() {
				var d0 = Math.random() * 0xffffffff | 0;
				var d1 = Math.random() * 0xffffffff | 0;
				var d2 = Math.random() * 0xffffffff | 0;
				var d3 = Math.random() * 0xffffffff | 0;
				var uuid = lut[ d0 & 0xff ] + lut[ d0 >> 8 & 0xff ] + lut[ d0 >> 16 & 0xff ] + lut[ d0 >> 24 & 0xff ] + '-' +
					lut[ d1 & 0xff ] + lut[ d1 >> 8 & 0xff ] + '-' + lut[ d1 >> 16 & 0x0f | 0x40 ] + lut[ d1 >> 24 & 0xff ] + '-' +
					lut[ d2 & 0x3f | 0x80 ] + lut[ d2 >> 8 & 0xff ] + '-' + lut[ d2 >> 16 & 0xff ] + lut[ d2 >> 24 & 0xff ] +
					lut[ d3 & 0xff ] + lut[ d3 >> 8 & 0xff ] + lut[ d3 >> 16 & 0xff ] + lut[ d3 >> 24 & 0xff ];
				return uuid.toUpperCase();
			};
		} )(),
		deg2rad: function (degrees) {
			return degrees*Math.PI/180;
		},
        rad2deg: function (radians) {
			return radians*180/Math.PI;
		}
	};

	function renderScene(ctx, scene) {
		var ellipse, geometry, vertices;
		var x, y;

		canvas.width = canvas.width;
		ctx.canvas.style.background = scene.background;

		if (scene.ellipses !== []) {
			for (var i=0; i<scene.ellipses.length; i++) {
				ellipse = scene.ellipses[i];
				x = ellipse.position.x; y = ellipse.position.y;

				ctx.beginPath();
				ctx.setLineDash(ellipse.dashedSegments);
				ctx.ellipse(x, y, ellipse.radiusX, ellipse.radiusY, ellipse.rotation, ellipse.startAngle, ellipse.endAngle, ellipse.isCounter);
				ctx.setLineDash([]);
				ctx.strokeStyle = ellipse.stroke || 'black';
				ctx.stroke();
				if (ellipse.fill !== undefined) {ctx.fillStyle = ellipse.fill; ctx.fill()}
				else {ctx.closePath()}
			}
		}
		if (scene.geometries !== []) {
			for (var i=0; i<scene.geometries.length; i++) {
				geometry = scene.geometries[i];
				vertices = geometry.vertices;

				ctx.beginPath();
				ctx.setLineDash(geometry.dashedSegments);
				ctx.moveTo(vertices[0], vertices[1]);
				for (var j=2; j<vertices.length; j+=2) {
					ctx.lineTo(vertices[j], vertices[j + 1]);
				}
				ctx.setLineDash([]);
				ctx.strokeStyle = geometry.stroke || 'black';
				ctx.stroke();
				if (geometry.fill !== undefined) {ctx.fillStyle = geometry.fill; ctx.fill()}
				else {ctx.closePath()}
			}
		}
		if (scene.vertices !== []) {
			ctx.beginPath();
			ctx.setLineDash(scene.verticesDashSegments);
			ctx.moveTo(scene.vertices[0], scene.vertices[1]);
			for (var i=2; i<scene.vertices.length; i+=2) {
				ctx.lineTo(scene.vertices[i], scene.vertices[i + 1]);
			}
			ctx.setLineDash([]);
			ctx.strokeStyle = scene.verticesStroke || 'black';
			ctx.stroke();
			ctx.closePath();
		}
	}

	exports.loop = function(func) {
		requestAnimationFrame(func);
		return func;
	};

	exports.Scene = function() {
		this.background = 'white';

		this.vertices = [];
		this.verticesDashSegments = [];
		this.verticesStroke = null;
		this.geometries = []; //focus on vertices
		this.ellipses = []; //say, [{r:'', stroke:'', fill:'', rot:''}, {etc.}, {etc.}], pos and movement included
	};
	Object.assign(exports.Scene.prototype, {
		type: "Scene",
		isScene: true,

		add: function(geometry) {
			if (geometry.elliptical) {
				this.ellipses[this.ellipses.length] = geometry;
				return this;
			} else {
				this.geometries[this.geometries.length] = geometry;
				return this;
			}
		},
		addVertices: function(vertices) {
			this.vertices.push(vertices);
			return this;
		},
		empty: function() {
			this.vertices = [];
			this.verticesDashSegments = [];
			this.verticesStroke = null;
			this.geometries = [];
			this.ellipses = [];
			return this;
		},
		placeOnCanvas: function(ctx) {
			if (ctx.canvas === undefined) {renderScene(ctx.getContext("2d"), this);}
			else {renderScene(ctx, this);}
		}
	});
	exports.Scene.prototype.placeOnCanvas.information = function() {
		console.log("SCI2D INFORMATION: Scene.placeOnCanvas");
		console.log("The argument \"ctx\" does not necessarily have to be the ctx itself, you can also use the canvas itself.");
		console.warn("Any other argument than a ctx or a canvas handler will not work.");
		console.dir("LOG: Scene information will be written below when in Google Console:");
		return exports.Scene;
	};

	exports.Vector = function(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	};
	Object.assign(exports.Vector.prototype, {
		type: "Vector",
		isVector: true,

		clone: function () {
			return new this.constructor( this.x, this.y );
		},
		copy: function ( v ) {
			this.x = v.x;
			this.y = v.y;
			return this;
		},
		getX: function() {return this.x},
		getY: function() {return this.y},
		negate: function() {
			this.x = - this.x;
			this.y = - this.y;
			return this;
		},
		rotate: function(theta) { //degrees
			var x = this.x, y = this.y;
			var a = theta || 90;
			var cos = Math.cos(a), sin = Math.sin(a);
			this.x = (x * cos) - (y * sin);
			this.y = (x * sin) + (y * cos);
			return this;
		},
		rotateMatrix: function(n11, n12, n21, n22) { //untriged
			var x = this.x; y = this.y;
			this.x = (x * n11) - (y * n21);
			this.y = (x * n12) + (y * n22);
			return this;
		},
		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
		setScalar: function(s) {this.set(s, s)},
		setX: function(x) {this.x = x;return this},
		setY: function(y) {this.y = y;return this},
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

	function Geometritize(func) {
		func.uuid = _Math.generateUUID();
		func.name = '';
		func.maintype = "Geometry";

		func.stroke = null;
		func.fill = null;
		func.position = new exports.Vector(100, 100);

		func.dashedSegments = []; //for setLineDash(). This is for the stroke. Always remember to put setLineDash([]) after setLineDash([segments]).

		Object.assign(func, {
			isGeometry: true,

			addToScene: function(scene) {
				scene.add(func);
				return scene;
			},
			setFill: function(fill) {
				func.fill = fill;
				return func;
			},
			setStroke: function(stroke) {
				func.stroke = stroke;
				return func;
			}
		});
	};

	//NON-ELLIPTICAL GEOMETRY
	exports.BoxGeometry = function(width, height) {
		Geometritize(this);
		this.type = "BoxGeometry";
		this.elliptical = false;
		this.parameters = {
			width: width,
			height: height
		};

		this.width = width || 1;
		this.height = height || 1;

		var c = this.position;
		var w = this.width/2, h = this.height/2;

		this.vertices = [
			c.x-w, c.y-h,
			c.x-w, c.y+h,
			c.x+w, c.y+h,
			c.x+w, c.y-h,
			c.x-w, c.y-h
		];
	};
	Object.assign(exports.BoxGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			var c = this.position;
			var w = this.width/2, h = this.height/2;

			this.vertices = [
				c.x-w, c.y-h,
				c.x-w, c.y+h,
				c.x+w, c.y+h,
				c.x+w, c.y-h,
				c.x-w, c.y-h
			];
			return this;
		},
		setDimensions: function(width, height) {
			this.width = width || 1; this.height = height || 1;
			var c = this.position;
			var w = this.width/2, h = this.height/2;

			this.vertices = [
				c.x-w, c.y-h,
				c.x-w, c.y+h,
				c.x+w, c.y+h,
				c.x+w, c.y-h,
				c.x-w, c.y-h
			];
			return this;
		}
	});
	exports.DecagonGeometry = function(size) {
		Geometritize(this);
		this.type = "DecagonGeometry";
		this.elliptical = false;
		this.parameters = {
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 10;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.DecagonGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 10;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});
	exports.OctagonGeometry = function(size) {
		Geometritize(this);
		this.type = "OctagonGeometry";
		this.elliptical = false;
		this.parameters = {
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 8;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.OctagonGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 8;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});
	exports.PentagonGeometry = function(size) {
		Geometritize(this);
		this.type = "PentagonGeometry";
		this.elliptical = false;
		this.parameters = {
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 5;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.PentagonGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 5;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});
	exports.PolygonGeometry = function(sides, size) {
		Geometritize(this);
		this.type = "PolygonGeometry";
		this.elliptical = false;
		this.parameters = {
			sides: sides,
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = sides || 3;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.PolygonGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = this.parameters.sides || 3;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});
	exports.TiltedSquareGeometry = function(size) {
		Geometritize(this);
		this.type = "TiltedSquareGeometry";
		this.elliptical = false;
		this.parameters = {
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 4;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.TiltedSquareGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 4;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});
	exports.TrapezoidGeometry = function(base1, base2, height) {
		Geometritize(this);
		this.type = "TrapezoidGeometry";
		this.elliptical = false;
		this.parameters = {
			base1: base1,
			base2: base2,
			height: height
		};

		this.base1 = base1 || 10;
		this.base2 = base2 || 15;
		this.width = (base1 + base2)/2; //average
		this.height = height || 10;

		var c = this.position;
		var b1 = this.base1/2, b2 = this.base2/2, h = this.height/2;

		this.vertices = [
			c.x-b1, c.y-h,
			c.x+b1, c.y-h,
			c.x+b2, c.y+h,
			c.x-b2, c.y+h,
			c.x-b1, c.y-h
		];
	};
	Object.assign(exports.TrapezoidGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			var c = this.position;
			var b1 = this.base1/2, b2 = this.base2/2, h = this.height/2;

			this.vertices = [
				c.x-b1, c.y-h,
				c.x+b1, c.y-h,
				c.x+b2, c.y+h,
				c.x-b2, c.y+h,
				c.x-b1, c.y-h
			];
			return this;
		},
		setDimensions: function(base1, base2, height) {
			this.width = (base1 + base2)/2; this.height = height || 10;
			var c = this.position;
			var b1 = this.base1/2, b2 = this.base2/2, h = this.height/2;

			this.vertices = [
				c.x-b1, c.y-h,
				c.x+b1, c.y-h,
				c.x+b2, c.y+h,
				c.x-b2, c.y+h,
				c.x-b1, c.y-h
			];
			return this;
		}
	});
	exports.TriangleGeometry = function(size) {
		Geometritize(this);
		this.type = "TriangleGeometry";
		this.elliptical = false;
		this.parameters = {
			size: size
		};
		this.size = size || 10;
		this.vertices = [];

		var c = this.position;
		var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 3;
		size = this.size;

		this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
		for (var i = 1; i <= numberOfSides;i += 1) {
			this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
		}
	};
	Object.assign(exports.TriangleGeometry.prototype, {
		setCenter: function(center) {
			this.position = center || new exports.Vector(100, 100);
			this.vertices = [];

			var c = this.position;
			var Xcenter = c.x, Ycenter = c.y,
		    numberOfSides = 3;
			var size = this.size;

			this.vertices.push(Xcenter +  size * Math.cos(0), Ycenter +  size *  Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				this.vertices.push(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			return this;
		},
		setSize: function(size) {
			this.size = size || 10;
			this.setCenter(this.position);
			return this;
		}
	});

	//ELLIPTICAL GEOMETRY (no need for setCenter)
	exports.ArcGeometry = function(radius, startAngle, endAngle, isCounter) {
		Geometritize(this);
		this.type = "ArcGeometry";
		this.elliptical = true;
		this.parameters = {
			radius: radius,
			startAngle: startAngle,
			endAngle: endAngle,
			isCounter: isCounter
		};
		this.rotation = 0;

		radius = radius || 1;
		startAngle = startAngle || 0;
		endAngle = endAngle || 2 * Math.PI;
		isCounter = isCounter || false;

		this.radiusX = radius;
		this.radiusY = radius;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.isCounter = isCounter;
	};
	exports.CircleGeometry = function(radius) {
		Geometritize(this);
		this.type = "ArcGeometry";
		this.elliptical = true;
		this.parameters = {
			radius: radius
		};
		this.rotation = 0;

		radius = radius || 1;

		this.radiusX = radius;
		this.radiusY = radius;
		this.startAngle = 0;
		this.endAngle = 2 * Math.PI;
		this.isCounter = false;
	};
	exports.EllipseGeometry = function(radiusX, radiusY, startAngle, endAngle, isCounter) {
		Geometritize(this);
		this.type = "EllipseGeometry";
		this.elliptical = true;
		this.parameters = {
			radiusX: radiusX,
			radiusY: radiusY,
			startAngle: startAngle,
			endAngle: endAngle,
			isCounter: isCounter
		};
		this.rotation = 0;

		radiusX = radiusX || 1;
		radiusY = radiusY || 1;
		startAngle = startAngle || 0;
		endAngle = endAngle || 2 * Math.PI;
		isCounter = isCounter || false;

		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.startAngle = startAngle;
		this.endAngle = endAngle;
		this.isCounter = isCounter;
	};


	exports.Math = _Math;
}));