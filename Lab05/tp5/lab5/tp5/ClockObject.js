/**
 * ClockObject
 * @param gl {WebGLRenderingContext}
 * @constructor
 */
function ClockObject(scene)
{
	CGFobject.call(this,scene);

	this.lampObject = new LampObject(this.scene, 12, 1);
	this.hourClockHand = new ClockHandObject(this.scene, 90, 0.5);
	this.minuteClockHand = new ClockHandObject(this.scene, 180, 0.75);
	this.secondClockHand = new ClockHandObject(this.scene, 270, 1);
	this.millClockHand = new ClockHandObject(this.scene, 0, 1.2);
};

ClockObject.prototype = Object.create(CGFobject.prototype);
ClockObject.prototype.constructor = ClockObject;

ClockObject.prototype.display = function ()
{
	var initialMatrix = this.scene.getMatrix();	//save initial state matrix

	//clock-body
	this.scene.rotate(deg2rad(180),0,0,1);
	this.scene.scale(0.5,0.5,0.2);
	this.scene.textureClock.apply();
	this.lampObject.display();

	this.scene.setMatrix(initialMatrix);

	//clock-hands
	this.scene.translate(0, 0, 0.2);
	this.scene.materialMarbleBlack.apply();

	//hour-clockhand
	this.scene.pushMatrix();
	this.scene.rotate(deg2rad(-this.hourClockHand.angle),0,0,1);
	this.hourClockHand.display();
	this.scene.popMatrix();

	//minute-clockhand
	this.scene.pushMatrix();
	this.scene.rotate(deg2rad(-this.minuteClockHand.angle),0,0,1);
	this.minuteClockHand.display();
	this.scene.popMatrix();
	
	//second-clockhand
	this.scene.pushMatrix();
	this.scene.rotate(deg2rad(-this.secondClockHand.angle),0,0,1);
	this.secondClockHand.display();
	this.scene.popMatrix();

	//mill-clockhand
	this.scene.pushMatrix();
	this.scene.rotate(deg2rad(-this.millClockHand.angle),0,0,1);
	this.millClockHand.display();
	this.scene.popMatrix();

	this.scene.setMatrix(initialMatrix);
};

ClockObject.prototype.setTime = function (hour=3, minute=30, second=45, millisecond=0)
{
	//console.log(hour, minute, second, millisecond);

	//time unit
	var mill360 = 360/1000;
	var sec360 = 360/60;
	var min360 = 360/60;
	var hour360 = 360/12;

	var millAngle = millisecond*mill360;
	var secondAngle = second*sec360;
	var minuteAngle = minute*min360;
	var hourAngle = (hour<=12) ? hour*hour360 : (hour-12)*hour360; 
		
	//time unit + lower unit offset (fine turning)
	var millSecAngle = millAngle/60;

	var secMinAngle = secondAngle/60;
	var millSecMinAngle = millSecAngle/60;

	var minHourAngle = minuteAngle/12;
	var secMinHourAngle = secMinAngle/12;
	var millSecMinHourAngle = millSecMinAngle/12;

	secondAngle = secondAngle + millSecAngle;
	minuteAngle = minuteAngle + secMinAngle + millSecMinAngle;
	hourAngle = hourAngle + minHourAngle + secMinHourAngle + millSecMinHourAngle;

	//set time unit hands angles
	this.hourClockHand.setAngle(hourAngle);
	this.minuteClockHand.setAngle(minuteAngle);
	this.secondClockHand.setAngle(secondAngle);
	this.millClockHand.setAngle(millAngle);
}