/* SciJS 2: NAV
 * By SciPred, made 2019
 * Free to Use. */

var scinav = navigator, sciLoc = window.location, sciMem = console.memory, sciHis = window.history;
//BETA VERSION
var sciNavBeta = {
    appcodename: scinav.appCodeName,
    appname: scinav.appName,
    appversion: scinav.appVersion,
    baseuri: document.baseURI,
    color: {
    	alink: document.alinkcolor,
    	bg: document.bgColor,
    	fg: document.fgColor,
    	link: document.linkcolor,
    	vlink: document.vlinkcolor
    },
    compatMode: document.compatMode,
    connection: {
    	downlink: scinav.connection.downlink,
    	efftype: scinav.connection.effectiveType,
    	rtt: scinav.connection.rtt,
    	datasave: scinav.connection.saveData
    },
    cookiesOn: scinav.cookieEnabled,
    designMode: document.designMode,
    devicemem: scinav.deviceMemory,
    devmove: document.ondevicemotion,
    devorient: document.ondeviceorientation,
    doc: document,
    docchildren: document.children,
    docdiscarded: document.wasDiscarded,
    dochaschildnodes: document.hasChildNodes(),
    dochasfocus: document.hasFocus(),
    dochasownprop: document.hasOwnProperty(),
    dochidden: document.hidden,
    doclinks: document.links,
    docpointerlockElm: document.pointerLockElement,
    docposdisconnected: document.DOCUMENT_POSITION_DISCONNECTED,
    doctype: document.doctype,
    dontTrack: scinav.doNotTrack,
    fullscr: {
    	elm: document.fullscreenElement,
    	enabled: document.fullscreenEnabled,
    	onfullscrchange: document.onfullscreenchange,
    	onfullscrerror: document.onfullscrerror,
    	wkcancelfs: function(){document.webkitCancelFullScreen()},
    	wkIsfulscr: document.webkitIsFullScreen
    },
    hardwarecc: scinav.hardwareConcurrency,
    hash: sciLoc.hash,
    host: sciLoc.host,
    hostname: sciLoc.hostname,
    href: sciLoc.href,
    information: {
    	codeEditAllowedByCreator: false,
    	codeLang: "HTML",
    	codeLangs: ["HTML", "CSS", "JS"],
    	creationDate: 2019,
    	creator: "SciPred",
    	dependentVars: [scinav, sciLoc, sciMem],
    	HTMLBasis: "HTML5",
    	lastUpdatedYear: 2019,
    	mainvar: sciNavBeta,
    },
    is: {
    	connected: document.isConnected,
    	secureContext: window.isSecureContext
    },
    javaOn: scinav.javaEnabled(),
    lang: scinav.language,
    langs: scinav.languages,
    locbarV: window.locationbar.visible,
    maxtouchpoints: scinav.maxTouchPoints,
    medDevs: {
    	ondevicechange: scinav.mediaDevices.ondevicechange
    },
    mem: {
        JSHSLimit: sciMem.jsHeapSizeLimit,
        totalJSHS: sciMem.totalJSHeapSize,
        usedJSHS: sciMem.usedJSHeapSize
    },
    online: scinav.onLine,
    orig: sciLoc.origin,
    originationCode: [navigator, scinav],
    path: sciLoc.pathname,
    plugins: {
    	length: scinav.plugins.length
    },
    port: sciLoc.port,
    pres: {
    	defReq: scinav.presentation.defaultRequest,
    	reciever: scinav.presentation.receiver
    },
    prod: scinav.product,
    prodSub: scinav.productSub,
    prtcl: sciLoc.protocol,
    screen: {
    	avH: screen.availHeight,
    	avL: screen.availLeft,
    	avT: screen.availTop,
    	avW: screen.availWidth,
    	coldepth: screen.colorDepth,
    	full: document.fullscreen,
    	h: screen.height,
    	lft: screenLeft,
    	orientation: {
            angle: screen.orientation.angle,
            onchange: screen.orientation.onchange,
            type: screen.orientation.type
    	},
    	pxdepth: screen.pixelDepth,
    	top: screenTop,
    	w: screen.width,
    	x: screenX,
    	y: screenY
    },
    scroll: {
    	barsVisible: scrollbars.visible,
    	onscroll: document.onscroll,
    	scrollingElm: document.scrollingElement,
    	x: scrollX,
    	y: scrollY
    },
    search: sciLoc.search,
    servWorker: {
    	controller: scinav.serviceWorker.controller,
    	oncontrollerchange: scinav.serviceWorker.oncontrollerchange,
    	onmsg: scinav.serviceWorker.onmessage
    },
    statusbarV: statusbar.visible,
    title: document.title,
    url: document.URL,
    usb: {
    	onconnect: scinav.usb.onconnect,
    	ondisconnect: scinav.usb.ondisconnect
    },
    userActivation: {
    	hasBeenActive: scinav.userActivation.hasBeenActive,
    	isActive: scinav.userActivation.isActive
    },
    useragent: scinav.userAgent,
    visstate: document.webkitVisibilityState,
    vnd: scinav.vendor,
    vndSub: scinav.vendorSub,
    webkit: {
    	fullscreenElement: document.webkitFullscreenElement,
    	fullscreenElementCurrent: document.webkitCurrentFullscreenElement,
    	fullscreenEnabled: document.webkitFullscreenEnabled,
    	hidden: document.webkitHidden,
    	visibilityState: document.webkitVisibilityState
    },
    Win: {
    	PERSISTENT: Window.PERSISTENT,
    	TEMP: Window.TEMPORARY
    },
    win: {
    	defStat: window.defaultStatus,
    	defstat: window.defaultstatus,
    	devPixRatio: window.devicePixelRatio,
    	evt: window.event,
    	fillcol: window.fillcolor,
    	frameElm: window.frameElement,
    	inH: window.innerHeight,
    	inW: window.innerWidth,
    	len: window.length,
    	offBuff: window.offscreenBuffering,
    	opener: window.opener,
    	orig: window.origin,
    	outH: window.outerHeight,
    	outW: window.outerWidth,
    	pageXoff: window.pageXOffset,
    	pageYoff: window.pageYOffset,
    	strokecol: window.strokecolor
    },
    winclosed: window.closed,
    winhis: {
    	length: sciHis.length,
    	scrollRes: sciHis.scrollRestoration,
    	state: sciHis.state
    },
    winname: window.name,
};
scinav.getBattery().then(function(battery){
    updateABI();
    function updateABI() {
    	setTimeout(updateABI, 1);
    	sciNavBeta.batt = {
    		charging: battery.charging,
    		chargeTime: battery.chargingTime,
    		dchargeTime: battery.dischargingTime,
    		level: battery.level,
    		oncharchange: battery.onchargingchange,
    		onchartimechange: battery.onchargingtimechange,
    		ondchartimechange: battery.ondischargingtimechange,
    		onlvlchange: battery.onlevelchange,
    		percent: (battery.level + 0.01) * 100 + "%",
    		realLvl: battery.level + 0.01
    	};
    }
});
if (navigator.geolocation) {
	setInterval(navigator.geolocation.getCurrentPosition(sciNavBeta.showPos), 1);
} else {
	console.error("Sorry, but geolocation is either not supported or disabled.");
}
sciNavBeta.showPos = function(position) {
	sciNavBeta.geoloc = {
		acc: position.coords.accuracy,
		alt: position.coords.altitude,
		altacc: position.coords.altitudeAccuracy,
		heading: position.coords.heading,
		lat: position.coords.latitude,
		long: position.coords.longitude,
		spd: position.coords.speed,
		time: position.timestamp
	};
};


//ALPHA VERSION: now more organized and duplicates are prevented, however some variables are dependent on beta version
//in order to prevent duplicative functions. Some other variables are either shortened or renamed or replaced for the
//comfort of typing much more efficiently. There are also some extra more variables.
var sciNavAlpha = {
	batt: {
		charging: sciNavBeta.batt.charging,
		chargeTime: sciNavBeta.batt.chargingTime,
		dchargeTime: sciNavBeta.batt.dischargingTime,
		lvl: sciNavBeta.batt.level,
		oncharchange: sciNavBeta.batt.oncharchange,
		onchartimechange: sciNavBeta.batt.onchartimechange,
		ondchartimechange: sciNavBeta.batt.ondchartimechange,
		onlvlchange: sciNavBeta.batt.onlvlchange,
		percent: sciNavBeta.batt.percent,
		realLvl: sciNavBeta.batt.realLvl
	},
	cons: {},
	consMem: {
		JSHSLimit: sciMem.jsHeapSizeLimit,
        totalJSHS: sciMem.totalJSHeapSize,
        usedJSHS: sciMem.usedJSHeapSize
	},
	doc: {
		doc: document,
		fullscr: {
    	    elm: document.fullscreenElement,
    	    enabled: document.fullscreenEnabled,
    	    onfullscrchange: document.onfullscreenchange,
        	onfullscrerror: document.onfullscrerror,
        	wkcancelfs: function(){document.webkitCancelFullScreen()},
    	    wkIsfulscr: document.webkitIsFullScreen
    	    //document.fullscreen can be found in sciNavAlpha.screen.full
        },
        on: {
        	//possible duplicates are somewhere else for convenience
        	scroll: document.onscroll
        },
        scrollElm: document.scrollingElement,
        title: document.title,
		visstate: document.webkitVisibilityState
	},
	geoloc: {
		acc: sciNavBeta.geoloc.acc,
		alt: sciNavBeta.geoloc.alt,
		altacc: sciNavBeta.geoloc.altacc,
		heading: sciNavBeta.geoloc.heading,
		lat: sciNavBeta.geoloc.latitude,
		long: sciNavBeta.geoloc.longtitude,
		spd: sciNavBeta.geoloc.speed,
		time: sciNavBeta.geoloc.time
	},
	getAllVars: function(){for(var b in window){if(window.hasOwnProperty(b)) return b;}}
	information: {
    	codeEditAllowedByCreator: false,
    	codeLang: "HTML",
    	codeLangs: ["HTML", "CSS", "JS"],
    	creationDate: 2019,
    	creator: "SciPred",
    	dependentVars: [scinav, sciLoc, sciMem, sciHis, sciNavBeta],
    	HTMLBasis: "HTML5",
    	lastUpdatedYear: 2019,
    	mainvar: sciNavAlpha,
    	version: "1.001",
    	versTag: "v"
    },
	nav: {
		appCodeName: scinav.appCodeName,
		appName: scinav.appName,
		pres: {
    	    defReq: scinav.presentation.defaultRequest,
    	    reciever: scinav.presentation.receiver
        },
        servWorker: {
            controller: scinav.serviceWorker.controller,
            oncontrollerchange: scinav.serviceWorker.oncontrollerchange,
            onmsg: scinav.serviceWorker.onmessage
        },
		userAgent: scinav.userAgent,
		vnd: scinav.vendor,
		vndSub: scinav.vendorSub
	},
	navUsb: {
    	onconnect: scinav.usb.onconnect,
    	ondisconnect: scinav.usb.ondisconnect
    },
    navUserActivation: {
    	hasBeenActive: scinav.userActivation.hasBeenActive,
    	isActive: scinav.userActivation.isActive
    },
	screen: {
    	avH: screen.availHeight,
    	avL: screen.availLeft,
    	avT: screen.availTop,
    	avW: screen.availWidth,
    	coldepth: screen.colorDepth,
    	full: document.fullscreen,
    	h: screen.height,
    	lft: screenLeft,
    	orientation: {
            angle: screen.orientation.angle,
            onchange: screen.orientation.onchange,
            type: screen.orientation.type
    	},
    	pxdepth: screen.pixelDepth,
    	top: screenTop,
    	w: screen.width,
    	x: screenX,
    	y: screenY
    },
    scroll: {
    	barsVisible: scrollbars.visible,
    	onscroll: document.onscroll,
    	scrollingElm: document.scrollingElement,
    	x: scrollX,
    	y: scrollY
    },
    statBarV: statusbar.visible,
	webkit: {
    	fullscreenElement: document.webkitFullscreenElement,
    	fullscreenElementCurrent: document.webkitCurrentFullscreenElement,
    	fullscreenEnabled: document.webkitFullscreenEnabled,
    	hidden: document.webkitHidden,
    	visibilityState: document.webkitVisibilityState
    },
	Wnd: {
		PERSISTENT: Window.PERSISTENT,
    	TEMP: Window.TEMPORARY
	},
	wnd: {
		closed: window.closed,
		defStat: window.defaultStatus,
    	defstat: window.defaultstatus,
    	devPixRatio: window.devicePixelRatio,
    	evt: window.event,
    	fillcol: window.fillcolor,
    	frameElm: window.frameElement,
    	his: sciHis,
    	inH: window.innerHeight,
    	inW: window.innerWidth,
    	len: window.length,
        loc: {
            search: sciLoc.search
        },
		name: window.name,
    	offBuff: window.offscreenBuffering,
    	opener: window.opener,
    	orig: window.origin,
    	outH: window.outerHeight,
    	outW: window.outerWidth,
    	pageXoff: window.pageXOffset,
    	pageYoff: window.pageYOffset,
    	strokecol: window.strokecolor
	},
	wndhis: {
		length: sciHis.length,
		scrollRes: sciHis.scrollRestoration,
    	state: sciHis.state
	}
};