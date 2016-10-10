/**
 * FloorObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function FloorObject(scene)
{
	CGFobject.call(this,scene);

	this.cubeObject = new CubeSquareUnitObject(this.scene);
};

FloorObject.prototype = Object.create(CGFobject.prototype);
FloorObject.prototype.constructor = FloorObject;

FloorObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix

	//draw front square of cube
	this.scene.scale(8,0.1,6);
	this.cubeObject.display();
	
	this.scene.setMatrix(initialMatrix);
};