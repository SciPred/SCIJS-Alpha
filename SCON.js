//SCON for sciConstructors
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SCON = {}));
}(this, function (exports) {'use strict';
	//Polyfills
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



	//Functions (alpha order)
	exports.Array = function(items) {
		this.contents = [];
		for (var i=0; i<arguments.length; i++) {
			this.contents[i] = arguments[i];
		}
	};
	Object.assign(exports.Array, {
		isArray: function(array) {
			var arr = array.constructor === exports.Array ? array.contents : array;
			return Array.isArray(arr);
		}
	});
	Object.assign(exports.Array.prototype, {
		constructor: exports.Array,
		isArray: true,
		type: "Array",

		clone: function() {
			return new this.constructor().copy(this);
		},
		concat: function(arrays) {
			for (var i=0; i<arguments.length; i++) {
				if (arguments[i].constructor === exports.Array) {
					this.contents.concat(arguments[i].contents);
				} else {
					this.contents.concat(arguments[i]);
				}
			}
			return this.contents;
		},
		containsUndefined: function() {
			//not sure if this is OK
			for (var i=0; i<this.contents.length; i++) {
				if (this.contents[i] === undefined) {return true;}
			}
			return false;
		},
		copy: function(array) {
			if (array.constructor === exports.Array) {
				this.contents = array.contents;
			} else {
				this.contents = array;
			}
			return this;
		},
		copyWithin: function(target, start, end) {
			return this.contents.copyWithin(target, start, end);
		},
		empty: function() {
			this.contents = [];
			return this;
		},
		entries: function() {
			return this.contents.entries();
		},
		equals: function(array) {
			var arr = array.constructor === exports.Array ? array.contents : array;
			for (var i=0; i<arr.length; i++) {
				if (arr[i] !== this.contents[i]) {return false}
			}
			return true;
		},
		every: function(checker) {
			return this.contents.every(checker);
		},
		fill: function(value, start, end) {
			return this.contents.fill(value, start, end);
		},
		filter: function(checker, thisValue) {
			return this.contents.filter(checker, thisValue);
		},
		find: function(checker, thisValue) {
			return this.contents.find(checker, thisValue);
		},
		findIndex: function(checker, thisValue) {
			return this.contents.findIndex(checker, thisValue);
		},
		forEach: function(editorFn, thisValue) {
			return this.contents.forEach(editorFn, thisValue);
		},
		from: function(object, mapFn, thisValue) {
			return this.contents.from(object, mapFn, thisValue);
		},
		hasLength: function(comparer) {
			return comparer === this.contents.length;
		},
		includes: function(element, start) {
			return this.contents.includes(element, start);
		},
		indexOf: function(item, start) {
			return this.contents.indexOf(item, start);
		},
		isEmpty: function() {
			return this.contents === [] || this.contents === undefined; 
		},
		isNotEmpty: function() {
			//is this the best idea?
			return this.contents.length !== 0;
		},
		join: function(separator) {
			this.contents.join(separator);
			return this.contents;
		},
		keys: function() {
			return this.contents.keys();
		},
		lastIndexOf: function(item, start) {
			return this.contents.lastIndexOf(item, start);
		},
		length: function() {
			return this.contents.length;
		},
		map: function(Fn, thisValue) {
			return this.contents.map(Fn, thisValue);
		},
		pop: function(getContents) {
			if (getContents) {
				this.contents.pop();
				return this.contents;
			} else {
				return this.contents.pop();
			}
		},
		push: function(items) {
			for (var i=0; i<arguments.length; i++) {
				this.contents.push(arguments[i]);
			}
			return this.contents;
		},
		reduce: function(Fn, initialValue) {
			return this.contents.reduce(Fn, initialValue);
		},
		reduceRight: function(Fn, initialValue) {
			return this.contents.reduceRight(Fn, initialValue);
		},
		reverse: function() {
			return this.contents.reverse();
		},
		shift: function(isUn) {
			if (isUn) {return this.unshift()}
			return this.contents.shift();
		},
		slice: function(start, end) {
			return this.contents.slice(start, end);
		},
		some: function(Fn, thisValue) {
			return this.contents.some(Fn, thisValue);
		},
		sort: function(comparator) {
			return this.contents.sort(comparator);
		},
		splice: function(index, howmany, item1, item2, item3, item4, item5) { //max 5
			return this.contents.splice(index, howmany, item1, item2, item3, item4, item5);
		},
		toNumber: function() {
			return Number(this.toString());
		},
		toString: function() {
			return this.contents.toString();
		},
		unshift: function() {
			return this.contents.unshift();
		},
		valueOf: function() {
			return this.contents.valueOf();
		}
	});
	exports.Boolean = function(value) {
		this.value = value || true;
	};
	Object.assign(exports.Boolean, {
		isBinaricBoolean: function(boolean) {
			var bool = boolean.constructor === exports.Boolean ? boolean.value : boolean;
			return bool == 0 || bool == 1;
		},
		isBoolean: function(boolean) {
			var bool = boolean.constructor === exports.Boolean ? boolean.value : boolean;
			return bool === true || bool === false;
		}
	});
	Object.assign(exports.Boolean.prototype, {
		constructor: exports.Boolean,
		isBoolean: true,
		type: "Boolean",

		clone: function() {
			return new this.constructor().copy(this);
		},
		copy: function(boolean) {
			this.value = boolean.constructor === exports.Boolean ? boolean.value : boolean;
			return this.value;
		},
		equals: function(boolean) {
			if (boolean.constructor === exports.Boolean) {
				return boolean.value = this.value;
			}
			return boolean = this.value;
		},
		isFalse: function() {
			return this.value === false;
		},
		isTrue: function() {
			return this.value === true;
		},
		toNumber: function() {
			if (this.value === true) {return 1}
			return 0;
		},
		toString: function() {
			return this.value.toString();
		},
		valueOf: function() {
			return this.value.valueOf();
		}
	});
	exports.Number = function(value) {
		this.value = Number(value) || 0;
	};
	Object.assign(exports.Number, {
		NEGATIVE_INFINITY: -Infinity,
		POSITIVE_INFINITY: Infinity,
		UNDEFINED: undefined,

		isNumber: function(number) {
			var num = number.constructor === exports.Number ? number.value : number;
			return typeof num === "number" || num === Infinity || num === -Infinity;
		}
	});
	Object.assign(exports.Number.prototype, {
		constructor: exports.Number,
		isNumber: true,
		type: "Number",

		add: function(items) {
			for (var i=0; i<arguments.length; i++) {
				this.value += Number(arguments[i]);
			}
			return this.value;
		},
		ceil: function() {
			this.value = Math.ceil(this.value);
			return this.value;
		},
		clone: function() {
			return new this.constructor().copy(this);
		},
		copy: function(number) {
			var num = number.constructor === exports.Number ? number.value : number;
			this.value = num;
			return this.value;
		},
		divide: function(items) {
			for (var i=0; i<arguments.length; i++) {
				this.value /= Number(arguments[i]);
			}
			return this.value;
		},
		floor: function() {
			this.value = Math.floor(this.value);
			return this.value;
		},
		moveDecimalPoint: function(times, toRight) {
			times = Number(times) || 1;
			toRight = toRight || false;
			for (var i=0; i<times; i++) {
				if (toRight) {
					this.value *= 10;
				} else {
					this.value /= 10;
				}
			}
			return this.value;
		},
		multiply: function(items) {
			for (var i=0; i<arguments.length; i++) {
				this.value *= Number(arguments[i]);
			}
			return this.value;
		},
		round: function() {
			this.value = Math.round(this.value);
			return this.value;
		},
		subtract: function(items) {
			for (var i=0; i<arguments.length; i++) {
				this.value -= Number(arguments[i]);
			}
			return this.value;
		},
		toExponential: function(fractionDigits) {
			return this.value.toExponential(fractionDigits);
		},
		toFixed: function(nearest) {
			return this.value.toFixed(nearest);
		},
		toPrecision: function(precision) {
			return this.value.toPrecision(precision);
		},
		toString: function() {
			return this.value.toString();
		},
		valueOf: function() {
			return this.value.valueOf();
		}
	});
	exports.String = function(string) {
		this.string = string || "Hello World!";
		this.length = this.string.length;
	};
	Object.assign(exports.String, {
		isString: function(string) {
			var str = string.constructor === exports.String ? string.string : string;
			return typeof str === "string";
		}
	});
	Object.assign(exports.String.prototype, {
		constructor: exports.String,
		isString: true,
		type: "String",

		charAt: function(pos) {
			return this.string.charAt(pos);
		},
		charCodeAt: function(pos) {
			return this.string.charCodeAt(pos);
		},
		clone: function() {
			return new this.constructor().copy(this);
		},
		concat: function(strings) {
			for (var i=0; i<arguments.length; i++) {
				this.string.concat(arguments[i]);
			}
			return this.value;
		},
		copy: function(string) {
			var str = string.constructor === exports.String ? string.string : string;
			this.string = str;
			return this.string;
		},
		duplicate: function(times) {
			times = times || 1;
			var str = this.string;
			for (var i=0; i<times; i++) {
				this.concat(str);
			}
			return this.string;
		},
		indexOf: function(substring, start) {
			return this.string.indexOf(substring, start);
		},
		lastIndexOf: function(substring, start) {
			return this.string.lastIndexOf(substring, start);
		},
		nullify: function() {
			this.string = "";
			return this.string;
		},
		replace: function(toBeReplaced, replacer) {
			return this.string.replace(toBeReplaced, replacer);
		},
		search: function(searcher) {
			return this.string.search(searcher);
		},
		slice: function(start, end) {
			return this.string.slice(start, end);
		},
		split: function(divider, index) {
			index = index || 0;
			return this.string.split(divider)[index];
		},
		substr: function(start, length) {
			return this.string.substr(start, length);
		},
		substring: function(start, end) {
			return this.string.substring(start, end);
		},
		toLowerCase: function() {
			return this.string.toLowerCase();
		},
		toNumber: function() {
			return Number(this.string);
		},
		toUpperCase: function() {
			return this.string.toUpperCase();
		},
		trim: function() {
			if (!String.prototype.trim) {
				return this.string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			}
			return this.string.trim();
		}
	});
}));