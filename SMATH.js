//SMATH for sciMath
//and SNUM for sciNumber

//Polyfills//
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

//SNUM
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SNUM = {}));
}(this, function (exports) {'use strict';
	/* MATH NOTES
	- n^^n = n^(n^n), n^^^n = n^^(n^^n)
	- a ** b = ae+b
	*/

	//NUMBERS//
	Object.assign(exports, {
		//ORGANIZED BY VALUE; capitalized are the specials, first-cap are kinda special//
		//nonfinite "numbers"
		NAN: NaN,
		NEGATIVE_INFINITY: -Infinity,
		POSITIVE_INFINITY: Infinity,
		UNDEFINED: undefined,

		//part 1: 0 to 1
		zero: 0,
		percent: 0.01,
		tenth: 0.1,
		ninth: 1 / 9,
		eighth: 0.125,
		seventh: 1 / 7,
		sixth: 1 / 6,
		fifth: 0.2,
		quarter: 0.25,
		third: 1 / 3,
		half: 0.5,
		one: 1,
		//part 2: 1 to 10
		sqrt2: Math.sqrt(2),
		phi: (1 + Math.sqrt(5)) / 2, //golden ratio
		sqrt3: Math.sqrt(3),
		sqrtPI: Math.sqrt(Math.PI),
		two: 2,
		sqrt5: Math.sqrt(5),
		E: Math.E,
		three: 3,
		PI: Math.PI,
		sqrt10: Math.sqrt(10),
		sqrt12: Math.sqrt(12),
		four: 4,
		five: 5,
		six: 6,
		TAU: 2 * Math.PI,
		seven: 7,
		eight: 8,
		nine: 9,
		ten: 10,
		//part 3: 10 to 100
		eleven: 11,
		dozen: 12, //till dis norm
		baker_dozen: 13,
		poulter_dozen: 14,
		dumevalka: 22,
		gaz: 23 + (2 / 3),
		Fzthree: 27,
		PHIPLEX: 10 ** ((1 + Math.sqrt(5)) / 2),
		Gagthree: 61,
		hundred: 100,
		//part 4: 100 to 1000 (k)
		gross: 144,
		baker_gross: 169,
		poulter_gross: 196,
		Fzfour: 256,
		short_ream: 480,
		ream: 500,
		EPLEX: 10 ** Math.E, //Eulerplex
		k: 1000,
		//part 5: k to 100000 (Lakh)
		PIPLEX: 10 ** Math.PI,
		Fzfive: 3125,
		Kaprekar_constant: 6174,
		myriad: 10000,
		Fugathree: 19683,
		Fzsix: 46656,
		dust_mite: 50000,
		cheese_mite: 80000,
		Lakh: 100000,
		//part 6: Lakh to 1000000 (m)
		clover_mite: 200000,
		Fzseven: 823543,
		m: 1000000,
		//part 7: m to trillion (t)
		guppybit: 1048576,
		Googovi: 2985984,
		crore: 10000000, //pipsqueak
		Fzeight: 16777216,
		myllion: 100000000, //octad
		Googovij: 105413504,
		Fznine: 387420489,
		b: 1000000000,
		Googoviji: 4294967296,
		Fzten: 10 ** 10, //ten b OR dialogue
		little_squeaker: 50000000000,
		Googoix: 189359290368,
		t: 1000000000000,
		//part 7: t to decillion (d)
		Pi_illion: 10 ** (3 * (Math.PI + 3)),
		Megafuga_three: 7625597484987,
		Googox: 10240000000000,
		q: 10 ** 15,
		Gogolbit: 2 ** 50,
		byllion: 10 * (10 ** 15),
		Q: 10 ** 18,
		guppybyte: 2 ** 60,
		Fzsixteen: 2 ** 64,
		guppy: 10 ** 20,
		s: 10 ** 21,
		dutrimevalka: 2222222222222222222222,
		S: 10 ** 24,
		minnow: 10 ** 25,
		o: 10 ** 27,
		N: 10 ** 30,
		Bingol: 2 ** 100, //little googol or googolbit
		Googoxex: (1.100 * 10) ** 32,
		d: 10 ** 33,
		//part 8: d to vigintillion (v)
		goby: 10 ** 35,
		u: 10 ** 36,
		Fugafour: 4 ** 64,
		D: 10 ** 39,
		T: 10 ** 42,
		Zai: 10 ** 44,
		qd: 10 ** 45,
		Gogolbyte: 8 ** 50,
		Qd: 10 ** 48,
		Gogol: 10 ** 50, //Lcillion
		sd: 10 ** 51,
		Sd: 10 ** 54,
		od: 10 ** 57,
		nd: 10 ** 60,
		v: 10 ** 63,
		//part 9: v to Googol
		jumbo_shrimp: 10 ** 65,
		uv: 10 ** 66,
		dv: 10 ** 69,
		tv: 10 ** 72,
		qv: 10 ** 75, //lightweight
		Qv: 10 ** 78,
		ogol: 10 ** 80,
		sv: 10 ** 81,
		Sv: 10 ** 84,
		ov: 10 ** 87,
		nv: 10 ** 90, //novemvigintillion or Googolspeck
		Googolbyte: 8 ** 100,
		T: 10 ** 93, //Trigintillion
		Googolcrumb: 10 ** 95,
		uT: 10 ** 96,
		dT: 10 ** 99, //Googolchunk
		Googol: 10 ** 100,
		//part 10: Googol to centillion (c)
		Googolteen: (10 ** 100) + 10,
		Gooprol: (10 ** 100) + 267,
		Booprol: (10 ** 100) + 949,
		Trooprol: (10 ** 100) + 1243,
		Quadrooprol: (10 ** 100) + 1293,
		Googolbunch: 10 ** 101,
		Googolcrowd: 10 ** 105,
		Googolswarm: 10 ** 110, //Eleventyplex
		qg: 10 ** 123, //Quadragintillion
		Great_googol: 10 ** 150,
		Qqg: 10 ** 153,
		sg: 10 ** 183,
		Fzhundred: 10 ** 200, //Gargoogol
		Sg: 10 ** 213,
		Googoc: 200 ** 100,
		og: 10 ** 243,
		ng: 10 ** 273,
		c: 10 ** 303,
		//part 11: c onwards (after 1e+308, it gets stringed. Blame JavaScript)
		MAX_JS_NUMBER: 10 ** 308,
		Faxul: "200!",
		Fugafive: "5^5^4",
		Googolding: "10^500",
		Googocci: "402^201",
		dc: "10^603",
		tc: "10^903",
		Googolchime: "10^1000",
		Googod: "1000^500",
		Fzthousand: "10^3000",
		Millillion: "10^3003",
		Googom: "2000^1000",
		Googolbell: "10^5000",
		platillion: "10^6000",
		Dumillillion: "10^6003",
		Fugasix: "6^6^5",
		Googolpleiji: "3^3^9",
		Googoltoll: "10^10000",
		Myrillion: "10^30003",
		Fugaseven: "7^7^8",
		Googolgong: "10^100000",
		Millionplex: "10^1000000",
		Fugaeight: "8^8^7",
		Micrillion: "10^3000003",
		Fzmillion: "10^6000000",
		Fuganine: "9^9^8",
		Googolbong: "10^100000000",
		Fugaten: "10^1000000000",
		Trialogue: "10^10^10",
		Promaxima: "10^10^343"
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

		abs: function() {
			this.value = Math.abs(this.value);
			return this.value;
		},
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
		equals: function(number) {
			var num = number.constructor === exports.Number ? number.value : number;
			return num === this.value;
		},
		floor: function() {
			this.value = Math.floor(this.value);
			return this.value;
		},
		fround: function() {
			this.value = Math.fround(this.value);
			return this.value;
		},
		get: function() {
			return this.value;
		},
		isUndefined: function() {
			return this.value === undefined;
		},
		isZero: function() {
			return this.value === 0;
		},
		length: function() {
			var num = this.value;
			var str = this.value.toString();
			var len = str.length;
			this.value = num;
			return len;
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
		negate: function() {
			this.value = - this.value;
			return this.value;
		},
		round: function() {
			this.value = Math.round(this.value);
			return this.value;
		},
		set: function(value) {
			this.value = Number(value) || 0;
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
		trunc: function() {
			this.value = Math.trunc(this.value);
			return this.value;
		},
		valueOf: function() {
			return this.value.valueOf();
		}
	});
}));

//SMATH
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.SMATH = {}));
}(this, function (exports) {'use strict';
	//Object.assign from Polyfills
	//We use degrees here, bub - except for the trig ones
	//you can actually put dots as an argument - e.g. (...values)



	//setups
	exports.num = SNUM;
	exports.org = Math;

	//cartesian coords functions
	exports.Pol = function(x, y) {
		return {
			r: exports.hypot(x, y),
			theta: Math.atan(y / x) * (180/Math.PI) //degrees
		};
	};
	exports.Rec = function(r, theta) {
		theta = theta * (Math.PI/180);
		return {
			x: r * Math.cos(theta),
			y: r * Math.sin(theta)
		};
	};

	//trig functions (radians)
	Object.assign(exports, {
		acos: function(angle) {
			angle = angle || 0;
			return Math.acos(angle);
		},
		acosh: function(angle) {
			angle = angle || 0;
			return Math.acosh(angle);
		},
		asin: function(angle) {
			angle = angle || 0;
			return Math.asin(angle);
		},
		asinh: function(angle) {
			angle = angle || 0;
			return Math.asinh(angle);
		},
		atan: function(angle) {
			angle = angle || 0;
			return Math.atan(angle);
		},
		atanh: function(angle) {
			angle = angle || 0;
			return Math.atanh(angle);
		},
		cos: function(angle) {
			angle = angle || 0;
			return Math.cos(angle);
		},
		cosh: function(angle) {
			angle = angle || 0;
			return Math.cosh(angle);
		},
		sin: function(angle) {
			angle = angle || 0;
			return Math.sin(angle);
		},
		sinh: function(angle) {
			angle = angle || 0;
			return Math.sinh(angle);
		},
		tan: function(angle) {
			angle = angle || 0;
			return Math.tan(angle);
		},
		tanh: function(angle) {
			angle = angle || 0;
			return Math.tanh(angle);
		}
	});

	//root and power functions
	exports.cbrt = function(number) {
		number = number || 1;
		return Math.cbrt(number);
	};
	exports.e = function(pow) {
		return Math.E ** pow;
	};
	exports.nthrt = function(number, index) { //use rounding off
		number = number || 1;
		index = Math.abs(Math.round(index)) || 1;
		return number ** (1 / index); //problem with indices like 3
	};
	exports.pow10 = function(pow) {
		return 10 ** pow;
	};
	exports.pow2 = function(pow) {
		return 2 ** pow;
	};
	exports.pow3 = function(pow) {
		return 3 ** pow;
	};
	exports.pow4 = function(pow) {
		return 4 ** pow;
	};
	exports.sqrt = function(number) {
		number = number || 1;
		return Math.sqrt(number);
	};

	//arithmetic
	exports.add = function(numbers) {
		var count = 0;
		for (var i=0; i<arguments.length; i++) {
			count += Number(arguments[i]);
		}
		return count;
	};
	exports.divide = function(dividend, divisors) {
		for (var i=1; i<arguments.length; i++) {
			dividend /= Number(arguments[i]);
		}
		return dividend;
	};
	exports.intdiv = function(dividend, divisor) {
		return exports.trunc(exports.divide(dividend, divisor));
	};
	exports.multiply = function(numbers) {
		var count = 1;
		for (var i=0; i<arguments.length; i++) {
			count *= Number(arguments[i]);
		}
		return count;
	};
	exports.subtract = function(minuend, subtrahends) {
		for (var i=1; i<arguments.length; i++) {
			minuend -= Number(arguments[i]);
		}
		return minuend;
	};

	//logarithms (not fully working)
	exports.log = function(num, base) {
		return Math.log(num) / Math.log(base);
	};
	exports.log10 = function(num) {
		return Math.log(num) / Math.log(10);
	};
	exports.log2 = function(num) {
		return Math.log(num) / Math.log(2);
	};
	exports.log3 = function(num) {
		return Math.log(num) / Math.log(3);
	};

	//is functions
	Object.assign(exports, {
		isInfinity: function(arg) {return arg === Infinity || arg === -Infinity;},
		isNaN: function(arg) {return arg === NaN;},
		isZero: function(arg) {return arg === 0;}
	});

	//comparing
	exports.equal = function(num1, num2) {
		return num1 === num2;
	};
	exports.gt = function(num1, num2) {
		return num1 > num2;
	};
	exports.lt = function(num1, num2) {
		return num1 < num2;
	};

	//from sciMainAlpha
	exports.nth = {
		centeredHexagonalNumber: function(nth) {return ((3*(nth**2)) - (nth*3) + 1)},
	    evenNumber: function(nth) {return 2*nth},
	    fibonacciSeriesNumber: function(nth) {return Math.round((1.618**nth)/Math.sqrt(5))},
	    oddNumber: function(nth) {return nth+(nth-1)},
	    pentagonalNumber: function(nth) {return (nth*((3*nth)-1))/2},
	    squareNumber: function(nth) {return nth**2},
	    squarePyramidNumber: function(nth) {return ((2*(nth**3)) + (3*(nth**2)) + nth)/6},
	    tetrahedralNumber: function(nth) {return ((nth**3) + (3*(nth**2)) + (2*nth))/6},
	    triangleNumber: function(nth) {var m = nth*(nth + 1);return m/2}
    };
	exports.regPol = {
	    area: function(perimeter, apothem){if(apothem==null){console.error("SMATH.regPol.area: apothem is not defined")}else{return (perimeter*apothem)/2}},
	    circumference: function(radius){return 2*r*Math.PI},
        perimeter: function(sidenumbers, sidelength){return sidenumbers*sidelength}
    };
	exports.root = {
		hex: function(n){return Math.sqrt(Math.cbrt(n))},
		quad: function(n){return Math.sqrt(Math.sqrt(n))},
	};
	exports.sign = function(n) {
		if (n<0) {return -1}
		else if (n==0 || n==false)  {return 0}
		else if (n>0 || n==true) {return 1}
		else if (n===undefined) {return undefined}
		else {return NaN}
	};
	exports.solveForX = {
	    //standard forms
	    linearEquation: function(a, b){return -b / a},
	    quadraticEquation: function(a, b, c){
		    var Dis = exports.sqrt(b**2) - (4*a*c);
		    var Dnm = 2*a;
		    var s1 = (-b + Dis)/Dnm;
		    var s2 = (-b - Dis)/Dnm;
		    return [s1, s2];
	    }
    };

	//others
	exports.abs = function(number) {return Math.abs(number)};
	exports.ceil = function(number) {return Math.ceil(number)};
	exports.factorial = function(number) {
		number = Number(number) || 1;
		var count = 1;
		for (var num = 1; num < number; num++) {
			count *= num;
		}
		return count;
	};
	exports.floor = function(number) {return Math.floor(number)};
	exports.fround = function(number) {return Math.fround(number)};
	exports.hypot = function(adj, opp) {
		adj = adj || 0;
		opp = opp || 0;
		return Math.sqrt((adj ** 2) + (opp ** 2));
	};
	exports.random = function(min, max) {};
	exports.round = function(number) {return Math.round(number)};
	exports.trunc = function(number) {return Math.trunc(number)};

}));