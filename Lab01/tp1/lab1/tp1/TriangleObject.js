/**
 * TriangleObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function TriangleObject(scene)
{
	CGFobject.call(this,scene);

	this.initBuffers();
};

TriangleObject.prototype = Object.create(CGFobject.prototype);
TriangleObject.prototype.constructor = TriangleObject;

TriangleObject.prototype.initBuffers = function ()
{
	this.vertices = [
						-1, 0.5, 0,
						1, 0.5, 0,
						-0, 2, 0
					];

	this.indices =	[
						0, 1, 2
        			];
		
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
