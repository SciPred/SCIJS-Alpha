/* SciJS 1: MATH
 * By SciPred, made 2019
 * Free to Use. */
var sciMath = {};



//arithmetic
sciMath.arithmetic = {
    bidivide: function(dividend, divisor){return Number((dividend / divisor) / divisor)},
    dec: function(n, dec){if(dec==null){n--}else{n-=dec}},
    difference: function(a, b){return a-b},
    inc: function(n, inc){if(inc==null){n++}else{n+=inc}},
    multiplication: function(val){var x=val.length,count=1;for(var i = 0; i < x; i++){count *= val[i];}return count},
 	summation: function(val){var x=val.length,count=0;for(var i = 0; i < x; i++){count += val[i];}return count}
};


//data
sciMath.data = {
 	max: function(val){return Math.max(val)},
 	mean: function(val){var x = val.length,count = 0;for(var i = 0; i < x; i++){count += val[i];}return count/x;},
 	//for the median, values can now be unorganized:
 	median: function(val){
 		if (sciMath.numberFunctions.isEven(val.length)) {var x=val.sort();return (x[((x.length + 2)/2)-2]+x[((x.length + 2)/2)-1])/2}
 		else {var x=val.sort();return x[((x.length + 1)/2)-1]}
 	},
 	min: function(val){return Math.min(val)},
 	mode: function(arr){return arr.reduce(function(current, item){var val=current.numMapping[item]=(current.numMapping[item]||0)+1;
        if(val>current.greatestFreq){current.greatestFreq=val;current.mode=item;}return current;},
        {mode:null,greatestFreq:-Infinity,numMapping:{}}).mode;
    },
 	range: function(val){return Math.max(val)-Math.min(val)}
};
sciMath.data.meanDeviation = function(values){var avg=sciMath.mean(values);var squareDiffs=values.map(function(value){var diff=value-avg;return diff;});
    var avgSquareDiff=sciMath.mean(squareDiffs);return avgSquareDiff;
};
sciMath.data.standardDeviation = function(values){var avg=sciMath.mean(values);var squareDiffs=values.map(function(value){var diff=value-avg;
    var sqrDiff=diff*diff;return sqrDiff;});var avgSquareDiff=sciMath.mean(squareDiffs);var stdDev = Math.sqrt(avgSquareDiff);return stdDev;
};
sciMath.data.variance = function(values){var sd=sciMath.data.standardDeviation(values);return sd**2;};


sciMath.geometry = {
	//regular polygons only
	area: function(perimeter, apothem){if(apothem==null){console.error("apothem is not defined")}else{return (perimeter*apothem)/2}},
	circumference: function(radius){return 2*r*Math.PI},
    perimeter: function(sidenumbers, sidelength){return sidenumbers*sidelength}
}

sciMath.logarithm = {
	LOG2: function(n){return Math.log2(n)},
	log: function(n){return Math.log(n)}
}


sciMath.numberFunctions = {
    e: function(num, eval){return JSON.parse(num + "e" + eval)},
    E: function(x){return Math.exp(x)},
    isEven: function(n){var m=n % 2;if(Number(m)==0){return true}else{return false}},
    isFinite: function(n){return isFinite(n)},
    isInfinite: function(n){return (n== -Infinity || n==Infinity)},
    isNaN: function(n){return isNaN(n)},
    isNumber: function(val){
    	if (isFinite(val)==false) {return false}
    	if (isNaN(val)) {return false}
    },
    isOdd: function(n){var m=n % 2;if(Number(m)==1){return true}else{return false}},
    //whole numbers only
    isPerfect: function(n, exp) {var m=n**(1/exp);return Math.round(m)==m},
    power2: function(exp){return 2**exp},
    power10: function(exp){return 10**exp},
	random: function(n){if(n==null){return Math.random()}else{return Math.floor(Math.random()*n)}},
	round: function(n){return Math.round(n)},
	root: {
		cube: function(n){return Math.cbrt(n)},
		hex: function(n){return Math.sqrt(Math.cbrt(n))},
		nth: function(n, denom, numer){if(numer==null){return n**(1/denom)}else{return n**(numer/denom)}},
		quad: function(n){return Math.sqrt(Math.sqrt(n))},
		square: function(n){return Math.sqrt(n)}
	},
	sign: function(x){if(x==NaN){return NaN}else{return Math.sign(x)}}
}


//numbers
sciMath.numberValues = {
	e1: 2.71,
	e2: 2.71828,
	eFull: Math.E,
	fracMil: 1 / 1000000,
	half: 1 / 2,
	infinity: Infinity,
	ln2: Math.LN2,
	ln10: Math.LN10,
	pi1: 3.14,
	pi2: 22 / 7,
	pi3: 3.1416,
	pi4: 3.141592653,
	piFullString: "3.1415926535897932384626433832795028841971693993751058209749"+
	    "445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019"+
	    "385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602"+
	    "491412737245870066063155881748815209209628292540917153643678925"+
	    "903600113305305488204665213841469519415116094330572703657595919530"+
	    "9218611738193261179310511854807446237996274956735188575272489122793"+
	    "818301194912983367336244065664308602139494639522473719070217986"+
	    "094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872"+
	    "1468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771",
	piMath: Math.PI,
	piOverE: Math.PI / Math.E,
	undefined: undefined
};

sciMath.solveForX = {
	//standard forms
	linearEquation: function(a, b){return -b / a},
	quadraticEquation: function(a, b, c){
		var Dis = sciMath.numberFunctions.root.square(b**2) - (4*a*c);
		var Dnm = 2*a;
		var s1 = (-b + Dis)/Dnm;
		var s2 = (-b - Dis)/Dnm;
		return [s1, s2];
	}
};

sciMath.temperature = {
	//fahrenheit
	toCelsius: function(fahrenheit){return (5/9)*(fahrenheit-32)},
	toDelisle: function(fahrenheit){return (212-fahrenheit)*(5/6)},
	toKelvin: function(fahrenheit){return ((5/9)*(fahrenheit-32))+273.15},
	toRankine: function(fahrenheit){return fahrenheit+459.67}
};
sciMath.temperature.toGasMark = function(fahrenheit){var c=sciMath.temperature.toCelsius(fahrenheit);return (c-121)/14};
sciMath.temperature.toNewton = function(fahrenheit){var c=sciMath.temperature.toCelsius(fahrenheit);return c*0.33};
sciMath.temperature.toReaumur = function(fahrenheit){var c=sciMath.temperature.toCelsius(fahrenheit);return c*0.8};
sciMath.temperature.toRomer = function(fahrenheit){var c=sciMath.temperature.toCelsius(fahrenheit);return (c*(21/40))+7.5};


sciMath.trigonometry = {
	cos: function(radians){return Math.cos(radians)},
	pythagoreanTheoremAdjacent: function(opp, hyp){var a=Math.sqrt((hyp**2)-(opp**2));return a;},
	pythagoreanTheoremHypotenuse: function(adj, opp){var c=Math.sqrt((adj**2)+(opp**2));return c;},
	pythagoreanTheoremOpposite: function(adj, hyp){var b=Math.sqrt((hyp**2)-(adj**2));return b;},
	sin: function(radians){return Math.sin(radians)},
	tan: function(radians){return Math.tan(radians)}
};


sciMath.other = {
};