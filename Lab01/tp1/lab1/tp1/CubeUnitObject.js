/**
 * CubeUnitObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function CubeUnitObject(scene)
{
	CGFobject.call(this,scene);

	this.initBuffers();
};

CubeUnitObject.prototype = Object.create(CGFobject.prototype);
CubeUnitObject.prototype.constructor = CubeUnitObject;

CubeUnitObject.prototype.initBuffers = function ()
{
	this.vertices = [
						-0.5, 0.5, 0.5,		//[0] top-front-left vertex
						0.5, 0.5, 0.5,		//[1] top-front-right vertex
						-0.5, 0.5, -0.5,	//[2] top-back-left vertex
						0.5, 0.5, -0.5,		//[3] top-back-right vertex
						-0.5, -0.5, 0.5,	//[4] bottom-front-left vertex
						0.5, -0.5, 0.5,		//[5] bottom-front-right vertex
						-0.5, -0.5, -0.5,	//[6] bottom-back-left vertex
						0.5, -0.5, -0.5		//[7] bottom-back-right vertex
					];

	this.indices =	[
						0, 1, 3,	//top-square-1
						2, 0, 3,	//top-square-2
						7, 5, 4,	//bottom-square-1
						7, 4, 6,	//bottom-square-2
						4, 5, 0,	//front-square-1
						5, 1, 0, 	//front-square-2
						2, 3, 7,	//back-square-1
						7, 6, 2, 	//back-square-2
						0, 2, 6,	//left-square-1
						6, 4, 0, 	//left-square-2
						1, 5, 7, 	//right-square-2
						7, 3, 1,	//right-square-1
        			];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
