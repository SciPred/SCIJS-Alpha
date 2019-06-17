//sciElements
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.sciElements = function(tag) { //element constructor
		this.tag = tag || "P"; //tagName
		this.id = "";
		this.classes = [];
		this.name = "";
		this.attributes = {};
		this.style = {};
	}));
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
	function setThing(func, ms, isInterval) {
		if (isInterval) {
			return setInterval(func, ms);
		} else {
			return setTimeout(func, ms);
		}
	}
	function toggle(thing, a1, a2) {
		if (thing == a1) {
			thing = a2;
			return thing;
		} else {
			thing = a1;
			return thing;
		}
	}

	

	//NORMAL ELEMENT FUNCTIONS and STUFF (meh, why not?)
	exports.appear = function(elm, ms, isInterval) {
		ms = ms || 0; //instant
		function pop() {elm.style.display="block";return elm}
		if (isInterval) {
			return setInterval(pop, ms);
		} else {
			return setTimeout(pop, ms);
		}
	}
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
	exports.click = function(button, times) {
		times = times || 1;
		for (var i=0; i<times; i++) {button.click();}
		return button;
	};
	exports.createElement = function(type) {
		type = type || "P";
		var elm = document.createElement(type);
		return elm;
	};
	exports.disappear = function(elm, ms, isInterval) {
		ms = ms || 0; //instant
		function pop() {elm.style.display="none";return elm}
		if (isInterval) {
			return setInterval(pop, ms);
		} else {
			return setTimeout(pop, ms);
		}
	}
	exports.equals = function(elm1, elm2) {return elm1 === elm2};
	exports.getAutofocus = function(elm) {return elm.autofocus};
	exports.getColor = function(elm) {return elm.style.color};
	exports.getContext = function(canvas, context, attributes) {return canvas.getContext(context, attributes)};
	exports.getContext2D = function(canvas, attributes) {return canvas.getContext("2d", attributes)}; //was going to add for webgl but it might flop
	exports.getDisplay = function(elm) {return elm.style.display};
	exports.getHeight = function(elm) {return elm.height || elm.style.height};
	exports.getInnerHTML = function(elm) {return elm.innerHTML};
	exports.getOpacity = function(elm) {return elm.style.opacity};
	exports.getSource = function(script) {return script.src};
	exports.getStyle = function(elm) {return elm.style};
	exports.getTagName =function(elm) {return elm.tagName};
	exports.getType = function(elm) {return elm.type};
	exports.getValidity = function(btn) {return btn.validity};
	exports.getVisibility = function(elm) {return elm.style.visibility};
	exports.getWidth = function(elm) {return elm.width || elm.style.width};
	exports.halfOpacity = function(elm) {elm.style.opacity = "0.5"; return elm};
	exports.importSci = function() {
		var script = document.createElement("script");
		script.src = "SCIJS-Alpha/sciMainAlpha.js";
		document.head.appendChild(script);
		return script;
	};
	exports.preconstructor = window.Element.prototype || "unavailable";
	exports.self = exports;
	exports.setSquareDimensions = function(elm, isWidthToHeight) {
		isWidthToHeight = isWidthToHeight || false;
		if (isWidthToHeight) {
			elm.style.height = elm.style.width;
			return elm;
		} else {
			elm.style.width = elm.style.height;
			return elm;
		}
	};
	exports.this = this;
	exports.toggleDisplay = function(elm) {
		if (elm.style.display === "none") {
			elm.style.display = "block";
		} else {
			elm.style.display = "none";
		}
		return elm;
	};
	exports.toggleOpacity = function(elm, opacity1, opacity2) {
		opacity1 = opacity1 || "1";
		opacity2 = opacity2 || "0";
		toggle(elm.style.opacity, opacity1, opacity2);
	};



	//SCIELEMENT FUNCTIONS (prototype)
	Object.assign(exports.prototype, {
		type: "sciElements",

		addAttributes: function(attributes) {
			attributes = attributes || {};
			Object.assign(this.attributes, attributes);
			return this;
		},
		appendTo: function(elm) {
			elm = elm || document.body;
			elm.appendChild(this.makeElement());
			return elm;
		},
		appendToBody: function() {
			return this.appendTo();
		},
		appendToElements: function() {
			var elm;
			for (var i=0; i<arguments.length; i++) {
				elm = arguments[i];
				this.appendTo(elm);
			}
			return this;
		},
		appendToHead: function() {
			return this.appendTo(document.head);
		},
		clearAllAttributes: function() {
			var tag = this.tag;
			this.empty();
			this.tag = tag;
			return this;
		},
		empty: function() {
			this.tag = "P";
			this.id = "";
			this.classes = [];
			this.name = "";
			this.attributes = {};
			this.style = {};
			return this;
		},
		makeAndReset: function() {
			var elm = this.makeElement();
			this.empty();
			return elm;
		},
		makeElement: function() {
			var elm = document.createElement(this.tag);
			for (var i=0; i<this.classes.length; i++) {
				elm.classList.add(this.classes[i]);
			}
			if (this.id !== "") {elm.setAttribute("id", this.id);}
			if (this.name !== "") {elm.setAttribute("name", this.name);}
			Object.assign(elm, this.attributes);
			Object.assign(elm.style, this.style);
			return elm;
		},
		makeElements: function(times) {
			times = times || 2;
			for (var i=0; i<times; i++) {
				this.makeElement();
			}
			return this;
		},
		raw: function() {
			return document.createElement(this.tag);
		},
		setInnerHTML: function(data) {
			data = data || "";
			Object.assign(this.attributes, {innerHTML: data});
		},
		setTag: function(tag) {
			tag = tag || "P";
			this.tag = tag;
			return this;
		}
	});
}));

//SELM
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SELM = {}));
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
	/*NOTE:
	Editing exports.prototype will affect Object.prototype.
	E.g. exports.prototype.VERSION => Object.prototype.VERSION
	But SELM is not a constructor so that won't happen. I think.
	*/





	/*FUNCTIONS and CONSTRUCTORS*/
	

	//main//
	exports.Element = sciElements || "unavailable";



	//to alpha-ups
	exports.dimensionEditor = function(element) {
		if (element === undefined || typeof element === "string" || typeof element === "boolean" || typeof element === "number") {
			console.error("SELM.dimensionEditor: element is not definable for the constructor");
			return;
		}
		this.element = element;
		this.width = 0;
		this.height = 0;
	};
	Object.assign(exports.dimensionEditor.prototype, {
		check: function() {
			if (this.element === undefined) {
				console.error("SELM.dimensionEditor: element is undefined");
			}
			if (typeof this.width !== "number") {
				console.error("SELM.dimensionEditor: width is not a number");
			}
			if (typeof this.height !== "number") {
				console.error("SELM.dimensionEditor: height is not a number");
			}
			return this;
		},
		isRectangular: function() {
			return this.width !== this.height;
		},
		isSquare: function() {
			return this.width === this.height;
		},
		isZero: function() {
			return this.width === 0 && this.height === 0;
		},
		reset: function() {
			this.width = 0;
			this.height = 0;
			return this;
		},
		set: function(w, h) {
			this.width = w !== undefined ? w : this.width;
			this.height = h !== undefined ? h : this.height;
			this.element.style.width = this.width;
			this.element.style.height = this.height;
			return this;
		}
	});

	exports.displayToggler = function(elements) {
		if (Array.isArray(elements) === false) {elements = [elements]}
		if (elements === undefined || Array.isArray(elements) === false) {
			console.error("SELM.displayToggler: elements is not an array of elements");
			return;
		}
		this.elements = elements;
		this.displayTypes = ["block", "none"];
		this.currentDisplayNumber = 0;
		this.setElementsDisplay = function() {
			for (var i=0; i<this.elements.length; i++) {
				this.elements[i].style.display = this.displayTypes !== undefined ? this.displayTypes[this.currentDisplayNumber] : "block";
			}
		};
		this.setElementsDisplay();
	};
	Object.assign(exports.displayToggler.prototype, {
		add: function(displayType) {
			this.displayTypes.push(displayType);
			//does not reset currentDisplayNumber to 0
			//nor does it activate setElementsDisplay because it's unaffected
			return this;
		},
		getCurrentDisplay: function() {
			return this.displayTypes[this.currentDisplayNumber];
		},
		getDisplayTypes: function() {
			return this.displayTypes;
		},
		next: function(n) {
			var num = typeof n === "number" && n !== 0 ? Math.abs(n) : 1;
			this.currentDisplayNumber += num;
			if (this.currentDisplayNumber > this.displayTypes.length) {this.currentDisplayNumber = 0}
			this.setElementsDisplay();
			return this;
		},
		previous: function(n) {
			var num = typeof n === "number" && n !== 0 ? Math.abs(n) : 1;
			this.currentDisplayNumber -= num;
			if (this.currentDisplayNumber < 0) {this.currentDisplayNumber = this.displayTypes.length}
			this.setElementsDisplay();
			return this;
		},
		reverse: function() {
			this.displayTypes.reverse();
			return this;
		}
	});

	exports.elementDisplay = function(elements) { //e.g. slideshows
		if (Array.isArray(elements) === false) {elements = [elements]}
		if (elements === undefined || Array.isArray(elements) === false) {
			console.error("SELM.elementShow: elements is not an array of elements");
			return;
		}
		this.elements = elements;
		this.currentElementNumber = 0;
		this.commonDisplay = "none";
		this.uniqueDisplay = "block";
		this.setElementsDisplay = function() {
			for (var i=0; i<this.elements.length; i++) {
				if (i !== this.currentElementNumber) {
					this.elements[i].style.display = this.commonDisplay !== undefined ? this.commonDisplay : "none";
				} else {
					this.elements[i].style.display = this.uniqueDisplay !== undefined ? this.uniqueDisplay : "block";
				}
			}
		};
		this.setElementsDisplay();
	};
	Object.assign(exports.elementDisplay.prototype, {
		getCurrentElement: function() {
			return this.elements[this.currentElementNumber];
		},
		getNumber: function() {
			return this.currentElementNumber;
		},
		next: function(n) {
			var num = typeof n === "number" && n !== 0 ? Math.abs(n) : 1;
			this.currentElementNumber += num;
			if (this.currentElementNumber > this.elements.length) {this.currentDisplayNumber = 0}
			this.setElementsDisplay();
			return this;
		},
		previous: function(n) {
			var num = typeof n === "number" && n !== 0 ? Math.abs(n) : 1;
			this.currentElementNumber -= num;
			if (this.currentElementNumber < 0) {this.currentDisplayNumber = this.elements.length}
			this.setElementsDisplay();
			return this;
		},
		setNewElements: function(elements) {
			if (elements !== undefined && Array.isArray(elements)) {this.elements = elements}
			this.setElementsDisplay();
			return this;
		},
		setNumber: function(n) {
			var num = typeof n === "number" ? n : 0;
			this.currentElementNumber = num;
			this.setElementsDisplay();
			return this;
		}
	});

	exports.zIndexEditor = function(elements) {
		if (Array.isArray(elements) === false) {elements = [elements]}
		if (elements === undefined || Array.isArray(elements) === false) {
			console.error("SELM.zEditor: elements is not an array of elements");
			return;
		}
		this.elements = elements;
		this.z = 0;
		this.setZ = function() {
			for (var i=0; i<this.elements.length; i++) {
				this.elements[i].style.zIndex = this.z;
			}
		};
		//auto
		this.setZ();
	};
	Object.assign(exports.zIndexEditor.prototype, {
		getZ: function() {return this.z},
		minus: function(n) {
			var num = typeof n === "number" && n > 0 ? n : 1;
			this.z -= num;
			this.setZ();
			return this;
		},
		plus: function(n) {
			var num = typeof n === "number" && n > 0 ? n : 1;
			this.z += num;
			this.setZ();
			return this;
		},
		set: function(z) {
			this.z = z !== undefined ? z : this.z;
			this.setZ();
			return this;
		}
	});



	//element functions
	exports.Anchor = function(href) {
		exports.Element.call(this);
		this.tag = "A";
		this.attributes.href = typeof href === "string" ? href : null;
	};
	exports.Anchor.prototype = exports.Element.prototype;

	exports.Button = function(onclick) {
		exports.Element.call(this);
		this.tag = "BUTTON";
		this.attributes.onclick = typeof onclick === "function" ? onclick : null;
	};
	exports.Button.prototype = exports.Element.prototype;

	exports.Paragraph = function() {
		exports.Element.call(this);
		this.tag = "P";
	};
	exports.Paragraph.prototype = exports.Element.prototype;

	exports.Script = function(src) {
		exports.Element.call(this);
		this.tag = "SCRIPT";
		this.attributes.src = typeof src === "string" ? src : 'SCIJS-Alpha/sciMainAlpha.js';
	};
	exports.Script.prototype = exports.Element.prototype;

}));