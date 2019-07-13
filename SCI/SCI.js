//REQUIRES HTML
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SCI = {}));
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
	function loadScript(url) {
		var script = document.createElement("script");
		script.src = "SCIJS-Alpha/SCI/" + url;
		document.head.appendChild(script);
	}
	function loadStyle(href) {
		var link = document.createElement("link");
		link.href = "SCIJS-Alpha/SCI/" + href;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.media = 'all';
		document.head.appendChild(link);
		return link;
	};

	//LOADERS
	loadScript("minors/protos.js");
	loadScript("minors/element.js");
	loadStyle("minors/styles.css");

}));