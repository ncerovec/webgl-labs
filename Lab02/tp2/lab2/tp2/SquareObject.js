/**
 * SquareObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function SquareObject(scene)
{
	CGFobject.call(this,scene);

	this.initBuffers();
};

SquareObject.prototype = Object.create(CGFobject.prototype);
SquareObject.prototype.constructor = SquareObject;

SquareObject.prototype.initBuffers = function ()
{
	this.vertices = [
						-0.5, -0.5, 0,
						0.5, -0.5, 0,
						-0.5, 0.5, 0,
						0.5, 0.5, 0
					];

	this.indices =	[
						0, 1, 2, 
						3, 2, 1
        			];

	this.normals = 
					[
						0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1
					];
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
