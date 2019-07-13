//Element Functions

SCI.addAttributes = function(elements, attributes) {//elements is an array
	elements = elements || [window.HTMLElement.prototype]; //all!
	for (var i=0; i<elements.length; i++) {
		Object.assign(elements[i], attributes);
	}
	return elements;
};
SCI.addStyle = function (sel, prop, val) {
	SCI.styleElements(SCI.getElements(sel), prop, val);
};
SCI.getElements = function (id) {
	if (typeof id == "object") {
		return [id];
	} else {
		return document.querySelectorAll(id);
	}
};
SCI.hide = function (sel) {
	SCI.hideElements(SCI.getElements(sel));
};
SCI.hideElement = function (element) {
	SCI.styleElement(element, "display", "none");
};
SCI.hideElements = function (elements) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {
		SCI.hideElement(elements[i]);
	}
};
SCI.importScript = function(url) {
	url = url || "SCIJS-Alpha/sciMainBeta.js";
	var script = document.createElement("script");
	script.src = url;
	document.head.appendChild(script);
	return script;
};
SCI.importStyle = function(href) {
	var link = document.createElement("link");
	link.href = href;
	link.rel  = 'stylesheet';
	link.type = 'text/css';
	link.media = 'all';
	document.head.appendChild(link);
	return link;
};
SCI.show = function (sel, a) {
	var elements = SCI.getElements(sel);
	if (a) {SCI.hideElements(elements);}
	SCI.showElements(elements);
};
SCI.showElement = function (element) {
	SCI.styleElement(element, "display", "block");
};
SCI.showElements = function (elements) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {
		SCI.showElement(elements[i]);
	}
};
SCI.styleElements = function (elements, prop, val) {
	var i, l = elements.length;
	for (i = 0; i < l; i++) {    
		SCI.styleElement(elements[i], prop, val);
	}
};
SCI.styleElement = function (element, prop, val) {
	element.style.setProperty(prop, val);
};
SCI.toggleShow = function (sel) {
	var i, x = SCI.getElements(sel), l = x.length;
	for (i = 0; i < l; i++) {    
		if (x[i].style.display == "none") {
			SCI.styleElement(x[i], "display", "block");
		} else {
			SCI.styleElement(x[i], "display", "none");
		}
	}
};