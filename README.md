# SCIJS-Alpha
These files are for improvement. Some are still in beta mode :)
Please note that these files are for the good of shortcuts (or bad?) and to make coding easier.
Still trying to update everyday for anyone who sees this :)

## VERSIONS (for sciMainAlpha.js)
---
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

### v1.0009 (MAJOR ADDITION UPDATE I)
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