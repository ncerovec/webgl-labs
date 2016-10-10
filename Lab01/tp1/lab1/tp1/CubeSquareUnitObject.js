/**
 * CubeSquareUnitObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function CubeSquareUnitObject(scene)
{
	CGFobject.call(this,scene);

	this.squareObject = new SquareObject(this.scene);
	//this.squareObject.initBuffers();	//buffer allready initialized in SquareObject Class constructor
};

CubeSquareUnitObject.prototype = Object.create(CGFobject.prototype);
CubeSquareUnitObject.prototype.constructor = CubeSquareUnitObject;

CubeSquareUnitObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix
	//this.scene.pushMatrix();	//pushes initial state of transformation matrix to stack

	//draw front square of cube
	this.scene.translate(0,0,0.5);
	this.squareObject.display();
	
	//draw back square of cube
	this.scene.setMatrix(initialMatrix);
	this.scene.rotate(deg2rad(180),0,1,0);
	this.scene.translate(0,0,0.5);
	this.squareObject.display();

	//draw left square of cube
	this.scene.setMatrix(initialMatrix);
	this.scene.rotate(deg2rad(-90),0,1,0);
	this.scene.translate(0,0,0.5);
	this.squareObject.display();

	//draw right square of cube
	this.scene.setMatrix(initialMatrix);
	this.scene.rotate(deg2rad(90),0,1,0);
	this.scene.translate(0,0,0.5);
	this.squareObject.display();

	//draw top square of cube
	this.scene.setMatrix(initialMatrix);
	this.scene.rotate(deg2rad(-90),1,0,0);
	this.scene.translate(0,0,0.5);
	this.squareObject.display();

	//draw bottom square of cube
	this.scene.setMatrix(initialMatrix);
	this.scene.rotate(deg2rad(90),1,0,0);
	this.scene.translate(0,0,0.5);
	this.squareObject.display();

	this.scene.setMatrix(initialMatrix);
};