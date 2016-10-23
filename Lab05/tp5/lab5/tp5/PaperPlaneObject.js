/**
 * PaperPlaneObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PaperPlaneObject(scene, angle=0, positionX=0, positionY=0, positionZ=0)
{
	CGFobject.call(this,scene);

	this.angle = angle;
	this.positionX = positionX;
	this.positionY = positionY;
	this.positionZ = positionZ;

	this.initBuffers();
};

PaperPlaneObject.prototype = Object.create(CGFobject.prototype);
PaperPlaneObject.prototype.constructor = PaperPlaneObject;

PaperPlaneObject.prototype.initBuffers = function ()
{
	this.vertices = [
						-0.25, 0, 0,	//[0]	right-wing outer-edge point
						-0.05, 0, 0,	//[1]	right-wing inner-edge point
						0.25, 0, 0,		//[2]	left-wing outer-edge point
						0.05, 0, 0,		//[3]	left-wing inner-edge point
						0, -0.25, 0,	//[4]	bottom point
						0, 0, 1			//[5]	top point
					];

	this.indices =	[
						1, 0, 5,	//right-wing (top)
						0, 1, 5,	//right-wing (under)
						2, 3, 5,	//left-wing (top)
						3, 2, 5,	//left-wing (under)
						1, 4, 5,	//right-bottom (outside)
						4, 1, 5,	//right-bottom (inside)
						4, 3, 5,	//left-bottom (outside)
						3, 4, 5,	//left-bottom (inside)
        			];

	this.normals =	[
						0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1
					];

	/*
	this.texCoords =	[
							this.minS, this.maxT,
							this.maxS, this.maxT,
							this.minS, this.minT,
							this.maxS, this.minT
						];
	*/						
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};

PaperPlaneObject.prototype.moveZ = function (speedZ=0)
{
	this.positionZ += speedZ;
}

PaperPlaneObject.prototype.fallY = function (speedY=0)
{
	this.positionY -= speedY;
}

PaperPlaneObject.prototype.rotateCW = function (rotSpeed=0)
{
	this.angle += rotSpeed;
}