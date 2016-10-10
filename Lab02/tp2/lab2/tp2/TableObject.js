/**
 * CubeSquareUnitObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function TableObject(scene)
{
	CGFobject.call(this,scene);

	this.cubeObject = new CubeSquareUnitObject(this.scene);
};

TableObject.prototype = Object.create(CGFobject.prototype);
TableObject.prototype.constructor = TableObject;

TableObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix
	
	/*
	//HINT: 1. Position object = TRANSLATE
	//		2. Resize object = SCALE
	//		3. Align/Rotate object = ROTATE
	*/
	
	//draw back-left leg of the table
	this.scene.translate(-2, 3.5 / 2, -1);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(-7.8,0.5,-4.5);
	this.scene.materialMetal.apply();
	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);

	//draw back-right leg of the table
	this.scene.translate(2, 3.5 / 2, -1);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(7.8,0.5,-4.5);
	this.scene.materialMetal.apply();
	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);

	//draw front-left leg of the table
	this.scene.translate(-2, 3.5 / 2, 1);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(-7.8,0.5,4.5);
	this.scene.materialMetal.apply();
	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);

	//draw front-right leg of the table
	this.scene.translate(2, 3.5 / 2, 1);
	this.scene.scale(0.3,3.5,0.3);
	//this.scene.translate(7.8,0.5,4.5);
	this.scene.materialMetal.apply();
	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);

	//draw top of the table
	this.scene.translate(0, 3.5, 0);
	this.scene.scale(5,0.3,3);
	//this.scene.translate(0,12.2,0);
	this.scene.materialWood.apply();
	this.cubeObject.display();

	this.scene.setMatrix(initialMatrix);
};