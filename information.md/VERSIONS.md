# VERSIONS FOR THE FILES in SCIJS-Alpha

---
### v1.0016 (Calculator Beginning Update)
- added MATH-CALCS... enjoy :)

### v1.0015 (SCI UPDATE)
 - I'm back... with SCI.js
 - any update in SCI.js files don't count as major updates like these
 - added some new HTMLElement functions, like .clicks for buttons
 - added CSS! You thought I only did JS didcha? Heheheheeheeeheehhehehehehe...
 - added roundTo in SMATH
 - Enjoy :)
 - (for more info on the code see the code at SCI/SCI.js)

### v1.0014 (SMATH UPDATE)
- working on something else... for now
- I'll be busy on Swift firstly... bye for now
SMATH.js: SMATH and SNUM (new)
- SMATH stands for sciMath - more and more functions.
- SNUM is sciNumber.
- (you've heard of million, billion, and trillion... what about quadrillion, quintillion, and sextillion?)
- lots of math and thousands of numbers
- this SMATH variable contains a lot more than your average Math variable...
- transferred SCON.Number to SNUM.Number... welp
sciMainAlpha.js: sci
- added importSMATH
- deleted spotted sci.new duplicate
SCI2D.js: SCI2D
- rewrote the WHOLE of SCI2D (ouchmyhandshurt.com)
- removed a few stuff... sorry :(

### v1.0013 (SCON UPDATE, SCI3D still far)
SCON.js: SCON (new)
- SCON stands for sciConstructor - you can now create a sci version of Arrays, Numbers, etc. - only tweaked!
- no Object and RegExp because I haven't decided how
- maybe? Need to focus on something else
sciElements.js: SELM
- made setZ in SELM.zIndexEditor to activate on construct

### v1.0012 (SELM UPDATE + organized list of update items)
- SELM is here! You can now do lots of things!
sciMainAlpha.js: sci
- added sci.array.reverse
- added Functions comment
- added Battery information!
- added EventsNow, so you can kinda get the data of the previous event
- some added stuff
sciElement.js: SELM
- added Element
- added elementDisplay (slideshows, div shows, etc.)
- added displayToggler
- added Element constructors
- lots more stuff (er, kinda lots)

### v1.0011 (INFO UPDATE)
- sciElements.js update
- fixed/removed a few prototype functions
- also planning new variables: SCI3D and SELM
- added new folder: information.md, containing versions and sources.
- more information indeed! More at README.md

### v1.0010 (CANVAS ADDITION UPDATE)
- added more ctx functions!
- this update is mainly focused on adding new canvas and context functions... but I still put some more non-ctx functions.
- added importScript
- changed sci to sciBeta in sciMainBeta.js
- renamed ctx.Fill to ctx.close for a new Fill... and Stroke
- added fromSimple3dTo2d
- bugs bugs bugs bugs bugs (anyone read this?)
- added some sci.addSciContext2DFunctions lineTo and moveTo functions
- Still simple.
- added new file: sciElements! Still has few functions though.
- No, I will NOT be putting toCartesianCoordinateY. That's too obvious.
- still trying SCI3D

### v1.0009 (MAJOR ADDITION UPDATE)
- tweaked a bit of SCI2D.Scene.add
- added sci.getCtx()
- added sci.throw()
- added Error: full of Error functions!
- added SCI2D.isPointInPath()
- added SCI2D move functions
- added SCI2D geometry movement vectors
- added SCI2D geometry getDash()
- tweaked console messages
- added warning for sci.getPrototype()
- added prototype stuff
- added constructor stuff
- added a few SCI2D function tweaks
- added self and parent
- added Variables
- tweaked isOnCapsLock so it depends on the document, not by the given input, and it will not add a bunch of EventListeners
- tweaked SCI2D.Vector.rotateMatrix
- added SCI2D.getArcEnd
- added sci._IS_THING_OK
- added more SCI2D.Vector functions
- added sci.addSciContext2DFunctions! Now you can add more custom functions to your specific CanvasRenderingContext2D! :)
- added a lot more functions... but removed isOnCapsLock
- still don't know how to fix Geometry.rotateVertices :(
- planning to add SCI3D... soon
Note about sci.addSciContext2DFunctions: I thought the current ctx functions were not enough, so I added more.
If ctx is undefined, it puts the functions in window.CanvasRenderingContext2D.prototype, so whenever a context is made, the functions are there!
Some functions include linesTo, polygon, circle, fillArc, strokeEllipse, color, etc.

### v1.0008
- split SCI2D into SCI2DBeta and SCI2D
- you can do lots of things in SCI2D! .loop, Scene, Vector, etc.
- added sci.Element
- replaced docBody and docBodyStyle in Element
- added setTimeout and setInterval: in seconds!
- added toggleBoolean
- added otherMath.rotateVertex

### v1.0007
- SCI was renamed Scanvas
- edited a few more this functions
- edited first comment
- added new file: SCI2D! Now you can make polygons and stuff

### v1.0006
- added .execute to execute functions even without brackets or arguments (simple, right?)
- removed basicLine because it was too easy; to make up for it I edited SCI.text so it allows stroke.
- removed 2 JSON functions
- added a comment (...)
- couldn't continue starGeometry :(
- added/edited var to this (i.e. "var c" to "this.c")
- edited isPointInPath :(
- added getCtx in geometry functions
- fixed dashedLine continuous dash problem
- added newPath2D
- added sci.object

### v1.0005
- renamed triangleGeometry to trianglePointGeometry
- added trapezoidGeometry and ellipseGeometry
- added Line functions and Text
- added Geometry assignments
- added sci.Binary
- added reverse functions

### v1.0004
- added SCI.ringGeometry and SCI.rectRingGeometry
- copied some sci customs to SCI
- also put __SETTINGS__ but it's only a shortcut for sci
- added convertBinary (e.g. "0101" to 5) and reverseString (e.g. "hello" to "olleh");
- added SCI.reqFrame and triangle geometries

### v1.0003
- put the most dangerous settings in _DangerSettings_
- added many more settings
- added SCI variable: no settings, just some simple canvas functions
- with SCI you can now draw some shapes!

### v1.0002
- added some few more stuff
- added __SETTINGS__! You can now kinda ruin my work :/

### v1.0001
- added 3 new array item functions
- added new nth functions
- added Random match function

### v1.0000
- sciMain separated into BETA (unorganized) and ALPHA. However, syntaxHighlighter is only in BETA because of a few bugs. :/
- BETA functions were put on top of ALPHA file