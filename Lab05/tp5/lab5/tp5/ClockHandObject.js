/**
 * ClockHandObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function ClockHandObject(scene, angle, length=1)
{
	CGFobject.call(this,scene);

	this.angle = angle;
	this.length = length;
	this.cubeObject = new CubeSquareUnitObject(this.scene);
};

ClockHandObject.prototype = Object.create(CGFobject.prototype);
ClockHandObject.prototype.constructor = ClockHandObject;

ClockHandObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix
	
	var handScale = 0.4;
	var handLength = this.length*handScale;
	
	//NOT WORKING - translatation problems
	//var xTranslate = Math.cos(deg2rad(this.angle/2))*(handLength/2);
	//var yTranslate = Math.sin(deg2rad(this.angle/2))*(handLength/2);
	//this.scene.translate(xTranslate, yTranslate, 0);
	
	this.scene.translate(0, handLength/2, 0);
	this.scene.scale(0.01, handLength, 0.01);

	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);
};

ClockHandObject.prototype.setAngle = function (angle = 0)
{
	this.angle = angle;
}