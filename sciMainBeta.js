/* SciJS Main Beta: SCI
 * By SciPred, made 2019
 * Free To Use.
*/

//QUICK NOTE
//elm and elmnt are supposed to be something like document.getElementById(id), not just id.

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.sciBeta = function() {alert("THANK YOU FOR USING sciMain.js, YOU MAY NOW PROCEED.")}));
}(this, function (exports) {'use strict';
	/* BETA FUNCTIONS (not actually beta but u know what i mean) */
	//POLYFILLS (in case)
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
	//FUNCTIONS (sure nuff any function with // end is exported from bottom)
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
		function dragMouseDown(e) {e = e||window.event;
			e.preventDefault();
			pos3=e.clientX;
			pos4=e.clientY;
			document.onmouseup=closeDragElement;
			document.onmousemove=elementDrag;
		}
		function elementDrag(e) {e = e||window.event;
			e.preventDefault();
			pos1=pos3 - e.clientX;
			pos2=pos4 - e.clientY;
			pos3=e.clientX;
			pos4=e.clientY;
			elm.style.top = (elm.offsetTop - pos2) + "px";
			elm.style.left = (elm.offsetLeft - pos1) + "px";
		}
		function closeDragElement() {document.onmouseup = null;document.onmousemove = null;}
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
	function fullHeightElement(elm) {document.body.style.margin=0;elm.style.height=document.body.height} //using given body height because editing the body height may cause problems
	function getByClass(cls) {return document.getElementsByClassName(cls)}//
	function getById(id) {return document.getElementById(id)}//
	function getByName(name) {return document.getElementsByName(name)}//
	function getByQSelectorAll(id) {return document.querySelectorAll(id)}//
	function getByTag(tag) {return document.getElementsByTagName(tag)}//
	function getElements(id) {if(typeof id == "object"){return [id];}else{return getByQSelectorAll(id);}}//
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
	function jsonParse(parsable) {return JSON.parse(parsable)}
	exports.jsonParse = jsonParse;
	function jsonString(stringable) {return JSON.stringify(stringable)}
	exports.jsonString = jsonString;
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
	function stringRepeat(str, times) {if(times<0){console.warn("sci.stringRepeat: times is negative: "+times+", turning into positive.");return str.repeat(Math.abs(times))}else{return str.repeat(times)}}
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
    function triggerButtonOnKeyCode(btn, keyevt, keycode) {btn.addEventListener(keyevt, function(event) {if (event.keyCode === keycode) {event.preventDefault();btn.click()}})}
    exports.triggerButtonOnKeyCode = triggerButtonOnKeyCode;
	function typewriter(elm, i, txt, spd) {if (i<txt.length) {elm.innerHTML=txt.charAt(i);i++;setTimeout(typewriter(elm, i, txt, spd), spd)}}
	exports.typewriter = typewriter;
	//IS and HAS FUNCTIONS (not caps)
	function hasConnection() {return (navigator.onLine && document.isConnected)}
	exports.hasConnection = hasConnection;
	function isCheckboxChecked(checkbox) {return checkbox.checked}
	exports.isCheckboxChecked = isCheckboxChecked;
	function isDeviceConnected(n) {return document.isConnected}
	exports.isDeviceConnected = isDeviceConnected;
	function isOnCapsLock(input, keyevt) {input.addEventListener(keyevt, function(event) {if (event.getModifierState("CapsLock")) {return true} else {return false}})}
	exports.isOnCapsLock = isOnCapsLock;
	function isOnline() {return navigator.onLine}
	exports.isOnline = isOnline;
	function isVisibleHTML(elm) {return (document.body.style.display !== "none" && elm.style.display !== "none" && elm.style.visibility !== "hidden")}
	exports.isVisibleHTML = isVisibleHTML;
	//SYNTAX HIGHLIGHTER
	function syntaxHighlighter(elmnt, mode) {
		var lang = (mode || "html");
        var elmntObj = (getById(elmnt) || elmnt);
        var elmntTxt = elmntObj.innerHTML;
        var tagcolor = "mediumblue";
        var tagnamecolor = "brown";
        var attributecolor = "red";
        var attributevaluecolor = "mediumblue";
        var commentcolor = "green";
        var cssselectorcolor = "brown";
        var csspropertycolor = "red";
        var csspropertyvaluecolor = "mediumblue";
        var cssdelimitercolor = "black";
        var cssimportantcolor = "red";  
        var jscolor = "black";
        var jskeywordcolor = "mediumblue";
        var jsstringcolor = "brown";
        var jsnumbercolor = "red";
        var jspropertycolor = "black";
        if (!lang) {lang = "html"; }
        if (lang == "html") {elmntTxt = htmlMode(elmntTxt);}
        if (lang == "css") {elmntTxt = cssMode(elmntTxt);}
        if (lang == "js") {elmntTxt = jsMode(elmntTxt);}
        elmntObj.innerHTML = elmntTxt;
        function extract(str, start, end, func, repl) {
        	var s, e, d = "", a = [];
            while (str.search(start) > -1) {
                s = str.search(start);
                e = str.indexOf(end, s);
                if (e == -1) {e = str.length;}
                if (repl) {
                    a.push(func(str.substring(s, e + (end.length))));      
                    str = str.substring(0, s) + repl + str.substr(e + (end.length));
                } else {
                    d += str.substring(0, s);
                    d += func(str.substring(s, e + (end.length)));
                    str = str.substr(e + (end.length));
                }
            }
            this.rest = d + str;
            this.arr = a;
        }
        function htmlMode(txt) {var rest = txt, done = "", php, comment, angular, startpos, endpos, note, i;
            comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "HTMLCOMMENTPOS");
            rest = comment.rest;
            while (rest.indexOf("&lt;") > -1) {
                note = "";
                startpos = rest.indexOf("&lt;");
                if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {note = "css";}
                if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {note = "javascript";}        
                endpos = rest.indexOf("&gt;", startpos);
                if (endpos == -1) {endpos = rest.length;}
                done += rest.substring(0, startpos);
                done += tagMode(rest.substring(startpos, endpos + 4));
                rest = rest.substr(endpos + 4);
                if (note == "css") {
                    endpos = rest.indexOf("&lt;/style&gt;");
                    if (endpos > -1) {
                        done += cssMode(rest.substring(0, endpos));
                        rest = rest.substr(endpos);
                    }
                }
                if (note == "javascript") {
                    endpos = rest.indexOf("&lt;/script&gt;");
                    if (endpos > -1) {
                        done += jsMode(rest.substring(0, endpos));
                        rest = rest.substr(endpos);
                    }
                }
            }
            rest = done + rest;
            for (i = 0; i < comment.arr.length; i++) {
                rest = rest.replace("HTMLCOMMENTPOS", comment.arr[i]);
            }
            return rest;
        }
        function tagMode(txt) {var rest = txt, done = "", startpos, endpos, result;
            while (rest.search(/(\s|<br>)/) > -1) {    
                startpos = rest.search(/(\s|<br>)/);
                endpos = rest.indexOf("&gt;");
                if (endpos == -1) {endpos = rest.length;}
                done += rest.substring(0, startpos);
                done += attributeMode(rest.substring(startpos, endpos));
                rest = rest.substr(endpos);
            }
            result = done + rest;
            result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);
            if (result.substr(result.length - 4, 4) == "&gt;") {
                result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
            }
            return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
        }
        function attributeMode(txt) {
            var rest = txt, done = "", startpos, endpos, singlefnuttpos, doublefnuttpos, spacepos;
            while (rest.indexOf("=") > -1) {
                endpos = -1;
                startpos = rest.indexOf("=");
                singlefnuttpos = rest.indexOf("'", startpos);
                doublefnuttpos = rest.indexOf('"', startpos);
                spacepos = rest.indexOf(" ", startpos + 2);
                if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
                    endpos = rest.indexOf(" ", startpos);      
                } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
                } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
                    endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
                }
                if (!endpos || endpos == -1 || endpos < startpos) {endpos = rest.length;}
                done += rest.substring(0, startpos);
                done += attributeValueMode(rest.substring(startpos, endpos + 1));
                rest = rest.substr(endpos + 1);
            }
            return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
        }
        function attributeValueMode(txt) {
            return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
        }
        function commentMode(txt) {
            return "<span style=color:" + commentcolor + ">" + txt + "</span>";
        }
        function cssMode(txt) {
            var rest = txt, done = "", s, e, comment, i, midz, c, cc;
            comment = new extract(rest, /\/\*/, "*/", commentMode, "CSSCOMMENTPOS");
            rest = comment.rest;
            while (rest.search("{") > -1) {
                s = rest.search("{");
                midz = rest.substr(s + 1);
                cc = 1;
                c = 0;
                for (i = 0; i < midz.length; i++) {
                    if (midz.substr(i, 1) == "{") {cc++; c++}
                    if (midz.substr(i, 1) == "}") {cc--;}
                    if (cc == 0) {break;}
                }
                if (cc != 0) {c = 0;}
                e = s;
                for (i = 0; i <= c; i++) {
                    e = rest.indexOf("}", e + 1);
                }
                if (e == -1) {e = rest.length;}
                done += rest.substring(0, s + 1);
                done += cssPropertyMode(rest.substring(s + 1, e));
                rest = rest.substr(e);
            }
            rest = done + rest;
            rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
            rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");
            for (i = 0; i < comment.arr.length; i++) {
                rest = rest.replace("CSSCOMMENTPOS", comment.arr[i]);
            }
            return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
        }
        function cssPropertyMode(txt) {
            var rest = txt, done = "", s, e, n, loop;
            if (rest.indexOf("{") > -1 ) { return cssMode(rest); }
            while (rest.search(":") > -1) {
                s = rest.search(":");
                loop = true;
                n = s;
                while (loop == true) {
                    loop = false;
                    e = rest.indexOf(";", n);
                    if (rest.substring(e - 5, e + 1) == "&nbsp;") {
                        loop = true;
                        n = e + 1;
                    }
                }
                if (e == -1) {e = rest.length;}
                done += rest.substring(0, s);
                done += cssPropertyValueMode(rest.substring(s, e + 1));
                rest = rest.substr(e + 1);
            }
            return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
        }
        function cssPropertyValueMode(txt) {
            var rest = txt, done = "", s;
            rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);
            while (rest.search(/!important/i) > -1) {
                s = rest.search(/!important/i);
                done += rest.substring(0, s);
                done += cssImportantMode(rest.substring(s, s + 10));
                rest = rest.substr(s + 10);
            }
            result = done + rest;    
            if(result.substr(result.length-1,1)==";"&&result.substr(result.length-6,6)!="&nbsp;"&&result.substr(result.length-4,4)!="&lt;"&&result.substr(result.length-4,4)!="&gt;"&&result.substr(result.length-5,5)!="&amp;") {
                result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
            }
            return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
        }
        function cssImportantMode(txt) {
            return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
        }
        function jsMode(txt) {
            var rest = txt, done = "", esc = [], i, cc, tt = "", sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, numpos, mypos, dotpos, y;
            for (i = 0; i < rest.length; i++)  {
                cc = rest.substr(i, 1);
                if (cc == "\\") {
                    esc.push(rest.substr(i, 2));
                    cc = "JSESCAPE";
                    i++;
                }
                tt += cc;
            }
            rest = tt;
            y = 1;
            while (y == 1) {
                sfnuttpos = getPos(rest, "'", "'", jsStringMode);
                dfnuttpos = getPos(rest, '"', '"', jsStringMode);
                compos = getPos(rest, /\/\*/, "*/", commentMode);
                comlinepos = getPos(rest, /\/\//, "<br>", commentMode);      
                numpos = getNumPos(rest, jsNumberMode);
                keywordpos = getKeywordPos("js", rest, jsKeywordMode);
                dotpos = getDotPos(rest, jsPropertyMode);
                if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], dotpos[0]) == -1) {break;}
                    mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, compos, comlinepos, keywordpos, dotpos);
                    if (mypos[0] == -1) {break;}
                    if (mypos[0] > -1) {
                        done += rest.substring(0, mypos[0]);
                        done += mypos[2](rest.substring(mypos[0], mypos[1]));
                        rest = rest.substr(mypos[1]);
                    }
                }
                rest = done + rest;
                for (i = 0; i < esc.length; i++) {
                    rest = rest.replace("JSESCAPE", esc[i]);
            }
            return "<span style=color:" + jscolor + ">" + rest + "</span>";
        }
        function jsStringMode(txt) {
            return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
        }
        function jsKeywordMode(txt) {
            return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
        }
        function jsNumberMode(txt) {
            return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
        }
        function jsPropertyMode(txt) {
            return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
        }
        function getDotPos(txt, func) {
            var x, i, j, s, e, arr = [".","<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%"];
            s = txt.indexOf(".");
            if (s > -1) {
                x = txt.substr(s + 1);
                for (j = 0; j < x.length; j++) {
                    cc = x[j];
                    for (i = 0; i < arr.length; i++) {
                        if (cc.indexOf(arr[i]) > -1) {
                            e = j;
                            return [s + 1, e + s + 1, func];
                        }
                    }
                }
            }
            return [-1, -1, func];
        }
        function getMinPos() {
            var i, arr = [];
            for (i = 0; i < arguments.length; i++) {
                if (arguments[i][0] > -1) {
                    if (arr.length == 0 || arguments[i][0] < arr[0]) {arr = arguments[i];}
                }
            }
            if (arr.length == 0) {arr = arguments[i];}
            return arr;
        }
        function getKeywordPos(typ, txt, func) {var words, i, pos, rpos = -1, rpos2 = -1, patt;
            if (typ == "js") {
                words = ["abstract","arguments","boolean","break","byte","case","catch","char","class","const","continue","debugger","default","delete",
                    "do","double","else","enum","eval","export","extends","false","final","finally","float","for","function","goto","if","implements","import",
                    "in","instanceof","int","interface","let","long","NaN","native","new","null","package","private","protected","public","return","short","static",
                    "super","switch","synchronized","this","throw","throws","transient","true","try","typeof","undefined","var","void","volatile","while","with","yield"];
            }
            for (i = 0; i < words.length; i++) {
                pos = txt.indexOf(words[i]);
                if (pos > -1) {
                    patt = /\W/g;
                    if (txt.substr(pos + words[i].length,1).match(patt) && txt.substr(pos - 1,1).match(patt)) {
                        if (pos > -1 && (rpos == -1 || pos < rpos)) {
                            rpos = pos;
                            rpos2 = rpos + words[i].length;
                        }
                    }
                } 
            }
            return [rpos, rpos2, func];
        }
        function getPos(txt, start, end, func) {
            var s, e;
            s = txt.search(start);
            e = txt.indexOf(end, s + (end.length));
            if (e == -1) {e = txt.length;}
            return [s, e + (end.length), func];
        }
        function getNumPos(txt, func) {
            var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/" ,"-", "*", "|", "%", "="], i, j, c, startpos = 0, endpos, word;
            for (i = 0; i < txt.length; i++) {
                for (j = 0; j < arr.length; j++) {
                    c = txt.substr(i, arr[j].length);
                    if (c == arr[j]) {
                        if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
                            continue;
                        }
                        endpos = i;
                        if (startpos < endpos) {
                            word = txt.substring(startpos, endpos);
                            if (!isNaN(word)) {return [startpos, endpos, func];}
                        }
                        i += arr[j].length;
                        startpos = i;
                        i -= 1;
                        break;
                    }
                }
            }  
            return [-1, -1, func];
        }
	}
	exports.syntaxHighlighter = syntaxHighlighter;
	//FUNCTION EXPORTS (from first funcs)
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




	/* actuals (totally my own ideas) */
	//FUNCTIONS
	exports.AND = function(a, b) {return a & b};
	exports.abs = function(n) {return Math.abs(n)};
	exports.addClass = function (sel, name) {exports.addClassElements(getElements(sel), name)};
	exports.addClassElement = function (element, name) {var i, arr1, arr2;arr1 = element.className.split(" ");arr2 = name.split(" ");
        for (i = 0; i < arr2.length; i++) {if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}}
    };
    exports.addClassElements = function (elements, name) {var i, l = elements.length;for (i = 0; i < l; i++) {exports.addClassElement(elements[i], name)}};
    exports.args = function(arg) {return arg.arguments};
    exports.arithmetic = {
        bidivide: function(dividend, divisor){return Number((dividend / divisor) / divisor)},
        dec: function(n, dec){if(dec==null){n--}else{n-=dec}},
        difference: function(a, b){return a-b},
        inc: function(n, inc){if(inc==null){n++}else{n+=inc}},
        multiplication: function(val){var x=val.length,count=1;for(var i = 0; i < x; i++){count *= val[i];}return count},
 	    summation: function(val){var x=val.length,count=0;for(var i = 0; i < x; i++){count += val[i];}return count}
    };
    exports.ceil = function(n) {return Math.ceil(n)};
    exports.choose = function(arr) {return arr[Math.floor(Math.random()*arr.length)]};
	exports.clearConsole = function() {console.clear()};
	exports.click = function(btn) {btn.click()};
	exports.close = function() {document.close()};
	exports.clz32 = function(x) {return Math.clz32(x)};
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
    exports.createButton = function(html) {
    	var btn = document.createElement("BUTTON");
    	btn.innerHTML = html;
    	return btn;
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
	exports.docBody = document.body;
	exports.docBodyStyle = document.body.style;
	exports.E = function(x){return Math.exp(x)};
	exports.EPSILON = Number.EPSILON;
	exports.ErrorStackTraceLimit = Error.stackTraceLimit;
	exports.eMath = Math.E;
	exports.exp = function(n) {return Math.exp(n)};
	exports.expm1 = function(n) {return Math.expm1(n)};
	exports.e1 = 2.71;
	exports.e2 = 2.71828;
	exports.factorial = function(n) {
		if (n==0) {return 1}
		if (n<0) {console.error("sci.factorial: unexpected Math error");return undefined}
		var count = 1;
		for (i=0; i<n+1; i++) {count *= i}
		return count;
	};
	exports.floor = function(n) {return Math.floor(n)};
	exports.fround = function(n) {return Math.fround(n)};
	exports.generateRandomArray = function(len, replacee, items) {
		var arr = replacee || [];
		var tems = items || exports.randomSciIDVars;
		for (var i=0; i<len; i++) {
			arr[i] = exports.choose(tems);
		}
		if (replacee !== undefined) {replacee = arr;return replacee} else {return arr}
	};
	exports.generateRandomHex = function(rands, isScalar) {
		var hex = "#", clr = rands || exports.randomHexVars;
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
	exports.generateRandomNumber = function(len, replacee, rands) {
		var num = "", arr = rands || [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (var i=0; i<len; i++) {
			num += exports.choose(arr);
		}
		var n = Number(num);
		if (replacee !== undefined) {replacee = n;return replacee} else {return n}
	};
	exports.generateRandomSciID = function(len, randlen, replacee) { //using randomSciIDVars
		var str = "";
		var rlen = randlen || 1;
		for (var i=0; i<len; i++) {
			rlen = exports.choose(exports.randomSciIDVars);
			str += exports.summation(rlen, true);
		}
		if (replacee !== undefined) {replacee = str;return replacee} else {return str}
	};
	exports.generateRandomSciIDArray = function(len, replacee) {exports.generateRandomArray(len, replacee)};
	exports.generateRandomString = function(len, replacee, rands) { //rands is last because it might be very long
		str = "";
		if(Array.isArray(rands)==false){console.warn("sci.generateRandomString: rands is undefined, using sci.randomSciIDVars");rands=exports.randomSciIDVars}
		for (var i=0; i<len; i++) {
			str = exports.choose(rands);
		}
		if (replacee !== undefined) {replacee = str;return replacee} else {return str}
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
	    	//however, with the formula 2*pi*r, and a /2,
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
	exports.getArguments = function(obj) {if (obj.arguments !== undefined) {return obj.arguments} else {console.error("sci.getArguments: arguments of obj are either unavailable or undefined.")}};
	exports.getArrayEnd = function(arr) {return arr[arr.length]};
	exports.getByTagNS = function(nsuri, tag) {return document.getElementsByTagNameNS(nsuri, tag)};
	Object.assign(exports.getByTagNS, {
		normal: function(tag) {return getByTag(tag)},
		warning: function() {console.warn("sci.getByTagNS: Please note that this may not work in earlier versions, beta versions or other software or apps.")}
	});
	exports.getLength = function(obj) {return obj.length};
	exports.getName = function(obj) {return obj.name};
	exports.getPrototype = function(obj) {if (obj.prototype !== undefined) {return obj.prototype} else {console.error("sci.getPrototype: obj.prototype is undefined.")}};
	exports.getSingleElement = function(id, n) {
		var i = n || 0;
		var elm = document.getElementById(id) || document.getElementsByName(id)[i] || document.getElementsByClassName(id)[i] || document.getElementsByTagName(id)[i] || id[i];
		return elm;
	};
	Object.assign(exports.getSingleElement, {
		normal: function(id) {return getElements(id)},
		warning: function() {console.warn("sci.getSingleElement: Please note that the id must not be specific (i.e. only id, not document.getElementById(id)).")}
	});
	exports.half = 1/2 || 0.5;
	exports.hasConsole = function() {return typeof console !== "undefined"};
	exports.hasDocumentBody = function() {return document.body !== undefined};
	exports.hasWebWorker = function() {return typeof Worker !== undefined};
	exports.Infinity = Infinity;
	exports.IsBinaricBoolean = function(arg) {return (arg==0 || arg==1)};
	exports.IsBoolean = function(arg) {return typeof arg === "boolean"};
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
	exports.imul = function(x, y) {return Math.imul(x, y)};
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
	exports.LN10 = Math.LN10;
	exports.LN2 = Math.LN2;
	exports.LOG1p = function(n) {return Math.log1p(n)};
	exports.LOG10 = function(n) {return Math.log10(n)};
	exports.LOG10E = Math.LOG10E;
	exports.LOG2 = function(n){return Math.log2(n)};
	exports.LOG2E = Math.LOG2E;
	exports.log = function(n, b){return Math.log(n, b)};
	exports.logAllVariables = function() {for(var b in window){if(window.hasOwnProperty(b)){console.log(b)}}};
	exports.MAX_SAFE_INT = Number.MAX_SAFE_INTEGER;
	exports.MAX_VAL = Number.MAX_VALUE;
	exports.MIN_SAFE_INT = Number.MIN_SAFE_INTEGER;
	exports.MIN_VAL = Number.MIN_VALUE;
	exports.makeFalse = function(replacee) {replacee=false;return replacee};
	//stringified
	exports.makeRandomBit = function() {return exports.choose([0, 1])};
	exports.makeRandomByte = function() {
		return exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]);
	};
	//very long :/
	exports.makeRandomKiloByte = function() {
		var str = "";
		for (var i=0; i<1024; i++) {
			str += exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) +
			       exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]) + exports.choose(["0", "1"]);
		}
		return str;
	};
	exports.makeRandomNibble = function() {
		return exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]) +
		       exports.choose(["0", "1"]);
	};
	exports.makeRandom32Bit = function() {
		var str = "";
		for (var i=0; i<32; i++) {
			str += exports.choose(["0", "1"]);
		}
		return str;
	};
	exports.makeTrue = function(replacee) {replacee=true;return replacee};
	exports.NEGATIVE_INFINITY = -Infinity;
	exports.NaN = window.NaN || Number.NaN;
	exports.negate = function(n) {if (IsPositive(n)) {n=-n;return n} else {console.warn("sci.negate: number is already negative: " + n);return n}};
	exports.negateBeta = function(n) {n=-n};
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
	    evenNumber: function(nth) {return 2*nth},
	    fibonacciSeriesNumber: function(nth) {return Math.round((1.618**nth)/Math.sqrt(5))},
	    oddNumber: function(nth) {return nth+(nth-1)}
    };
    exports.objAssign = function(target, src) {Object.assign(target, src);return target};
    exports.objFreeze = function(obj, x) {obj.freeze(x);return obj};
    exports.objIs = function(obj, v1, v2) {return obj.is(v1, v2)};
	exports.ownCons = function() {return exports};
	exports.ownConstructorSci = function(obj) {obj.prototype.constructorSci = obj};
	exports.ownRegExp = /sci/i;
	exports.POSITIVE_INFINITY = exports.Infinity || Infinity;
	exports.parseFloat = function(str) {return Number.parseFloat(str)};
	exports.parseInt = function(str, radix) {return Number.parseInt(str, radix)};
	exports.piFrac = 22/7;
	exports.piLongerString = "3.1415926535897932384626433832795028841971693993751058209749"+
	    "445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019"+
	    "385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602"+
        "491412737245870066063155881748815209209628292540917153643678925"+
        "903600113305305488204665213841469519415116094330572703657595919530"+
        "9218611738193261179310511854807446237996274956735188575272489122793"+
        "818301194912983367336244065664308602139494639522473719070217986"+
        "094370277053921717629317675238467481846766940513200056812714526356082778577134275778960917363717872"+
        "1468440901224953430146549585371050792279689258923542019956112129021960864034418159813629774771";
	exports.piMath = Math.PI;
	exports.piOverE = Math.PI / Math.E;
	exports.pi1 = 3.14;
	exports.pi2 = 3.1416;
	exports.pi3 = 3.141592653;
	exports.posate = function(n) {if (IsPositive(n)) {console.warn("sci.posate: number is already positive: " + n);return n} else {n=Math.abs(n);return n}};
	Object.assign(exports.posate, {
		warning: function() {console.warn("sci.posate: Please note that the function used is n=Math.abs(n), not n=-n.")}
	});
	exports.pow = function(x, y) {return Math.pow(x, y)};
	exports.power10 = function(exp) {return 10**exp};
	exports.power2 = function(exp) {return 2**exp};
	exports.random = function(n){if(n==null){return Math.random()}else{return Math.floor(Math.random()*n)}};
	exports.randomHexLetVars = ["A", "B", "C", "D", "E", "F"];
	exports.randomHexNumVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	exports.randomHexVars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
	exports.randomSciIDVars = [
	    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
	    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p",
	    "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
	    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P",
	    "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
	    "-", "_", "$", "&", "#", "@", "?"
	];
	exports.regPolGeometry = {
	    area: function(perimeter, apothem){if(apothem==null){console.error("apothem is not defined")}else{return (perimeter*apothem)/2}},
	    circumference: function(radius){return 2*r*Math.PI},
        perimeter: function(sidenumbers, sidelength){return sidenumbers*sidelength}
    };
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
    exports.repeatItemArray = function(len, items, replacee) {
		var arr = replacee || [];
		if (items === undefined) {console.warn("sci.repeatItemArray: items is/are not defined, using empty array");items=[]}
		for (var i=0; i<len; i++) {
			if (items.length==1) {arr[i]=items} else {arr[i] = items[i]}
		}
	    return arr;
	};
	exports.replaceArrayItem = function(arr, n, obj) {for (var i=0; i<arr.length; i++) {if (i==n) {arr[i]=obj}}};
	exports.reverseBinary = function(a) {return ~ a};
	exports.root = {
		cube: function(n){return Math.cbrt(n)},
		hex: function(n){return Math.sqrt(Math.cbrt(n))},
		nth: function(n, denom, numer){if(numer==null){return n**(1/denom)}else{return n**(numer/denom)}},
		quad: function(n){return Math.sqrt(Math.sqrt(n))},
		square: function(n){return Math.sqrt(n)}
	};
	exports.rot3d = function(elm, x, y, z, angle) {elm.style.transform = "rotate3d("+x+","+y+","+z+","+angle+")"};
	exports.round = function(n){return Math.round(n)};
	exports.SQRT1_2 = Math.SQRT1_2;
	exports.SQRT2 = Math.SQRT2;
	exports.sign = function(n) {
		if (n<0) {return -1}
		else if (n==0 || n==false)  {return 0}
		else if (n>0 || n==true) {return 1}
		else if (n===undefined) {return undefined}
		else {return NaN}
	};
    exports.signMath = function(x){if(x==NaN){return NaN}else{return Math.sign(x)}};
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
    exports.solveForX = {
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
    exports.summation = function(values, isString) {
    	var count=0; if (isString) {count=""}
    	for (var i=0; i<values.length; i++) {
    		count += values[i];
    	}
    	return count;
    };
	exports.switchSign = function(n) {n=-n;return n};
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
	exports.toggleArrayItem = function(arr, n, val) {
		var olditem = arr[n], newitem = val;
		if (arr[n]==olditem) {arr[n]=newitem}
		else {arr[n]=olditem}
		return arr;
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
    exports.trunc = function(x) {return Math.trunc(x)};
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
	exports.undefined = undefined;
	exports.valOf = function(obj) {var o=obj || exports; return o};
	exports.whatConstructor = function(arg) {return arg.constructor};


    //SETUP STUFF
	exports.constructor = exports;
	exports.constructor.IS_EXPORTS_DEPENDENT = true;
	exports.constructor.IS_SCI = true;
	if (typeof console !== "undefined") {console.log("SciPred\'s JS Beta")} //info
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
	}
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
	exports.ERR_TYPE_ARGUMENTS_UNAVAILABLE = "Uncaught TypeError: \'caller\', \'callee\', and \'arguments\' properties may not be accessed on strict mode functions or the arguments objects for calls to them";
	exports.ERR_TYPE_ILLEGAL_INVOCATION = "Uncaught TypeError: Illegal invocation";
	exports.ERR_TYPE_NOTFUNCTION = "Uncaught TypeError: x is not a function";
	exports.ERR_TYPE_NUM_UNCREATABLE_PROP = "Uncaught TypeError: Cannot create property x on number y";
	exports.STRICTERR_SYNTAX_UNEXPECTED_EVALORARGS = "Uncaught SyntaxError: Unexpected eval or arguments in strict mode";
	exports.STRICTERR_SYNTAX_UNQUALIFIED_IDENTIFIER = "Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.";
	
}));

//otherMath
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
};