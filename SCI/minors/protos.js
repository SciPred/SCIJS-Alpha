//Proto Functions

Object.assign(window.HTMLElement.prototype, {
	clone: function() {
		return document.createElement(this.tagName);
	},
	copyStyle: function(elm) {
		this.style = elm.style;
		return this.style;
	},
	isVisible: function() { //includes opacity
		return this.style.display !== "none" && this.style.visibility !== "hidden" && this.style.opacity !== 0;
	}
});


Object.assign(window.HTMLButtonElement.prototype, {
	clicks: function(times) {
		times = times || 2; //already .click() if 1
		for (var i=0; i<times; i++) {
			this.click();
		}
	}
});