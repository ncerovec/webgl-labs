/**
 * SquareObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function SquareObject(scene, minS=0, maxS=1, minT=0, maxT=1)
{
	CGFobject.call(this,scene);

	//X-coordinate (S-width)
	this.minS = minS;
	this.maxS = maxS;

	//Y-coordinate (T-height)
	this.minT = minT;
	this.maxT = maxT;

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

	this.normals =	[
						0, 0, 1,
						0, 0, 1,
						0, 0, 1,
						0, 0, 1
					];

	this.texCoords =	[
							this.minS, this.maxT,
							this.maxS, this.maxT,
							this.minS, this.minT,
							this.maxS, this.minT
						];
	
	this.primitiveType=this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};
