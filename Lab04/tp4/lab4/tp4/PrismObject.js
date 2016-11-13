/**
 * PrismObject
 * @constructor
 */
function PrismObject(scene, slices, stacks, scale=1)
{
	CGFobject.call(this,scene);

	this.slices = slices;
	this.stacks = stacks;
	this.scale = scale;

	this.initBuffers();
};

PrismObject.prototype = Object.create(CGFobject.prototype);
PrismObject.prototype.constructor = PrismObject;

PrismObject.prototype.initBuffers = function()
{
	/*
	* TODO:
	* Replace the following lines in order to build a prism with a **single mesh**.
	*
	* How can the vertices, indices and normals arrays be defined to
	* build a prism with varying number of slices and stacks?
	*/

	/*
	* Coordinate calculation:
	* n = number of slices
	* 2*PI = full circle
	* x-coordinte = cos(2*PI/n)
	* y-coordinate = sin(2*PI/n)
	*/

	/*
	* Normal calculation:
	* 	(objects side/slice middle coordinates = odd coordinates of object with twice as much sides)
	* n = number of slices
	* 2*PI = full circle
	* x-coordinte = cos(2*PI/n/2)
	* y-coordinate = sin(2*PI/n/2)
	*/

	this.vertices = [];
	this.indices = [];
	this.normals = [];
	this.texCoords = [];

	for(i=0; i < this.stacks; i++)
	{
		for(j=0; j < this.slices; j++)
		{
			//START: Generate vertices - coordinates

				//calculate side (slice) coordinates
				var angle = (2*Math.PI)/this.slices;	//object side (slice) angle size
				var curSideAngle = j*angle;				//current side (slice) angle - begin of current side
				var nextSideAngle = (j+1)*angle;		//next side (slice) angle - end of current side

				var x1 = Math.cos(curSideAngle);		//x1-vertex
				var y1 = Math.sin(curSideAngle);		//y1-vertex
				var x2 = Math.cos(nextSideAngle);		//x2-vertex
				var y2 = Math.sin(nextSideAngle);		//y2-vertex
				var zBottom = i;						//z-bottom-vertex
				var zFront = i+1;						//z-front-vertex

				//scale whole object coordinates
				x1 = x1*this.scale;
				y1 = y1*this.scale;
				x2 = x2*this.scale;
				y2 = y2*this.scale;
				zBottom = zBottom*this.scale;
				zFront = zFront*this.scale;

				//[0] back-first point
				this.vertices.push(x1);	
				this.vertices.push(y1);	
				this.vertices.push(zBottom);

				//[1] back-second point
				this.vertices.push(x2);
				this.vertices.push(y2);
				this.vertices.push(zBottom);

				//[2] front-first point
				this.vertices.push(x1);	
				this.vertices.push(y1);	
				this.vertices.push(zFront);

				//[3] front-second point
				this.vertices.push(x2);
				this.vertices.push(y2);
				this.vertices.push(zFront);

			//END: Generate vertices - coordinates


			//START: Generate indices: connect vertices - coordinates

				//calculate side (slice) indice
				var sliceCordNum = 4;	//2*triangle = {0,1,2} union {3,2,1} = {0,1,2,3} -> 4 coordinates
				var slice = (sliceCordNum*j);
				var stack = (sliceCordNum*this.slices*i);
				var offset = slice+stack;

				//first triangle
				this.indices.push(0+offset);
				this.indices.push(1+offset);
				this.indices.push(2+offset);

				//second triangle
				this.indices.push(3+offset);
				this.indices.push(2+offset);
				this.indices.push(1+offset);

			//END: Generate indices: connect vertices - coordinates


			//START: Generate normals (*each vertex must have normal value)

				//calculate side (slice) normal (similar to calculation of coordinates)
				var halfAngle = angle/2;				//double object side (slice) angle size
				var curOddSide = (j*2+1);				//double object odd sides - current odd side
				var curOddAngle = curOddSide*halfAngle;	//current odd side (slice) angle of double object

				var xNormal = Math.cos(curOddAngle);	//x-normal
				var yNormal = Math.sin(curOddAngle);	//y-normal
				var zNormal = 0;						//z-normal	(0 = no reflection in direction of z-axis (depth))

				//scale whole object normals - not necessary
				//xNormal = xNormal*this.scale;
				//yNormal = yNormal*this.scale;

				//add normal for back-first point
				this.normals.push(xNormal);		//add normal for vertex x - direction x
				this.normals.push(yNormal);		//add normal for vertex y - direction y
				this.normals.push(zNormal);		//add normal for vertex z - direction z

				//add normal for back-second point
				this.normals.push(xNormal);
				this.normals.push(yNormal);
				this.normals.push(zNormal);

				//add normal for front-first point
				this.normals.push(xNormal);
				this.normals.push(yNormal);
				this.normals.push(zNormal);

				//add normal for front-second point
				this.normals.push(xNormal);
				this.normals.push(yNormal);
				this.normals.push(zNormal);

			//END: Generate normals

			//START: Generate texture coordinates (*each coordinte (3 vertices) must have 2 texture values - width & height position (0-1) of texture image

				var xTex1 = j*(1/this.slices);	//x1-texture image coordinate
				var yTex1 = i*(1/this.stacks);	//y1-texture image coordinate
				var xTex2 = (j+1)*(1/this.slices);	//x2-texture image coordinate
				var yTex2 = (i+1)*(1/this.stacks);	//y2-texture image coordinate 

				//add texture point for back-first point
				this.texCoords.push(xTex1, yTex1);

				//add texture point for back-second point
				this.texCoords.push(xTex2, yTex1);

				//add texture point for front-first point
				this.texCoords.push(xTex1, yTex2);

				//add texture point for front-second point
				this.texCoords.push(xTex2, yTex2);

			//END: Generate texture coordinates
		}
	}

	//console.log(this.vertices);
	//console.log(this.indices);
	//console.log(this.normals);
	//console.log(this.texCoords);

	//this.normals = null //uncomment for defoult object light reflection (object visible from all sides - regardless of light position)

	this.primitiveType = this.scene.gl.TRIANGLES;
	this.initGLBuffers();
};