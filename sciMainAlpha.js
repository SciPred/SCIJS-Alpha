/* SciJS Main Alpha: sci and Scanvas
 * By SciPred, made 2019
 * Free To Use.
*/

//QUICK NOTE
/*
elm, sel and elmnt are supposed to be something like document.getElementById(id), not just id. (or so)
*/

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.sci = function(arg) {return arg}));
}(this, function (exports) {'use strict';
	var VERSION = "1.0017";
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
	exports.VERSION = VERSION;
	console.log("SciPred\'s JS " + VERSION);
	exports.constructor = Object;
	exports.constructor.IS_EXPORTS_DEPENDENT = true;
	exports.constructor.IS_GLOBALLY_SCATTERED = true;
	exports.constructor.IS_SCI = true;
	if (window.sci !== undefined) {exports.constructor.IS_IN_WINDOW = true}
	else {exports.constructor.IS_IN_WINDOW = false}
	exports.ownRegExp = /sci/i;
	setInterval(setSSS, 1);
	function setSSS() {
		exports.$1 = RegExp.$1;
		exports.$2 = RegExp.$2;
		exports.$3 = RegExp.$3;
		exports.$4 = RegExp.$4;
		exports.$5 = RegExp.$5;
		exports.$6 = RegExp.$6;
		exports.$7 = RegExp.$7;
		exports.$8 = RegExp.$8;
		exports.$9 = RegExp.$9;
		exports.$_ = RegExp.$_;
		exports.nav = navigator;
		exports.doc = document;
		exports.Math = Math;
	}
	function addClass(elm, cls) {elm.classList.add(cls)}//
	function arrayEqualsItem(arr, num, eq) {return arr[num]==eq}//
	function arrayGetItem(arr, num) {return arr[num]}//
	function arrayHTML(elm, arr) {for (var i=0; i<elm.length; i++) {elm[i].innerHTML=arr[i]}}//
	function arrayItemNumber(arr, item) {for (var i=0; i<arr.length; i++) {if (arr[i]==item) {return i}}}//
	function arraySetItem(arr, num, newobj) {arr[num]=newobj}//
	function docDesignable(onoffbool) {document.designMode = onoffbool}//
	function docNormalize() {document.normalize()}//
	function draggableHTML(elm, dragpart) {var pos1=0,pos2=0,pos3=0,pos4=0;
		if (dragpart) {dragpart.onmousedown=dragMouseDown;} //dragpart is where the element is draggable
		else {elm.onmousedown = dragMouseDown;}
		this.dragMouseDown = function(e) {e = e||window.event;
			e.preventDefault();
			pos3=e.clientX;
			pos4=e.clientY;
			document.onmouseup=closeDragElement;
			document.onmousemove=elementDrag;
		}
		this.elementDrag = function(e) {e = e||window.event;
			e.preventDefault();
			pos1=pos3 - e.clientX;
			pos2=pos4 - e.clientY;
			pos3=e.clientX;
			pos4=e.clientY;
			elm.style.top = (elm.offsetTop - pos2) + "px";
			elm.style.left = (elm.offsetLeft - pos1) + "px";
		}
		this.closeDragElement = function() {document.onmouseup = null;document.onmousemove = null;}
	}//
	function evtListener(evt, func, useCapture) {document.addEventListener(evt, func, useCapture)}//
	function execCmd(cmd, keyId) {if(keyId==null||keyId==undefined){document.execCommand(cmd)}else{if(event.keyCode==keyId){document.execCommand(cmd)}}}//
	function filterHTML(id, sel, filter) {var a=getElements(id), b, c, i, ii, iii, hit;
		for (i=0; i<a.length; i++) {b=getElements(sel);
			for (ii=0; ii<b.length; ii++) {hit=0;
				if (b[ii].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {hit=1;}
				c = b[ii].getElementsByTagName("*");
				for (iii=0; iii<c.length; iii++) {if(c[iii].innerHTML.toUpperCase().indexOf(filter.toUpperCase())>-1) {hit=1;}}
				if (hit==1) {b[ii].style.display = "";}else{b[ii].style.display = "none";}
			}
		}
	}//
	function fullHeightElement(elm) {document.body.style.margin=0;elm.style.height=document.body.height}
	//using given body height because editing the body height may cause problems
	function getByClass(cls) {return document.getElementsByClassName(cls)}//
	function getById(id) {return document.getElementById(id)}//
	function getByName(name) {return document.getElementsByName(name)}//
	function getByQSelectorAll(id) {return document.querySelectorAll(id)}//
	function getByTag(tag) {return document.getElementsByTagName(tag)}//
	function getElements(id) {if(typeof id == "object"){return [id];}else{return getByQSelectorAll(id);}}//
	exports.addClass = addClass;
	exports.arrayEqualsItem = arrayEqualsItem;
	exports.arrayGetItem = arrayGetItem;
	exports.arrayHTML = arrayHTML;
	exports.arrayItemNumber = arrayItemNumber;
	exports.docDesignable = docDesignable;
	exports.docNormalize = docNormalize;
	exports.draggableHTML = draggableHTML;
	exports.evtListener = evtListener;
	exports.execCmd = execCmd;
	exports.filterHTML = filterHTML;
	exports.fullHeightElement = fullHeightElement;
	exports.getByClass = getByClass;
	exports.getById = getById;
	exports.getByName = getByName;
	exports.getByQSelectorAll = getByQSelectorAll;
	exports.getByTag = getByTag;
	exports.getElements = getElements;
	function hideElement(elm) {styleElement(elm, "display", "none")}
	exports.hideElement = hideElement;
	function hideElements(elm) {for(var i=0; i<elm.length; i++){hideElement(elm[i])}}
	exports.hideElements = hideElements;
	function hideSpecificElement(elm, i) {hideElement(elm[i])}
	exports.hideSpecificElement = hideSpecificElement;
	function IsArray(arg) {return Array.isArray(arg)}
	exports.IsArray = IsArray;
	function IsArrayEmpty(obj) {
		for(var key in obj) {
            if(obj.hasOwnProperty(key)) {return false;}
        }
        return true;
	}
	exports.IsArrayEmpty = IsArrayEmpty;
	function IsDefined(obj) {return (obj !== null && obj !== undefined)}
	exports.IsDefined = IsDefined;
	function IsEven(n) {var m=n % 2;if(Number(m)==0){return true}else{return false}}
	exports.IsEven = IsEven;
	function IsInfinite(n) {return (n == Infinity || n == -Infinity)}
	exports.IsInfinite = IsInfinite;
	function IsNegative(n) {return IsPositive(n)==false}
	exports.IsNegative = IsNegative;
	function IsNull(arg) {return arg===null}
	exports.IsNull = IsNull;
	function IsNumber(n) {return (isFinite(n) && isNaN(n)==false && typeof n === "number")}
	exports.IsNumber = IsNumber;
	function IsOdd(n) {var m=n % 2;if(Number(m)==1){return true}else{return false}}
	exports.IsOdd = IsOdd;
	function IsPositive(n) {return (Math.abs(n)==n)}
	exports.IsPositive = IsPositive;
	function IsUndefined(n) {return n===undefined}
	exports.IsUndefined = IsUndefined;
	function innerHTML(elm, val) {elm.innerHTML = val}
	exports.innerHTML = innerHTML;
	function removeClass(elm, cls) {elm.classList.remove(cls)}
	exports.removeClass = removeClass;
	function replaceLocation(rep) {location.replace(rep)}
	exports.replaceLocation = replaceLocation;
	function sameArray(arr1, arr2) {return (arr1==arr2 && arr1.length==arr2.length)}
	exports.sameArray = sameArray;
	function sameVar(a, b) {return a===b}
	exports.sameVar = sameVar;
	function scrollToTop() {document.body.scrollTop = 0}
	exports.scrollToTop = scrollToTop;
	function setColor(elm, color) {elm.style.color = color}
	exports.setColor = setColor;
	function setZIndex(elm, z) {elm.style.zIndex = z}
	exports.setZIndex = setZIndex;
	function showElement(elm) {styleElement(elm, "display", "block")}
	exports.showElement = showElement;
	function showElements(elm) {for (var i=0; i<elm.length; i++) {showElement(elm[i])}}
	exports.showElements = showElements;
	function showSpecificElement(elm, i) {showElement(elm[i])}
	exports.showSpecificElement = showSpecificElement;
	function stringEdgeSpaceTrim(str) {return str.trim()}
	exports.stringEdgeSpaceTrim = stringEdgeSpaceTrim;
	function stringIncludes(str, sub) {return str.includes(sub)}
	exports.stringIncludes = stringIncludes;
	function stringLen(str) {return str.length}
	exports.stringLen = stringLen
	function stringRepeat(str, times) {
		if(times<0){console.warn("sci.stringRepeat: times is negative: "+times+", turning into positive.");return str.repeat(Math.abs(times))}
		else{return str.repeat(times)}
	}
	exports.stringRepeat = stringRepeat;
	function stringReplace(str, replacee, sub) {return str.replace(replacee, sub)}
	exports.stringReplace = stringReplace;
	function stringSub(str, start, end) {return str.substr(start, end)}
	exports.stringSub = stringSub;
	function styleElement(elm, prop, val) {elm.style.setProperty(prop, val)}
	exports.styleElement = styleElement;
	function styleElements(elm, prop, val) {for(var i=0; i<elm.length; i++){styleElement(elm[i], prop, val)}}
	exports.styleElements = styleElements;
	function transformHTML(elm, transform) {elm.style.transform = transform}
	exports.transformHTML = transformHTML;
	function toggleClass(elm, cls) {elm.classList.toggle(cls)}
	exports.toggleClass = toggleClass;
	function togglePassword(inputelm) {if (inputelm.type === "password") {inputelm.type = "text"} else {inputelm.type = "password"}}
	exports.togglePassword = togglePassword;
	function toggleShow(sel) {var i,x=getElements(sel);
		for(i=0;i<x.length;i++){if(x[i].style.display=="none"){styleElement(x[i],"display","block");}else{styleElement(x[i],"display","none");}}
	}
    exports.toggleShow = toggleShow;
    function toggleText(elm, txt1, txt2) {if (elm.innerHTML==txt1) {innerHTML(elm, txt2)} else {innerHTML(elm, txt1)}}
    exports.toggleText = toggleText;
    function triggerButtonOnKey(btn, keyevt, key) {btn.addEventListener(keyevt, function(event) {if (event.key === key) {event.preventDefault();btn.click()}})}
    exports.triggerButtonOnKey = triggerButtonOnKey;
    function triggerButtonOnKeyCode(btn, keyevt, keycode) {
    	btn.addEventListener(keyevt, function(event) {if (event.keyCode === keycode) {event.preventDefault();btn.click()}})
    }
    exports.triggerButtonOnKeyCode = triggerButtonOnKeyCode;
	//using x as the problem (by console.errors)
    exports.ERR_ERR = "Uncaught Error: x";
	exports.ERR_LOAD_RESOURCE_FAILED = "Failed to load resource: the server responded with a status of 403 ()";
	exports.ERR_LOAD_RESOURCE_NETFAILED = "Failed to load resource: net::ERR_FAILED";
	exports.ERR_NAME_NOT_RESOLVED = "Failed to load resource: net::ERR_NAME_NOT_RESOLVED";
	exports.ERR_REFERENCE_INVALID_ASSIGNMENT = "Uncaught ReferenceError: Invalid left-hand side in assignment";
	exports.ERR_REFERENCE_UNDEFINED = "Uncaught ReferenceError: x is not defined";
	exports.ERR_SYNTAX_UNEXPECTED_IDENTIFIER = "Uncaught SyntaxError: Unexpected identifier";
	exports.ERR_SYNTAX_UNEXPECTED_TOKEN = "Uncaught SyntaxError: Unexpected token x";
	exports.ERR_THROW = "Uncaught x";
	exports.ERR_TYPE_ARGUMENTS_UNAVAILABLE="Uncaught TypeError: \'caller\', \'callee\', and \'arguments\' properties may not be "+
	    "accessed on strict mode functions or the arguments objects for calls to them";
	exports.ERR_TYPE_EXECUTE_FAILED_ITERATOR = "Failed to execute x on y: Iterator getter is not callable.";
	exports.ERR_TYPE_ILLEGAL_INVOCATION = "Uncaught TypeError: Illegal invocation";
	exports.ERR_TYPE_NOTFUNCTION = "Uncaught TypeError: x is not a function";
	exports.ERR_TYPE_NUM_UNCREATABLE_PROP = "Uncaught TypeError: Cannot create property x on number y";
	exports.STRICTERR_SYNTAX_UNEXPECTED_EVALORARGS = "Uncaught SyntaxError: Unexpected eval or arguments in strict mode";
	exports.STRICTERR_SYNTAX_UNQUALIFIED_IDENTIFIER = "Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.";
	//SETTINGS
	exports.__SETTINGS__ = {
		addToLocalStorage: function() {
			if (localStorage.sci === undefined) {localStorage.sci = exports} else {
				if (confirm("There is an existing localStorage.sci value.\nWould you like to replace it?")) {localStorage.sci = exports}
			}
		},
		retrieveFromLocalStorage: function() {
			if (localStorage.sci !== exports && localStorage.sci !== {}) {
				if (confirm("WARNING: the current localStorage.sci value is either not a sci variable or an older version.\nWould you like to continue?")) {
					exports = localStorage.sci;
				}
			} else {
				exports = localStorage.sci;
				localStorage.sci = undefined;
			}
		},
		toggleMath: function() {
			if (Math.sci === undefined) {Math.sci = window.sci.math || exports.math} else {Math.sci = undefined}
		},
	    toggleSciInDocument: function() {
	    	if (document.sci === undefined) {document.sci = window.sci || exports} else {document.sci = undefined}
	    },
	    _DangerSettings_: {
	    	documentSci: function() {
	    		exports = {
	    			console: console,
	    			document: document,
	    			localStorage: localStorage,
	    			Math: Math,
	    			navigator: navigator,
	    			window: window
	    		};
	    	},
	    	emptySci: function() {exports = {}; SCI = {}},
	    	removeSci: function() {window.sci = undefined;alert("SCI IS NOW UNUSABLE")}
	    }
	};
	exports.__SETTINGS__.toggleSciInDocument.NOTE = function() {console.warn("sci.__SETTINGS__.toggleSciInDocument: This only handles with the document, not the window.")};
	//prototype and extra stuff
	exports.mainHandler = window || "unavailable";
	exports.SCI_SETTINGS_DANGER_HANDLER = exports.__SETTINGS__._DangerSettings_;
	exports.string = "sci";
	exports.consTrace = function() {return console.trace()};
	exports.constructor.DANGER = {delete: exports.__SETTINGS__._DangerSettings_.removeSci || "unavailable"};
	exports.protocons = exports.prototype.constructor || "unavailable";
	exports.consproto = exports.constructor.prototype || "unavailable";
	exports.documentHandler = document || "unavailable";
	exports.self = exports.parent = exports;
	exports._INFORMATION = exports.prototype._INFORMATION = function() {
		if (typeof console === undefined) {
			alert("Sorry, but console is not supported. Please try again on a different browser.");
		} else {
			console.log("__INFORMATION__");
			console.log("SCIJS by SciPred");
			console.dir("Version " + exports.VERSION);
			console.dir("Free To Use, but copyrighted.");
			console.log("LOG: sci");
			console.log(sci);
		}
	};
	//only once
	exports._IS_CONSOLE_OK = typeof console === undefined ? false : true;
	exports._IS_DOCUMENT_OK = typeof document === undefined ? false : true;
	exports._IS_NAVIGATOR_OK = typeof navigator === undefined ? false : true;



	//ALPHA FILE FUNCTIONS
	/* (((JUST IN CASE)))
	Types of Functions, keywords and stuff:
		1. Normal Functions
			function(arguments)
		2. function Function
			function Function(arguments) {code}
		3. Conditional Functions
			keyword (condition) {code}
		4. else Condition Function
			else {code}
		5. Keyword Functions
			keyword arguments
		6. Constructors
			new Constructor(arguments)
		7. Anonymous Functions
			(code)()
		8. Array-able Functions
			getFunction(arguments)[number]
	*/


	//SPECIAL FUNCTIONS//
	//battery (shows only info from first millisecond until next update)
	function updateBattery() {
		navigator.getBattery().then(function(battery){
			exports.Battery = {
				//normal information
				charging: battery.charging,
				level: battery.level,
				onchargingchange: battery.onchargingchange,
				onchargingtimechange: battery.onchargingtimechange,
				ondischargingtimechange: battery.ondischargingtimechange,
				onlevelchange: battery.onlevelchange,
				//added information
				isBattery: true,
				origination: navigator
			};
			exports.Battery.chargingTime = battery.chargingTime === window.Infinity ? "unknown" : battery.chargingTime;
			exports.Battery.dischargingTime = battery.dischargingTime === window.Infinity ? "unknown" : battery.dischargingTime;
		});
		return exports.Battery;
	}
	updateBattery();
	exports.updateBatteryInfo = updateBattery;
	//events happening now (prev)
	exports.EventsNow = {
		KEY: {}, //onkeydown
		MOUSECLICK: {},

		usingAssign: {
			KEY: {},
			MOUSECLICK: {}
		}
	};
	document.addEventListener("click", function(e){
		Object.assign(exports.EventsNow.usingAssign.MOUSECLICK, e);
		Object.assign(exports.EventsNow.MOUSECLICK, {
			altKey: e.altKey,
			bubbles: e.bubbles,
			button: e.button,
			buttons: e.buttons,
			cancelBubble: e.cancelBubble,
			cancelable: e.cancelable,
			clientX: e.clientX,
			clientY: e.clientY,
			composed: e.composed,
			ctrlKey: e.ctrlKey,
			currentTarget: e.currentTarget,
			defaultPrevented: e.defaultPrevented,
			detail: e.detail,
			eventPhase: e.eventPhase,
			fromElement: e.fromElement,
			isTrusted: e.isTrusted,
			layerX: e.layerX,
			layerY: e.layerY,
			metaKey: e.metaKey,
			movementX: e.movementX,
			movementY: e.movementY,
			offsetX: e.offsetX,
			offsetY: e.offsetY,
			pageX: e.pageX,
			pageY: e.pageY,
			path: e.path,
			relatedTarget: e.relatedTarget,
			returnValue: e.returnValue,
			screenX: e.screenX,
			screenY: e.screenY,
			shiftKey: e.shiftKey,
			sourceCapabilities: e.sourceCapabilities,
			srcElement: e.srcElement,
			target: e.target,
			timeStamp: e.timeStamp,
			toElement: e.toElement,
			type: e.type,
			view: e.view,
			which: e.which,
			x: e.x,
			y: e.y
		});
	});
	document.addEventListener("keypress", function(e){
		Object.assign(exports.EventsNow.usingAssign.KEY, e);
		Object.assign(exports.EventsNow.KEY, {
			altKey: e.altKey,
			bubbles: e.bubbles,
			cancelBubble: e.cancelBubble,
			cancelable: e.cancelable,
			charCode: e.charCode,
			code: e.code,
			composed: e.composed,
			ctrlKey: e.ctrlKey,
			currentTarget: e.currentTarget,
			defaultPrevented: e.defaultPrevented,
			detail: e.detail,
			eventPhase: e.eventPhase,
			isComposing: e.isComposing,
			isTrusted: e.isTrusted,
			key: e.key,
			keyCode: e.keyCode,
			location: e.location,
			metaKey: e.metaKey,
			path: e.path,
			repeat: e.repeat,
			returnValue: e.returnValue,
			shiftKey: e.shiftKey,
			sourceCapabilities: e.sourceCapabilities,
			srcElement: e.srcElement,
			target: e.target,
			timeStamp: e.timeStamp,
			type: e.type,
			view: e.view,
			which: e.which
		});
	});


	//ABSOLUTE FUNCTIONS (0-9, A-Z, a-z)//
	exports.Binary = {
		AND: function(a, b) {
			if (a === 1 && b === 1) {return 1}
			return 0;
		},
		NAND: function(a, b) {
			if (a === 1 && b === 1) {return 0}
			return 1;
		},
		NOR: function(a, b) {
			if (a === 0 && b === 0) {return 1}
			return 0;
		},
		NOT: function(a) {if (a === 0) {return 1} else {return 0}},
		OFF: 0,
		ON: 1,
		OR: function(a, b) {
			if (a === 0 && b === 0) {return 0}
			return 1;
		},
		XNOR: function(a, b) {
			if (a === b) {return 1}
			return 0;
		},
		XOR: function(a, b) {
			if (b === a && a === 0) {return 0}
			if (b === a && a === 1) {return 0}
			return 1;
		},

		reverse: function(bin) {
			if (bin === true || bin === 1) {return 0}
			if (bin === false || bin === 0) {return 1}
			return undefined;
		},
		reverseString: function(str) {exports.reverseString(str)}
	};
	exports.ConstructorMainFunctions = {
		Array: window.Array || "unavailable",
		Boolean: window.Boolean || "unavailable",
		Date: window.Date || "unavailable",
		Error: window.Error || "unavailable",
		FileReader: window.FileReader || "unavailable",
		Function: window.Function || "unavailable",
		Number: window.Number || "unavailable",
		Object: window.Object || "unavailable",
		RegExp: window.RegExp || "unavailable",
		String: window.String || "unavailable",
		Worker: window.Worker || "unavailable"

	};
	exports.Element = {
		style: function(elmstyle, value) {elmstyle = value},
		styleSheets: function() {return document.styleSheets},
		styleSheetsAdopted: function() {return document.adoptedStyleSheets}
	};
	exports.Error = {
		DOMError: DOMError || "unavailable",
		Error: Error || "unavailable",
		EvalError: EvalError || "unavailable",
		MediaError: MediaError || "unavailable",
		OverconstrainedError: OverconstrainedError || "unavailable",
		RangeError: RangeError || "unavailable",
		ReferenceError: ReferenceError || "unavailable",
		RTCError: RTCError || "unavailable",
		SyntaxError: SyntaxError || "unavailable",
		TypeError: TypeError || "unavailable",
		URIError: URIError || "unavailable",
		webkitSpeechRecognitionError: webkitSpeechRecognitionError || "unavailable",

		onerror: document.onerror || window.onerror || "unavailable",
		onmessageerror: window.onmessageerror || "unavailable",
		throwError: function(errorType, arg) {throw new errorType(arg)}
	};
	exports.HasConsole = function() {return typeof console !== "undefined"};
	exports.HasDocumentBody = function() {return document.body !== "undefined"};
	exports.HasWebWorker = function() {return typeof Worker !== "undefined"};
	exports.HasWindow = function() {return typeof window !== "undefined"};
	exports.IsBinaricBoolean = function(arg) {return (arg==0 || arg==1)};
	exports.IsBoolean = function(arg) {return typeof arg === "boolean"};
	exports.IsCheckboxChecked = function(checkbox) {return checkbox.checked};
	exports.IsEqualStyle = function(elm1style, elm2style) {return elm1style===elm2style};
	exports.IsFalse = function(bool) {return bool===false};
	exports.IsFunction = function(arg) {return typeof arg === "function"};
	exports.IsInteger = function(n) {return Number.isInteger(n)};
	exports.IsObject = function(arg) {return typeof arg === "object"};
	exports.IsPerfectWhole = function(n, exp) {var m=n**(1/exp);return Math.round(m)==m};
	exports.IsSafeInteger = function(int) {return Number.isSafeInteger(int)};
	exports.IsString = function(arg) {return typeof arg === "string"};
	exports.IsTrue = function(bool) {return bool===true};
	exports.IsUndefinedByTypeof = function(arg) {return typeof arg === "undefined"};
	exports.Random = {
		makeRandomBit: function() {return exports.choose([0, 1])},
		makeRandomByte: function() {
		    return exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]);
	    },
	    //long :/
	    makeRandomKiloByte: function() {var str = "";
		    for (var i=0; i<1024; i++) {
			    str += exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) +
			        exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]);
		    }
		    return str;
	    },
		makeRandomNibble: function() {
		    return exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]) +
		        exports.choose(["0", "1"]);
	    },
	    match: function(rands, match) {var rnd = rands || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], mtc = match || 0;return (exports.choose(rnd) === mtc)},
		randomHexLetVars: ["A", "B", "C", "D", "E", "F"],
		randomHexNumVars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
		randomHexVars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"],
		randomSciIDVars: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
	        "q", "r", "s", "t", "u", "v", "w", "x", "y", "z","A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
	        "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z","-", "_", "$", "&", "#", "@", "?"
	    ],
	};
	exports.Random.generateRandomArray = function(len, replacee, items) {
		var arr = replacee || [];
		var tems = items || exports.Random.randomSciIDVars;
		for (var i=0; i<len; i++) {
			arr[i] = exports.choose(tems);
		}
		if (replacee !== undefined) {replacee = arr;return replacee} else {return arr}
	};
	exports.Random.generateRandomHex = function(rands, isScalar) {
		var hex = "#", clr = rands || exports.Random.randomHexVars;
		var rnd;
		if (isScalar) {
			rnd = exports.choose(clr);
			hex += rnd + rnd + rnd + rnd + rnd + rnd;
			return hex;
		} else {
			for (var i=0; i<6; i++) {hex += exports.choose(clr);}
			return hex;
		}
	};
	exports.Random.generateRandomNumber = function(len, replacee, rands) {
		var num = "", arr = rands || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (var i=0; i<len; i++) {
			num += exports.choose(arr);
		}
		var n = Number(num);
		if (replacee !== undefined) {replacee = n;return replacee} else {return n}
	};
	exports.Random.generateRandomSciID = function(len, randlen, replacee) { //using randomSciIDVars
		var str = "";
		var rlen = randlen || 1;
		for (var i=0; i<len; i++) {
			rlen = exports.choose(exports.Random.randomSciIDVars);
			str += exports.summation(rlen, true);
		}
		if (replacee !== undefined) {replacee = str;return replacee} else {return str}
	};
	exports.Random.generateRandomSciIDArray = function(len, replacee) {exports.Random.generateRandomArray(len, replacee)};
	exports.Random.generateRandomString = function(len, replacee, rands) { //rands is last because it might be very long
		str = "";
		if(Array.isArray(rands)==false){console.warn("sci.Random.generateRandomString: rands is undefined, using randomSciIDVars");rands=exports.Random.randomSciIDVars}
		for (var i=0; i<len; i++) {
			str = exports.choose(rands);
		}
		if (replacee !== undefined) {replacee = str;return replacee} else {return str}
	};
	exports.Variables = {
		JSON: window.JSON || "unavailable",
		applicationCache: applicationCache || "unavailable",
		console: console || "unavailable",
		document: document || "unavailable",
		localStorage: window.localStorage || "unavailable",
		location: document.location || "unavailable",
		memory: console.memory || "unavailable",
		navigator: navigator || "unavailable",
		performance: performance || "unavailable",
		screen: screen || window.screen || "unavailable",
		scroll: scroll || window.scroll || "unavailable",
		speechSynthesis: window.speechSynthesis || "unavailable",
		this: exports,
		window: window || "unavailable"
	};
	exports.addClass = function (sel, name) {exports.addClassElements(getElements(sel), name)};
	exports.addClassElement = function (element, name) {var i, arr1, arr2;arr1 = element.className.split(" ");arr2 = name.split(" ");
		for (i = 0; i < arr2.length; i++) {if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}}
	};
	exports.addClassElements = function (elements, name) {var i, l = elements.length;for (i = 0; i < l; i++) {exports.addClassElement(elements[i], name)}};
	exports.addSciContext2DFunctions = function(ctx) { //capitals come first
		ctx = ctx || window.CanvasRenderingContext2D.prototype;
		//customs
		ctx.IsCtx = true;
		ctx.Is2D = true;

		//normal ctx handlers
		ctx.Fill = function(color) {
			ctx.fillStyle = color !== undefined ? color : ctx.fillStyle;
			ctx.fill();
		};
		ctx.Stroke = function(color) {
			ctx.strokeStyle = color !== undefined ? color : ctx.strokeStyle;
			ctx.stroke();
		};
		ctx.circle = function(x, y, radius) {
			ctx.arc(x, y, radius, 0, 2 * Math.PI);
		};
		ctx.close = function() { //still a test
			if (ctx.fillStyle === null) {ctx.closePath()}
			else {ctx.fill()}
		};
		ctx.color = function() {
			ctx.stroke();
			ctx.fill();
		};
		ctx.emptyStyles = function() {
			ctx.strokeStyle = "#000000";
			ctx.fillStyle = "#000000";
			return ctx;
		};
		ctx.fillArc = function(x, y, radius, startAngle, endAngle, isCounter) {
			ctx.fillEllipse(x, y, radius, radius, 0, startAngle, endAngle, isCounter);
		};
		ctx.fillCircle = function(x, y, radius) {
			ctx.fillArc(x, y, radius, 0, 2 * Math.PI);
		};
		ctx.fillEllipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, isCounter) {
			ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, isCounter);
			ctx.fill();
		};
		ctx.fillOctagon = function(x, y, size) {
			ctx.octagon(x, y, size);
			ctx.fill();
		};
		ctx.fillPolygon = function(x, y, sides, size) {
			ctx.polygon(x, y, sides, size);
			ctx.fill();
		};
		ctx.fillSquare = function(x, y, size) {
			ctx.square(x, y, size);
			ctx.fill();
		};
		ctx.lineDown = function(y) {ctx.lineTo(0, y)};
		ctx.lineLeft = function(x) {ctx.lineTo(-x, 0)};
		ctx.lineRight = function(x) {ctx.lineTo(x, 0)};
		ctx.lineScalar = function(s) {ctx.lineTo(s, s)};
		ctx.lineUp = function(y) {ctx.lineTo(0, -y)};
		ctx.linesTo = function(vertices) { // as array: [x, y, x, y, ...]
			vertices = vertices || [0, 0];
			for (var i=0; i<vertices.length; i+=2) {
				ctx.lineTo(vertices[i], vertices[i+1]);
			}
		};
		ctx.moveDown = function(y) {ctx.moveTo(0, y)};
		ctx.moveLeft = function(x) {ctx.moveTo(-x, 0)};
		ctx.moveRight = function(x) {ctx.moveTo(x, 0)};
		ctx.moveScalar = function(s) {ctx.moveTo(s, s)};
		ctx.moveUp = function(y) {ctx.moveTo(0, -y)};
		ctx.octagon = function(x, y, size) {
			ctx.polygon(x, y, 8, size);
		};
		ctx.polygon = function(x, y, sides, size) {
			//this function is now the most reliable... for now.
			var c = {x: x, y: y};
			var Xcenter = c.x, Ycenter = c.y, numberOfSides = sides || 3;
			size = size || 10;

			ctx.moveTo(Xcenter+size*Math.cos(0), Ycenter+size*Math.sin(0));
			for (var i = 1; i <= numberOfSides;i += 1) {
				ctx.lineTo(Xcenter + size * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
		};
		ctx.square = function(x, y, size) {
			ctx.rect(x, y, size, size);
		};
		ctx.strokeArc = function(x, y, radius, startAngle, endAngle, isCounter) {
			ctx.strokeEllipse(x, y, radius, radius, 0, startAngle, endAngle, isCounter);
		};
		ctx.strokeCircle = function(x, y, radius) {
			ctx.strokeArc(x, y, radius, 0, 2 * Math.PI);
		};
		ctx.strokeEllipse = function(x, y, radiusX, radiusY, rotation, startAngle, endAngle, isCounter) {
			ctx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle, isCounter);
			ctx.stroke();
		};
		ctx.strokeOctagon = function(x, y, size) {
			ctx.octagon(x, y, size);
			ctx.stroke();
		};
		ctx.strokePolygon = function(x, y, sides, size) {
			ctx.polygon(x, y, sides, size);
			ctx.stroke();
		};
		ctx.strokeSquare = function(x, y, size) {
			ctx.square(x, y, size);
			ctx.stroke();
		};
		return ctx;
	};
	window.HTMLCanvasElement.prototype.addSci = exports.addSciContext2DFunctions;
    exports.args = function(arg) {return arg.arguments};
    exports.arithmetic = {
        bidivide: function(dividend, divisor){return Number((dividend / divisor) / divisor)},
        dec: function(n, dec){if(dec==null){n--}else{n-=dec}},
        difference: function(a, b){return a-b},
        inc: function(n, inc){if(inc==null){n++}else{n+=inc}},
        multiplication: function(val){var x=val.length,count=1;for(var i = 0; i < x; i++){count *= val[i];}return count},
 	    summation: function(val){var x=val.length,count=0;for(var i = 0; i < x; i++){count += val[i];}return count}
    };
    exports.array = {
    	getItem: function(arr, n) {return arr[n]},
    	isItem: function(arr, n, item) {return arr[n] === item},
    	reverse: function(arr) {arr.reverse();return arr},
    	setItem: function(arr, n, item) {arr[n] = item;return arr}
    };
    exports.array.addItemToEnd = function(arr, item) {arr[arr.length] = item;return arr};
	exports.array.repeatItem = function(len, items, replacee) {
		var arr = replacee || [];
		if (items === undefined) {console.warn("sci.array.repeatItem: items is/are not defined, using empty array");items=[]}
		for (var i=0; i<len; i++) {
			if (items.length==1) {arr[i]=items} else {arr[i] = items[i]}
		}
	    return arr;
	};
	exports.array.toggleItem = function(arr, n, val) {
		var olditem = arr[n], newitem = val;
		if (arr[n]==olditem) {arr[n]=newitem}
		else {arr[n]=olditem}
		return arr;
	};
    exports.choose = function(arr) {return arr[Math.floor(Math.random()*arr.length)]};
	exports.clearConsole = function() {console.clear()};
	exports.click = function(btn) {btn.click();return btn};
	exports.close = function() {document.close()};
	exports.color = {
		componentToHex: function(c) {var hex = c.toString(16);return hex.length == 1 ? "0" + hex : hex;},
		hexScalar: function(s, is3) {if (is3) {return "#"+s+s+s} else {return "#"+s+s+s+s+s+s}},
		hexToRgbBeta: function(hex) {
			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
		},
		hexToRgb: function(hex) {
			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });
            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
		},
		rgbToHexAlt: function(r, g, b) {return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);}
	};
	exports.color.rgbToHex = function(r, g, b) {
		return "#" + exports.color.componentToHex(r) + exports.color.componentToHex(g) + exports.color.componentToHex(b);
    };
    exports.convertBinary = function(string) { // eg "10010"
    	var number = 0;
    	var str = exports.reverseString(string);
    	var j;
    	for (var i=str.length; i>0; i--) {
    		j = i - 1; //for 012 (arr choosing) not 123 (.length)
    		if (str[j]=="1" || str[j]==1) {number += (2 ** j)}
    	}
    	return number;
    };
    exports.createButton = function(html) {
    	var btn = document.createElement("BUTTON");
    	btn.innerHTML = html;
    	return btn;
    };
    exports.createElement = function(type, options) {
    	var elm = document.createElement(type, options);
    	return elm;
    };
    exports.createP = function(txt) {
    	var a = document.createElement("P");
    	a.innerText = txt;
    	return a;
    };
	exports.data = {
     	max: function(val){return Math.max(val)},
     	mean: function(val){var x = val.length,count = 0;for(var i = 0; i < x; i++){count += val[i];}return count/x;},
 	    //for the median, values can now be unorganized:
 	    median: function(val){
 	    	if (exports.numberFunctions.isEven(val.length)) {var x=val.sort();return (x[((x.length + 2)/2)-2]+x[((x.length + 2)/2)-1])/2}
 	    	else {var x=val.sort();return x[((x.length + 1)/2)-1]}
 	    },
     	min: function(val){return Math.min(val)},
 	    mode: function(arr){return arr.reduce(function(current, item){var val=current.numMapping[item]=(current.numMapping[item]||0)+1;
            if(val>current.greatestFreq){current.greatestFreq=val;current.mode=item;}return current;},
            {mode:null,greatestFreq:-Infinity,numMapping:{}}).mode;
        },
 	    range: function(val){return Math.max(val)-Math.min(val)}
    };
    exports.data.meanDeviation = function(values){var avg=exports.data.mean(values);var squareDiffs=values.map(function(value){var diff=value-avg;return diff;});
        var avgSquareDiff=exports.data.mean(squareDiffs);return avgSquareDiff;
    };
    exports.data.standardDeviation = function(values){var avg=exports.data.mean(values);var squareDiffs=values.map(function(value){var diff=value-avg;
        var sqrDiff=diff*diff;return sqrDiff;});var avgSquareDiff=exports.data.mean(squareDiffs);var stdDev = Math.sqrt(avgSquareDiff);return stdDev;
    };
    exports.data.variance = function(values){var sd=exports.data.standardDeviation(values);return sd**2;};
	exports.dir = function(data, isXML) {if (isXML) {console.dirxml(data)} else {console.dir(data)}};
	exports.execute = function(func) {
		if (exports.IsFunction(func)) {return func();}
		else {return func;}
	};
	exports.factorial = function(n) {
		if (n==0) {return 1}
		if (n<0) {console.error("sci.factorial: unexpected Math error");return undefined}
		var count = 1;
		for (i=0; i<n+1; i++) {count *= i}
		return count;
	};
	exports.fromSimple3dTo2d = function(focalLength, x, y, z) { //?
		focalLength = focalLength || 1000;
		x = x || 0;
		y = y || 0;
		z = z || 0;
		var Point3D = {x: x, y: y, z: z};
		var scale = focalLength/(Point3D.z+focalLength);
		var Point2D = {x: Point3D.x*scale, y: Point3D.y*scale};
		return Point2D;
	};
	exports.geometry = {
		area: {
	   	    annulus: function(r1, r2) {return Math.PI*(r1-r2)},
	       	circle: function(r) {return Math.PI*(r*r)},
	        circleLog: function(c, d) {return c*d/4},
	        ellipse: function(a, b) {return (Math.PI)*a*b},
	        lunarCrescent: function(c, d) {return (1/4)*Math.PI*c*d},
	        rectangle: function(l, w) {return l*w},
	        rectangleCornersRounded: function(l, w, r) {return ((l*w)-((r*r)*(4-Math.PI)))},
	        square: function(s) {return s*s},
	        trapezium: function(a, c, h) {return h*((a+c)/2)},
		    triangle: function(b, h) {return (b*h)/2}
	    },
	    ellipseRadialEquivalent: function(a, b) {return (a+b)/2},
	    perimeter: {
	       	//PERIMETER OF ELLIPSE
	       	//if r*r changes to unknown a*b,
	       	//r can be restored by using the mean formula (a+b)/2
	       	//however, with the formula 2*pi*r, and the /2 in the mean formula,
	       	//discard 2 on numerator and denominator. :)
	       	ellipse: function(a, b) {var r = (a+b); return Math.PI*r},
	        rectangle: function(l, w) {return 2*(l+w)},
	        square: function(s) {return s*4},
	        trapezium: function(a, b, c, d) {
		        var e = a || 1;
		        var f = b || e;
		        var g = c || f;
		        var h = d || g;
		        return e+f+g+h;
	        },
	        triangle: function(a, b, c) {
		        var d = a || 1;
		        var e = b || d;
		        var f = c || e;
		        return d+e+f;
	        }
	    },
        tsa: {
	        cube: function(s) {return 6*(s*s)},
	        cuboid: function(l, w, h) {return (2*l*w)+(2*w*h)+(2*h*l)},
	        cylinder: function(r, h) {return 2*Math.PI*r*(h+r)},
	        sphere: function(r) {return 4*Math.PI*(r**2)},
	        torus: function (r, R) {
	    	    var p = Math.PI**2;
	    	    return 4*p*R*r*r;
	        },
	        tube: function(h, r1, r2) {
	    	    var a = r1**2, b = r2**2, p = 2*Math.PI;
		        return p*((a-b)+(h*(a+b)));
	        }
        },
        volume: {
	        cone: function(r, h) {var a=Math.PI*(1/3),b=r*r*h;return a*b},
	        cube: function(s) {return s**3},
	        cuboid: function(l, w, h) {return l*w*h},
	        cylinder: function(r, h) {return Math.PI*(r*r)*h},
	        ellipsoid: function(a, b, c) {return (4/3)*Math.PI*a*b*c},
	        ellipsoidOblate: function(a, b) {return (4/3)*Math.PI*a*a*b},
	        ellipsoidProlate: function(a, b) {return (4/3)*Math.PI*a*b*b},
	        sphere: function(r) {var a=(4/3)*Math.PI,b=r**3;return a*b},
	        torus: function(r, R) {
	    	    var p = Math.PI**2;
		        return 2*p*R*r*r;
		    },
		    tube: function(h, r1, r2) {
			    var a = 2*r1*Math.PI*h, b = 2*r2*Math.PI*h;
			    return a-b;
	        }
	    }
	};
	exports.getArguments = function(obj) {
		if (obj.arguments !== undefined) {return obj.arguments}
		else {console.error("sci.getArguments: arguments of obj are either unavailable or undefined.")}
	};
	exports.getArrayEnd = function(arr) {return arr[arr.length]};
	exports.getByTagNS = function(nsuri, tag) {return document.getElementsByTagNameNS(nsuri, tag)};
	Object.assign(exports.getByTagNS, {
		normal: function(tag) {return getByTag(tag)},
		warning: function() {console.warn("sci.getByTagNS: Please note that this may not work in earlier versions, beta versions or other software or apps.")}
	});
	exports.getCtx = function(canvas, ctxType, ctxAttributes) {return canvas.getContext(ctxType, ctxAttributes)};
	exports.getInnerHTML = function(elm) {return elm.innerHTML};
	exports.getLength = function(obj) {return obj.length};
	exports.getName = function(obj) {return obj.name};
	exports.getPrototype = function(obj) {
		if (obj.prototype !== undefined) {return obj.prototype}
		else {console.error("sci.getPrototype: obj.prototype is undefined.");return obj}
	};
	Object.assign(exports.getPrototype, {
		warning: function() {console.warn("sci.getPrototype: I couldn\'t use __proto__ as an alternative due to its deprecated use.")}
	});
	exports.getSingleElement = function(id, n) {
		var i = n || 0;
		var elm = document.getElementById(id) || document.getElementsByName(id)[i] || 
		document.getElementsByClassName(id)[i] || document.getElementsByTagName(id)[i] || id[i];
		return elm;
	};
	Object.assign(exports.getSingleElement, {
		normal: function(id) {return getElements(id)},
		warning: function() {console.warn("sci.getSingleElement: Please note that the id must not be specific (i.e. only id, not document.getElementById(id)).")}
	});
	exports.importSciElements = function() {
		exports.importScript('SCIJS-Alpha/sciElements.js');
		//not in sci, please
		return exports;
	};
	exports.importSciScripts = function() {
		exports.importScript();
		exports.importSCI2D();
		exports.importSciElements();
		exports.importSCON();
		return exports;
	};
	exports.importScript = function(src) {
		var imported = document.createElement("script");
		imported.src = src || 'SCIJS-Alpha/sciMainBeta.js';
		document.head.appendChild(imported);
		return imported;
	};
	exports.importSCI2D = function() {
		exports.importScript('SCIJS-Alpha/SCI2D.js');
		exports.SCI2D = SCI2D;
		return exports;
	};
	exports.importSCON = function() {
		exports.importScript('SCIJS-Alpha/SCON.js');
		return exports;
	};
	exports.importSMATH = function() {
		exports.importScript('SCIJS-Alpha/SMATH.js');
		return exports;
	};
	exports.jsonFromServerBeta = function(method, file, async, str) {
		if (async === undefined) {async=true}
		if (file === undefined) {console.error("sci.jsonFromServerBeta: file is not defined");return;}
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				var myObj = JSON.parse(this.responseText);
				return myObj;
			}
		};
		xmlhttp.open(method, file, async);
		if (str !== undefined) {xmlhttp.send(str);} else {xmlhttp.send();}
	};
	exports.logAllVariables = function() {for(var b in window){if(window.hasOwnProperty(b)){console.log(b)}}};
	exports.makeFalse = function(replacee) {replacee=false;return replacee};
	exports.makeTrue = function(replacee) {replacee=true;return replacee};
	exports.math = {
		E1: 2.71,
		E2: 2.71828,
		EMATH: Math.E,
		HALF: 1/2 || 0.5,
		Infinity: Infinity || window.Infinity || Number.POSITIVE_INFINITY,
		LN10: Math.LN10,
		LN2: Math.LN2,
		LOG10E: Math.LOG10E,
		LOG2E: Math.LOG2E,
		MAX_SAFE_INT: Number.MAX_SAFE_INTEGER,
		MAX_VAL: Number.MAX_VALUE,
		MIN_SAFE_INT: Number.MIN_SAFE_INTEGER,
		MIN_VAL: Number.MIN_VALUE,
		NAN: NaN || window.NaN,
		NEGATIVE_INFINITY: -Infinity,
		NULL: null,
		PI1: 3.14,
		PI2: 3.1416,
		PI3: 3.1415962536,
		PIFRAC: 22/7,
		PIMATH: Math.PI,
		PIOVERE: Math.PI / Math.E,
		PISTRING: "3.1415926535897932384626433832795028841971693993751058209749"+
	        "445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019"+
	        "385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602"+
            "491412737245870066063155881748815209209628292540917153643678925"+
            "903600113305305488204665213841469519415116094330572703657595919530"+
            "9218611738193261179310511854807446237996274956735188575272489122793"+
            "818301194912983367336244065664308602139494639522473719070217986"+
            "094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872"+
            "1468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771",
		POSITIVE_INFINITY: Infinity,
		SQRT1_2: Math.SQRT1_2,
		SQRT2: Math.SQRT2,
		UNDEFINED: undefined,

		e: function(x){return Math.exp(x)},
		power10: function(exp) {return 10**exp},
		power2: function(exp) {return 2**exp}
	};
	exports.math.regPol = {
	    area: function(perimeter, apothem){if(apothem==null){console.error("sci.math.regPol.area: apothem is not defined")}else{return (perimeter*apothem)/2}},
	    circumference: function(radius){return 2*r*Math.PI},
        perimeter: function(sidenumbers, sidelength){return sidenumbers*sidelength}
    };
	exports.math.root = {
		cube: function(n){return Math.cbrt(n)},
		hex: function(n){return Math.sqrt(Math.cbrt(n))},
		nth: function(n, denom, numer){if(numer==null){return n**(1/denom)}else{return n**(numer/denom)}},
		quad: function(n){return Math.sqrt(Math.sqrt(n))},
		square: function(n){return Math.sqrt(n)}
	};
	exports.math.sign = function(n) {
		if (n<0) {return -1}
		else if (n==0 || n==false)  {return 0}
		else if (n>0 || n==true) {return 1}
		else if (n===undefined) {return undefined}
		else {return NaN}
	};
	exports.math.solveForX = {
	    //standard forms
	    linearEquation: function(a, b){return -b / a},
	    quadraticEquation: function(a, b, c){
		    var Dis = exports.numberFunctions.root.square(b**2) - (4*a*c);
		    var Dnm = 2*a;
		    var s1 = (-b + Dis)/Dnm;
		    var s2 = (-b - Dis)/Dnm;
		    return [s1, s2];
	    }
    };
	exports.math.summation = function(values, isString) {
    	var count=0; if (isString) {count=""}
    	for (var i=0; i<values.length; i++) {
    		count += values[i];
    	}
    	return count;
    };
	exports.math.switchSign = function(n) {n=-n;return n};
	exports.negate = function(n) {if (IsPositive(n)) {n=-n;return n} else {console.warn("sci.negate: number is already negative: " + n);return n}};
	exports.new = function(func) {var arg=func || Object;return new arg};
	Object.assign(exports.new, {
		warning: function() {console.warn("sci.new: When the function is undefined, the result will be a new Object (i.e. {}).")}
	});
	exports.newArray = function() {return new Array()};
	exports.newBoolean = function() {return new Boolean()};
	exports.newDate = function() {return new Date()};
	exports.newError = function() {return new Error()};
	exports.newFunction = function() {return new Function()};
	exports.newObject = function() {return new Object()};
	exports.newRegExp = function() {return new RegExp()};
	exports.newString = function() {return new String()};
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
    exports.objAssign = function(target, src) {Object.assign(target, src);return target};
    exports.objFreeze = function(obj, x) {obj.freeze(x);return obj};
    exports.objIs = function(obj, v1, v2) {return obj.is(v1, v2)};
    exports.object = {
    	assign: Object.assign,
    	create: Object.create,
    	defineProp: Object.defineProperty,
    	defineProps: Object.defineProperties
    };
	exports.operators = {
		//NOTE: some operators don't work or don't fully function, so just be off with it.
		and: function(a, b) {return a & b},
		decrement: function(x) {x=x++;return x},
		in: function(prop, obj) {return (prop in obj)},
		increment: function(x) {x=x--;return x},
		instanceof: function(prop, arg) {return (prop instanceof arg)},
		modulus: function(x, y) {return x % y},
		not: function(a) {return ~ a},
		or: function(a, b) {return a | b},
		shiftLeft: function(a, b) {return a << b},
		shiftRight: function(a, b) {return a >> b},
		typeof: function(arg) {return typeof arg},
		xor: function(a, b) {return a ^ b}
	};
	exports.parseFloat = function(str) {return Number.parseFloat(str)};
	exports.parseInt = function(str, radix) {return Number.parseInt(str, radix)};
	exports.posate = function(n) {if (IsPositive(n)) {console.warn("sci.posate: number is already positive: " + n);return n} else {n=Math.abs(n);return n}};
	Object.assign(exports.posate, {warning: function() {console.warn("sci.posate: Please note that the function used is n=Math.abs(n), not n=-n.")}});
	exports.random = function(n){if(n==null){return Math.random()}else{return Math.floor(Math.random()*n)}};
	exports.removeClass = function (sel, name) {
        exports.removeClassElements(getElements(sel), name);
    };
	exports.removeClassElement = function (element, name) {
        var i, arr1, arr2;
        arr1 = element.className.split(" ");
        arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {
            while (arr1.indexOf(arr2[i]) > -1) {
                arr1.splice(arr1.indexOf(arr2[i]), 1);
            }
        }
        element.className = arr1.join(" ");
    };
    exports.removeClassElements = function (elements, name) {
        var i, l = elements.length, arr1, arr2, j;
        for (i = 0; i < l; i++) {
            exports.removeClassElement(elements[i], name);
        }
    };
    exports.reverseArray = exports.array.reverse || "unavailable";
    exports.reverseBoolean = function(bool) {
    	if (bool === true) {return false}
    	return true;
    };
    exports.reverseString = function(str) {return str.split("").reverse().join("")};
	exports.rot3d = function(elm, x, y, z, angle) {elm.style.transform = "rotate3d("+x+","+y+","+z+","+angle+")"};
	exports.setInterval = function(func, seconds) {var x = setInterval(func, seconds*1000);return x};
	exports.setTimeout = function(func, seconds) {var x = setTimeout(func, seconds*1000);return x};
	exports.slideshow = function (sel, ms, func) {var i, ss, x = sci.getElements(sel), l = x.length;ss = {};ss.current = 1;ss.x = x;ss.ondisplaychange = func;
        if (!isNaN(ms) || ms == 0) {
            ss.milliseconds = ms;
        } else {
            ss.milliseconds = 1000;
        }
        ss.start = function() {
            ss.display(ss.current)
            if (ss.ondisplaychange) {ss.ondisplaychange();}
            if (ss.milliseconds > 0) {
                window.clearTimeout(ss.timeout);
                ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
            }
        };
        ss.next = function() {
            ss.current += 1;
            if (ss.current > ss.x.length) {ss.current = 1;}
            ss.start();
        };
        ss.previous = function() {
            ss.current -= 1;
            if (ss.current < 1) {ss.current = ss.x.length;}
            ss.start();
        };
        ss.display = function (n) {
            styleElements(ss.x, "display", "none");
            styleElement(ss.x[n - 1], "display", "block");
        }
        ss.start();
        return ss;
    };
    exports.stringExec = function(patt, str) {return patt.exec(str)};
    exports.stringIncludes = function(str, sub, pos) {return str.includes(sub, pos)};
    exports.stringNumber = function(nums) {
    	var num = "";
    	for (var i=0; i<nums.length; i++) {num += nums[i]}
    	return Number(num);
    };
    exports.stringReplace = function(str, sub, newstr) {var a = str.replace(sub, newstr);return a};
    exports.stringSearch = function(str, sub) {return str.search(sub)};
    exports.stringTest = function(patt, str) {return patt.test(str)};
	exports.ToLocaleString = function(arg) {return arg.toLocaleString()};
	exports.ToString = function(arg) {return arg.toString()};
	exports.temp = {
	    //fahrenheit
	    toCelsius: function(fahrenheit){return (5/9)*(fahrenheit-32)},
	    toDelisle: function(fahrenheit){return (212-fahrenheit)*(5/6)},
	    toKelvin: function(fahrenheit){return ((5/9)*(fahrenheit-32))+273.15},
	    toRankine: function(fahrenheit){return fahrenheit+459.67}
    };
    exports.temp.toGasMark = function(fahrenheit){var c=exports.temperature.toCelsius(fahrenheit);return (c-121)/14};
    exports.temp.toNewton = function(fahrenheit){var c=exports.temperature.toCelsius(fahrenheit);return c*0.33};
    exports.temp.toReaumur = function(fahrenheit){var c=exports.temperature.toCelsius(fahrenheit);return c*0.8};
    exports.temp.toRomer = function(fahrenheit){var c=exports.temperature.toCelsius(fahrenheit);return (c*(21/40))+7.5};
    exports.throw = function(arg) {throw arg};
    exports.toggle = function(thing, val1, val2) {
    	if (thing === val1) {thing = val2; return thing}
    	else {thing = val1; return thing}
    };
    exports.toggleBoolean = function(bool) {
    	if (bool) {bool = false;return bool}
    	else {bool = true;return bool}
    };
	exports.toggleClassElement = function (element, c1, c2) {
        var t1, t2, t1Arr, t2Arr, j, arr, allPresent;
        t1 = (c1 || "");
        t2 = (c2 || "");
        t1Arr = t1.split(" ");
        t2Arr = t2.split(" ");
        arr = element.className.split(" ");
        if (t2Arr.length == 0) {
            allPresent = true;
            for (j = 0; j < t1Arr.length; j++) {
                if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
            }
            if (allPresent) {
                exports.removeClassElement(element, t1);
            } else {
                exports.addClassElement(element, t1);
            }
        } else {
            allPresent = true;
            for (j = 0; j < t1Arr.length; j++) {
                if (arr.indexOf(t1Arr[j]) == -1) {allPresent = false;}
            }
            if (allPresent) {
                exports.removeClassElement(element, t1);
                exports.addClassElement(element, t2);          
            } else {
                exports.removeClassElement(element, t2);        
                exports.addClassElement(element, t1);
            }
        }
    };
	exports.toggleObjectValue = function(obj, val) {
    	var oldobj = obj, newobj = val;
    	if (obj==oldobj) {obj=newobj}
    	else {obj=oldobj}
    	return obj;
    };
    exports.traceFunc = function() {console.trace()};
    exports.transistorGates = { //shows the ON or HIGH conditions
    	AND: [1, 1],
    	NAND: function(a, b) {
    		if (a==0) {a=1} else {a=0}
    		if (b==0) {b=1} else {b=0}
    		return [a, b];
    	},
    	NOR: [0, 0],
    	NOT: function(a) {if (a==0) {return 1} else {return 0}},
    	OR: [[1, 0], [0, 1], [1, 1]],
    	XNOR: [[0, 0], [1, 1]],
    	XOR: [[1, 0], [0, 1]]
    };
    exports.trans3d = function(elm, x, y, z) {elm.style.transform = translate3d(x, y, z)};
	exports.trig = {
	    cos: function(radians){return Math.cos(radians)},
	    cosh: function(radians){return Math.cosh(radians)},
	    pythagoreanTheoremAdjacent: function(opp, hyp){var a=Math.sqrt((hyp**2)-(opp**2));return a;},
	    pythagoreanTheoremHypotenuse: function(adj, opp){var c=Math.sqrt((adj**2)+(opp**2));return c;},
	    pythagoreanTheoremOpposite: function(adj, hyp){var b=Math.sqrt((hyp**2)-(adj**2));return b;},
	    sin: function(radians){return Math.sin(radians)},
	    sinh: function(radians){return Math.sinh(radians)},
	    tan: function(radians){return Math.tan(radians)},
	    tanh: function(radians){return Math.tanh(radians)}
    };
    exports.typeOf = function(arg) { //a more specific typeof
    	if (arg===true || arg===false) {return "boolean"}
    	else if (typeof arg === "function") {return "function"}
    	else if (typeof arg === "object" && Array.isArray(arg)==false)  {return "object"}
    	else if (typeof arg === "object" && Array.isArray(arg)==true) {return "array"}
    	else if (arg == Infinity || arg == -Infinity) {return "infinity"}
    	else if (typeof arg === "number") {return "number"}
    	else if (typeof arg === "string") {return "string"}
    	else {return "undefined"}
    };
	exports.typeOfBeta=function(arg) {return typeof arg};
	exports.typewriter = function(elm, i, txt, spd) {if (i<txt.length) {elm.innerHTML=txt.charAt(i);i++;setTimeout(typewriter(elm, i, txt, spd), spd)}};
	exports.undefined = undefined;
	exports.undefinedTypeof = "undefined";
	exports.valOf = function(obj) {var o=obj || exports; return o};
	exports.whatConstructor = function(arg) {return arg.constructor};


}));
//others
sci.otherMath = { //realities?
	acceleration: function(s, t) {return s/t},
    angleDegreesBetweenTwoClockHands: function(m, h) {return (5.5*m)-(30*h)}, //degrees
    cardsForCardHouse: function(layers) {var a=(3*layers)+1;var b=layers*a;return b/2},
    combination: function(n, r) {
    	var a = sci.factorial(n), b = sci.factorial(r);
    	var c = (a)/(b*sci.factorial(n-r));return c;
    },
    density: function(mass, volume) {return mass/volume},
    dominoOrientations: function(dominoes, doubles) {var n=dominoes;var f=exports.factorial(n);var m=2**(n-doubles);return m*f;},
    gravityHunDigit: 9.81,
    gravityRounded: 10,
    gravityTenDigit: 9.8,
    highestAmountNotPossible: function(x, y) {return (x*y)-x-y},
    maxRangeOfCannonAt45deg: function(v, g) {return (v*v)/g},
    noughtsAndCrossesWinningLines: function(g) {return 2*(g+1)},
    permutations: function(n, r) {return sci.factorial(n)/sci.factorial(n-r)},
    powerOfTwoTotal: function(highestPower) {
    	//this starts at 2**0 (which is 1)
    	//summing with 1+2+3+...+2**highestPower
    	//you'd think I'd be using a summation loop or a for() function... but you're wrong :)
    	//I have my own formula... which works! Well, kinda
    	if (highestPower < 0) {
    		console.error("sci.otherMath.powerOfTwoTotal: highestPower must be equal or higher than 0.");
    		return 1;
    	}
    	if (highestPower === 0 || highestPower === undefined) {return 1}
    	var n = highestPower || 1;
    	return 2**(n+1) - 1;
    },
    rotateVertex: function(vertex, angle) {
    	var x = vertex.x, y = vertex.y, a = angle || 45;
    	var cos = Math.cos(a), sin = Math.sin(a);
		vertex.x = (x * cos) - (y * sin);
		vertex.y = (x * sin) + (y * cos);
		return vertex;
    }
};


//Scanvas for canvases
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.Scanvas = function(arg) {return arg}));
}(this, function (exports) {
	var DEG = Math.PI / 180;
	exports.VERSION = sci.VERSION;
	exports.constructor = Object;
	exports.constructor.IS_EXPORTS_DEPENDENT = true;
	exports.constructor.IS_GLOBALLY_SCATTERED = true;
	exports.constructor.IS_SCI = true;
	exports.prototypeExternal = sci || "unavailable";
	if (window.sci !== undefined) {exports.constructor.IS_IN_WINDOW = true}
	else {exports.constructor.IS_IN_WINDOW = false}
	exports.__SETTINGS__ = sci.__SETTINGS__ || "unavailable";
	//funcs
	exports.DEG = DEG;
	exports.rotate = function(ctx, angle) {ctx.rotate(angle)};
	exports.reqFrame = function(func) {requestAnimationFrame(func)};
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
		if (fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
		else {ctx.closePath()}
	};useFunc(exports.drawVertices);

    //text
    exports.text = function(ctx, point, text, font, maxWidth, stroke, fill) {
    	this.ctx = ctx;
    	this.font = font;
    	ctx.font = this.font || "20px Georgia";
    	this.t = text || "Hello World!";
    	this.point = point || {x: 100, y: 100};
    	this.stroke = stroke || "black";
		this.fill = fill || "black";
		this.maxWidth = maxWidth || 200;
    	if (fill !== undefined) {ctx.fillStyle = fill || "black";ctx.fillText(this.t, this.point.x, this.point.y, maxWidth)}
    	else if (stroke !== undefined) {ctx.strokeStyle = stroke || "black";ctx.strokeText(this.t, this.point.x, this.point.y, maxWidth)}
    };useFunc(exports.text);

    //lines
    exports.dashedLine = function(ctx, Vertices, segments, stroke, fill) {
    	this.ctx = ctx;
    	this.vertices = Vertices || [100, 100, 100, 300];
    	this.segments = segments || [5, 15];
    	this.stroke = stroke;
		this.fill = fill;
		var s = this.segments; var vertices = this.vertices;
    	var x, y;
    	ctx.beginPath();
		ctx.setLineDash(s);
		ctx.moveTo(vertices[0], vertices[1]);
		for (var i=2; i<vertices.length; i+=2) {
			x = vertices[i]; y = vertices[i+1];
			ctx.lineTo(x, y);
		}
		ctx.strokeStyle = this.stroke || "black";
		ctx.stroke();
		ctx.setLineDash([]);
		if (fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
		else {ctx.closePath()}
    };useFunc(exports.dashedLine);

    //geometry assignments and other flips
    exports.drawImage = function(ctx, img, x, y) {ctx.drawImage(img, x, y)};
    //see circle example in https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath
    exports.isPointInPath = function(ctx, path, x, y, fillRule) {return ctx.isPointInPath(path, x, y, fillRule)};
    exports.newPath2D = function() {return new Path2D()};
    function useFunc(func) {
    	func.mainType = "Geometry";
    	Object.assign(func, {
    		accessSci: function() {return sci},
    		getCtx: function() {return this.ctx},
    		getDetails: function() {return func},
    		getDetailsString: function() {return "" + func},
    		getLength: function() {return func.length},
    		getMainType: function() {return func.mainType},
    		setVertices: function(vertices) {
    			if (this.vertices == undefined) {console.warn("Scanvas: no vertices found");return this}
    			else {this.vertices = vertices || [100, 100];return this}
    		}
    	});
    	func.prototype.constructor = Scanvas.prototype;
    };

    //geometries
    exports.arcGeometry = function(ctx, center, radius, startAngle, endAngle, isCounter, stroke, fill) {
    	this.ctx = ctx;
    	this.r = radius || 10;
    	this.sA = startAngle || 0;
    	this.eA = endAngle || Math.PI;
    	this.c = center || {x: 100, y: 100};
    	this.stroke = stroke;
		this.fill = fill;
		this.isCounter = isCounter || false;
    	ctx.beginPath();
    	ctx.arc(this.c.x, this.c.y, this.r, this.sA, this.eA, this.isCounter);
    	ctx.strokeStyle = this.stroke || "black";
		ctx.stroke();
		if (fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
    	else {ctx.closePath()}
    };useFunc(exports.arcGeometry);
    exports.circleGeometry = function(ctx, center, radius, stroke, fill) {
    	this.ctx = ctx;
    	this.e = 2 * Math.PI;
    	this.c = center || {x: 100, y: 100};
    	this.r = radius || 10;
    	this.stroke = stroke;
		this.fill = fill;
    	exports.arcGeometry(this.ctx, this.c, this.r, 0, this.e, false, this.stroke, this.fill);
    };useFunc(exports.circleGeometry);
    exports.ellipseGeometry = function(ctx, center, radiusX, radiusY, rotation, startAngle, endAngle, isCounter, stroke, fill) {
    	this.ctx = ctx;
    	ctx.beginPath();
    	this.c = center || {x: 100, y: 100};
    	this.rx = radiusX || 10; this.ry = radiusY || 15;
    	this.rot = rotation || 0;
    	this.sA = startAngle || 0; this.eA = endAngle || (2 * Math.PI);
    	this.stroke = stroke;
		this.fill = fill;
		this.isCounter = isCounter || false;
    	ctx.ellipse(this.c.x, this.c.y, this.rx, this.ry, this.rot, this.sA, this.eA, this.isCounter);
    	ctx.strokeStyle = this.stroke || "black";
    	ctx.stroke();
		if (fill !== undefined) {ctx.fillStyle=this.fill;ctx.fill()}
    	else {ctx.closePath()}
    };useFunc(exports.ellipseGeometry);
    exports.rectGeometry = function(ctx, center, distanceX, distanceY, stroke, fill) {
    	this.ctx = ctx;
    	if (distanceX === distanceY) {exports.squareGeometry(ctx, center, distanceX, stroke, fill)}
    	else {
    		var dx = distanceX || 10;
    		var dy = distanceY || 20;
    		var c = center || {x: 100, y:100};
    		this.dx = dx; this.dy = dy;
    		this.c = c;
    		this.stroke = stroke; this.fill = fill;
    		this.vertices = [
    		    c.x-dx, c.y-dy, //top left
    		    c.x+dx, c.y-dy, //top right
    		    c.x+dx, c.y+dy, //bottom right
    		    c.x-dx, c.y+dy, //bottom left
    		    c.x-dx, c.y-dy  //top left again
    		];
    		exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
    	}
    };useFunc(exports.rectGeometry);
    exports.rectRingGeometry = function(ctx, center, distanceX1, distanceX2, distanceY1, distanceY2, stroke1, stroke2, fill1, fill2) {
    	this.ctx = ctx;
    	var dx1 = distanceX1 || 10; var dx2 = distanceX2 || 5;
    	var dy1 = distanceY1 || 20; var dy2 = distanceY2 || 10;
    	var c = center || {x: 100, y:100};
    	this.dx1 = dx1; this.dx2 = dx2;
    	this.dy1 = dy1; this.dy2 = dy2;
    	this.stroke1 = stroke1;
		this.fill1 = fill1;
		this.stroke2 = stroke2;
		this.fill2 = fill2;
    	this.c = c;
    	this.vertices1 = [
    		c.x-dx1, c.y-dy1, //top left
    		c.x+dx1, c.y-dy1, //top right
    		c.x+dx1, c.y+dy1, //bottom right
    		c.x-dx1, c.y+dy1, //bottom left
    		c.x-dx1, c.y-dy1  //top left again
    	];
    	exports.drawVertices(this.ctx, this.vertices1, this.stroke1, this.fill1);
    	this.vertices2 = [
    		c.x-dx2, c.y-dy2, //top left
    		c.x+dx2, c.y-dy2, //top right
    		c.x+dx2, c.y+dy2, //bottom right
    		c.x-dx2, c.y+dy2, //bottom left
    		c.x-dx2, c.y-dy2  //top left again
    	];
    	exports.drawVertices(this.ctx, this.vertices2, this.stroke2, this.fill2);
    };useFunc(exports.rectRingGeometry);
    exports.rightTriangleGeometry = function(ctx, rightPoint, distanceX, distanceY, stroke, fill) { //rightPoint at 90deg
    	this.ctx = ctx;
    	var c = rightPoint || {x: 100, y: 100};
    	var dx = distanceX || 10; var dy = distanceY || -10;
    	this.c = c; this.dx = dx; this.dy = dy;
    	this.stroke = stroke;
		this.fill = fill;
    	this.vertices = [
    	    c.x, c.y,    //rightPoint
    	    c.x+dx, c.y, //horizontal
    	    c.x, c.y+dy, //vertical
    	    c.x, c.y     //rightPoint again
    	];
    	exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
    };useFunc(exports.rightTriangleGeometry);
    exports.ringGeometry = function(ctx, center, rad1, rad2, stroke1, stroke2, fill1, fill2) {
    	this.ctx = ctx;
    	var r1 = rad1 || 10; var r2 = rad2 || 5;
    	var c = center || {x: 100, y: 100};
    	this.r1 = r1; this.r2 = r2;
    	this.c = c;
    	this.stroke1 = stroke1;
		this.fill1 = fill1;
		this.stroke2 = stroke2;
		this.fill2 = fill2;
    	ctx.beginPath();
    	ctx.arc(c.x, c.y, r1, 0, 2 * Math.PI, false);
    	ctx.strokeStyle = this.stroke1 || "black";
		ctx.stroke();
		if (fill1 !== undefined) {ctx.fillStyle=this.fill1;ctx.fill()}
    	else {ctx.closePath()}

    	ctx.beginPath();
        ctx.arc(c.x, c.y, r2, 0, 2 * Math.PI, false);
    	ctx.strokeStyle = this.stroke2 || "black";
		ctx.stroke();
		if (fill2 !== undefined) {ctx.fillStyle=this.fill2;ctx.fill()}
    	else {ctx.closePath()}
    };useFunc(exports.ringGeometry);
    exports.squareGeometry = function(ctx, center, distance, stroke, fill) { //center for c.x, c.y
    	this.ctx = ctx;
    	var d = distance || 10;
    	var c = center || {x: 100, y:100};
    	this.d = d; this.c = c;
    	this.stroke = stroke;
		this.fill = fill;
    	this.vertices = [
    	    c.x-d, c.y-d, //top left
    	    c.x+d, c.y-d, //top right
    	    c.x+d, c.y+d, //bottom right
    	    c.x-d, c.y+d, //bottom left
    	    c.x-d, c.y-d  //top left again
    	];
    	exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
    };useFunc(exports.squareGeometry);
    exports.trapezoidGeometry = function(ctx, center, base1, base2, height, stroke, fill) {
    	this.ctx = ctx;
    	var c = center || {x: 100, y:100};
    	var b1 = base1 || 17; var b2 = base2 || 10;
    	var h = height || 7;
    	this.c = c; this.b1 = b1; this.b2 = b2;
    	this.h = h;
    	this.stroke = stroke;
		this.fill = fill;
    	this.vertices = [
    	    c.x-(b1/2), c.y+(h/2), //tl
    	    c.x+(b1/2), c.y+(h/2), //tr
    	    c.x+(b2/2), c.y-(h/2), //br
    	    c.x-(b2/2), c.y-(h/2), //bl
    	    c.x-(b1/2), c.y+(h/2)
    	];
    	exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
    };useFunc(exports.trapezoidGeometry);
    exports.trianglePointGeometry = function(ctx, point, distanceX, distanceY, stroke, fill) {
    	this.ctx = ctx;
    	var c = point || {x: 100, y: 100};
    	var dx = distanceX || 7; var dy = distanceY || 10;
    	this.c = c; this.dx = dx; this.dy = dy;
    	this.stroke = stroke;
		this.fill = fill;
    	this.vertices = [
    	    c.x, c.y,
    	    c.x, c.y+dy,
    	    c.x+dx, c.y+(dy/2),
    	    c.x, c.y
    	];
    	exports.drawVertices(this.ctx, this.vertices, this.stroke, this.fill);
    };useFunc(exports.trianglePointGeometry);
}));
sci.prototype.canvasHandler = Scanvas || "unavailable";