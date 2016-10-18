var degToRad = Math.PI / 180.0;

var BOARD_WIDTH = 6.0;
var BOARD_HEIGHT = 4.0;

var BOARD_A_DIVISIONS = 30;
var BOARD_B_DIVISIONS = 100;

function LightingScene()
{
	CGFscene.call(this);
}

LightingScene.prototype = Object.create(CGFscene.prototype);
LightingScene.prototype.constructor = LightingScene;

//Convert degrees to radians - global function
function deg2rad(deg)
{
	var deg2rad=Math.PI/180.0;
	var a_rad=deg*deg2rad;

	return a_rad;
};

LightingScene.prototype.init = function(application)
{
	CGFscene.prototype.init.call(this, application);

	this.initCameras();

	this.initLights();

	this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
	this.gl.clearDepth(100.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE);
	this.gl.depthFunc(this.gl.LEQUAL);

	this.axis = new CGFaxis(this);

	// Scene elements
	this.table = new TableObject(this);
	this.wallLeft = new SquareObject(this, -0.5, 1.5, -0.5, 1.5);
	this.wallRight = new Plane(this);
	this.floor = new SquareObject(this, 0, 12, 0, 10);
	
	this.boardA = new Plane(this, BOARD_A_DIVISIONS);
	this.boardB = new Plane(this, BOARD_B_DIVISIONS);

	this.prism = new PrismObject(this, 5, 1);
	this.cylinder = new CylinderObject(this, 20, 1);

	// Materials
	this.materialDefault = new CGFappearance(this);
	
	this.materialA = new CGFappearance(this);
	this.materialA.setAmbient(0.3,0.3,0.3,1);
	this.materialA.setDiffuse(0.6,0.6,0.6,1);
	this.materialA.setSpecular(0,0.2,0.8,1);
	this.materialA.setShininess(120);

	this.materialB = new CGFappearance(this);
	this.materialB.setAmbient(0.3,0.3,0.3,1);
	this.materialB.setDiffuse(0.6,0.6,0.6,1);
	this.materialB.setSpecular(0.8,0.8,0.8,1);	
	this.materialB.setShininess(120);

	this.materialWood = new CGFappearance(this);
	this.materialWood.setAmbient(0.65,0.165,0.165,1);
	this.materialWood.setDiffuse(0.5,0.5,0.5,1);
	this.materialWood.setSpecular(0.2,0.2,0.2,1);
	this.materialWood.setShininess(20);	

	this.materialMetal = new CGFappearance(this);
	this.materialMetal.setAmbient(0.55,0.58,0.6,1);
	this.materialMetal.setDiffuse(0.2,0.2,0.2,1);
	this.materialMetal.setSpecular(0.8,0.8,0.8,1);	
	this.materialMetal.setShininess(120);

	this.materialWallBlue = new CGFappearance(this);
	this.materialWallBlue.setAmbient(0.53,0.8,0.98,1);
	this.materialWallBlue.setDiffuse(0.2,0.2,0.2,1);
	this.materialWallBlue.setSpecular(0.2,0.2,0.2,1);	
	this.materialWallBlue.setShininess(20);

	this.materialMarbleBlack = new CGFappearance(this);
	this.materialMarbleBlack.setAmbient(0,0,0,1);
	this.materialMarbleBlack.setDiffuse(0.1,0.1,0.1,1);
	this.materialMarbleBlack.setSpecular(0.9,0.9,0.9,1);	
	this.materialMarbleBlack.setShininess(200);

	// Textures
	this.enableTextures(true);

	this.textureTableWood = new CGFappearance(this);
	//this.textureTableWood.setAmbient(0.65,0.165,0.165,1);
	this.textureTableWood.setDiffuse(0.5,0.5,0.5,1);
	this.textureTableWood.setSpecular(0.2,0.2,0.2,1);
	this.textureTableWood.setShininess(20);	
	this.textureTableWood.loadTexture("../resources/images/table.png");

	this.textureTableMetal = new CGFappearance(this);
	//this.textureTableMetal.setAmbient(0.65,0.165,0.165,1);
	this.textureTableMetal.setDiffuse(0.2,0.2,0.2,1);
	this.textureTableMetal.setSpecular(0.8,0.8,0.8,1);	
	this.textureTableMetal.setShininess(120);
	this.textureTableMetal.loadTexture("../resources/images/legs.png");

	this.textureFloorWood = new CGFappearance(this);
	//this.textureFloorWood.setAmbient(0,0,0,1);
	this.textureFloorWood.setDiffuse(0.7,0.7,0.7,1);
	this.textureFloorWood.setSpecular(0.9,0.9,0.9,1);	
	this.textureFloorWood.setShininess(200);
	this.textureFloorWood.loadTexture("../resources/images/floor.png");

	this.textureWindow = new CGFappearance(this);
	this.textureWindow.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	this.textureWindow.loadTexture("../resources/images/window.png");

	this.textureSlides = new CGFappearance(this);
	this.textureSlides.setAmbient(0,0,0,1);
	this.textureSlides.setDiffuse(0.8,0.8,0.8,1);
	this.textureSlides.setSpecular(0.1,0.1,0.1,1);
	this.textureSlides.setShininess(200);
	this.textureSlides.loadTexture("../resources/images/slides.png");

	this.textureBoard = new CGFappearance(this);
	this.textureBoard.setAmbient(0,0,0,1);
	this.textureBoard.setDiffuse(0.4,0.4,0.4,1);
	this.textureBoard.setSpecular(0.4,0.4,0.4,1);
	this.textureBoard.setShininess(100);
	this.textureBoard.loadTexture("../resources/images/board.png");

	this.textureDrawplate = new CGFappearance(this);
	this.textureDrawplate.loadTexture("../resources/images/drawplate.png");

	this.textureFabric = new CGFappearance(this);
	this.textureFabric.loadTexture("../resources/images/fabric.png");
};

LightingScene.prototype.initCameras = function()
{
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(30, 30, 30), vec3.fromValues(0, 0, 0));
};

LightingScene.prototype.initLights = function()
{
	//this.setGlobalAmbientLight(0.5,0.5,0.5, 1.0);
	
	// Positions for four lights
	this.lights[0].setPosition(4, 6, 1, 1);
	this.lights[0].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[1].setPosition(10.5, 6.0, 1.0, 1.0);
	this.lights[1].setVisible(true); // show marker on light position (different from enabled)

	this.lights[2].setPosition(10.5, 6.0, 5.0, 1.0);
	this.lights[2].setVisible(true); // show marker on light position (different from enabled)
	
	this.lights[3].setPosition(4, 6.0, 5.0, 1.0);
	this.lights[3].setVisible(true); // show marker on light position (different from enabled)

	//Window light
	this.lights[4].setPosition(0.0, 6.0, 7.5, 1.0);
	//this.lights[4].setVisible(true); // show marker on light position (different from enabled)

	this.lights[0].setAmbient(0, 0, 0, 1);
	this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[0].setSpecular(1.0, 1.0, 0.0, 1.0);	//yellow color - specular
	this.lights[0].enable();

	this.lights[1].setAmbient(0, 0, 0, 1);
	this.lights[1].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[1].enable();

	this.lights[2].setAmbient(0, 0, 0, 1);
	this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[2].setConstantAttenuation(0);
	this.lights[2].setLinearAttenuation(1.0);
	this.lights[2].setQuadraticAttenuation(0);
	this.lights[2].enable();

	this.lights[3].setAmbient(0, 0, 0, 1);
	this.lights[3].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[3].setConstantAttenuation(0);
	this.lights[3].setLinearAttenuation(0);
	this.lights[3].setQuadraticAttenuation(1.0);
	this.lights[3].enable();

	//Set window light properties
	this.lights[4].setAmbient(0, 0, 0, 1);
	this.lights[4].setDiffuse(1.0, 1.0, 1.0, 1.0);
	this.lights[4].setSpecular(1.0, 1.0, 1.0, 1.0);
	this.lights[4].enable();
};

LightingScene.prototype.updateLights = function()
{
	for (i = 0; i < this.lights.length; i++)
		this.lights[i].update();
}

LightingScene.prototype.display = function()
{
	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
	this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// Initialize Model-View matrix as identity (no transformation)
	this.updateProjectionMatrix();
	this.loadIdentity();

	// Apply transformations corresponding to the camera position relative to the origin
	this.applyViewMatrix();

	// Update all lights used
	this.updateLights();

	// Draw axis
	this.axis.display();

	this.materialDefault.apply();

	// ---- END Background, camera and axis setup

	
	// ---- BEGIN Geometric transformation section

	// ---- END Geometric transformation section


	// ---- BEGIN Primitive drawing section

	// Floor
	this.pushMatrix();
		this.translate(7.5, 0, 7.5);
		this.rotate(-90 * degToRad, 1, 0, 0);
		this.scale(15, 15, 0.2);
		//this.materialMarbleBlack.apply();
		this.textureFloorWood.apply();
		this.floor.display();
	this.popMatrix();

	// Left Wall
	this.pushMatrix();
		this.translate(0, 4, 7.5);
		this.rotate(90 * degToRad, 0, 1, 0);
		this.scale(15, 8, 0.2);
		//this.materialWallBlue.apply();
		this.textureWindow.apply();
		this.wallLeft.display();
	this.popMatrix();

	// Plane Wall
	this.pushMatrix();
		this.translate(7.5, 4, 0);
		this.scale(15, 8, 0.2);
		this.materialWallBlue.apply();
		this.wallRight.display();
	this.popMatrix();

	// First Table
	this.pushMatrix();
		this.translate(5, 0, 8);
		this.table.display();
	this.popMatrix();

	// Second Table
	this.pushMatrix();
		this.translate(12, 0, 8);
		this.table.display();
	this.popMatrix();

	// Board A
	this.pushMatrix();
		this.translate(4, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		//this.materialA.apply();
		this.textureSlides.apply();
		this.boardA.display();
	this.popMatrix();

	// Board B
	this.pushMatrix();
		this.translate(10.5, 4.5, 0.2);
		this.scale(BOARD_WIDTH, BOARD_HEIGHT, 1);
		
		//this.materialB.apply();
		this.textureBoard.apply();
		this.boardB.display();
	this.popMatrix();

	//Prism
	this.pushMatrix();
		this.translate(5, 4.5, 8);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.textureDrawplate.apply();
		this.prism.display();
	this.popMatrix();

	//Cylinder
	this.pushMatrix();
		this.translate(12, 4.5, 8);
		this.rotate(90 * degToRad, 1, 0, 0);
		this.textureFabric.apply();
		this.cylinder.display();
	this.popMatrix();

	
	// ---- END Primitive drawing section
};
