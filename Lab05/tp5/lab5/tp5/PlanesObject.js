/**
 * PlanesObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function PlanesObject(scene, num=5)
{
	CGFobject.call(this,scene);

	this.num = num;
	this.planes = [];

	this.cubeObject = new CubeSquareUnitObject(this.scene);
};

PlanesObject.prototype = Object.create(CGFobject.prototype);
PlanesObject.prototype.constructor = PlanesObject;

PlanesObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix
		
	for(var i=0; i < this.num; i++)
	{
		if(this.planes.length != this.num)
		{		
			var randRange = Math.floor((Math.random() * this.num)+1)-(this.num/2);	//set random position for plane (range - number of planes)
			this.planes[i] = new PaperPlaneObject(this.scene, 0, randRange, randRange, randRange);
		}

		this.scene.translate(1, 0, 0);

		this.scene.pushMatrix();

		this.scene.translate(this.planes[i].positionX, this.planes[i].positionY, this.planes[i].positionZ);
		this.scene.rotate(deg2rad(this.planes[i].angle), 0, 0, 1);
		
		this.planes[i].display();
		this.scene.popMatrix();
	}

	this.scene.setMatrix(initialMatrix);
};

PlanesObject.prototype.launchPlanes = function (speed=0)
{
	var wallPosition = 13.5;
	var floorPosition = -5.7;

	var downwardSpeed = speed/10;
	var fallSpeed = speed/2;

	var downwardAmount = downwardSpeed*(wallPosition/speed);
	var rotateSpeed = 180/((floorPosition-downwardAmount)/fallSpeed);

	for(var i=0; i < this.planes.length; i++)
	{
		if(this.planes[i].positionZ <= wallPosition)
		{
			this.planes[i].moveZ(speed);			//forward path
			this.planes[i].fallY(downwardSpeed);	//downward path
		}
		else if(this.planes[i].positionY >= floorPosition)
		{
			this.planes[i].rotateCW(rotateSpeed);	//face-down fall
			this.planes[i].fallY(fallSpeed);		//fall path
		}
		else
		{
			//Plane is down on the floor
		}
	}
}