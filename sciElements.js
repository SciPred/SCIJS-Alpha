//sciElements
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.sciElements = {}));
}(this, function (exports) {'use strict';
	//POLYFILLS, SETUPS AND CUSTOMS
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

	//ELEMENT FUNCTIONS and STUFF (meh, why not?)
	exports.appendToBody = function(elm) {
		elm = elm || document.createElement("P");
		document.body.appendChild(elm);
		return elm;
	};
	exports.appendToElement = function(docelm, elm) {
		docelm = docelm || document.body;
		elm = elm || document.createElement("P");
		docelm.appendChild(elm);
		return elm;
	};
	exports.appendToHead = function(elm) {
		elm = elm || document.createElement("P");
		document.head.appendChild(elm);
		return elm;
	};
	exports.createElement = function(type) {
		type = type || "P";
		var elm = document.createElement(type);
		return elm;
	};
	exports.equals = function(elm1, elm2) {return elm1 === elm2};
	exports.getContext = function(canvas, context, attributes) {return canvas.getContext(context, attributes)};
	exports.getDisplay = function(elm) {return elm.style.display};
	exports.getHeight = function(elm) {return elm.height || elm.style.height};
	exports.getInnerHTML = function(elm) {return elm.innerHTML};
	exports.getOpacity = function(elm) {return elm.style.opacity};
	exports.getSource = function(script) {return script.src};
	exports.getStyle = function(elm) {return elm.style};
	exports.getVisibility = function(elm) {return elm.style.visibility};
	exports.getWidth = function(elm) {return elm.width || elm.style.width};
	exports.preconstructor = window.Element.prototype || "unavailable";
	exports.this = exports;
	exports.toggleDisplay = function(elm) {
		if (elm.style.display === "none") {
			elm.style.display = "block";
		} else {
			elm.style.display = "none";
		}
		return elm;
	};
}));