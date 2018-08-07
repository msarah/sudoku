function Cell(x, y, width, height, value = 0, colour = [255,255,255]) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.value = value;
	this.colour = colour;

	this.render = function(startX, startY) {
		fill(this.colour);
		stroke(0);
		rect(startX + (this.x * this.width), startY + (this.y * this.height), this.width, this.height);
	}

	this.changeColour = function(newColour, startX, startY) {
		this.colour = newColour;
		this.render(startX, startY);
	}
	this.getX = function() {
		return this.x;
	}
	this.getY = function() {
		return this.y;
	}
	this.getWidth = function() {
		return this.width;
	}
	this.getHeight = function() {
		return this.height;
	}
}


function Grid(columns, rows, cellWidth, cellHeight, startX, startY) {

	this.columns = columns,
	this.rows = rows,
	this.cells = [];
	this.cellWidth = cellWidth;
	this.cellHeight = cellHeight;
	this.startX = startX;
	this.endX = startX + (this.columns * this.cellWidth);
	this.startY = startY;
	this.endY = startY + (this.rows * this.cellHeight);

	this.currentX =  Math.floor((mouseX-this.startX)/cellWidth);
	this.currentY = Math.floor((mouseY-this.startY)/cellHeight);

	for (var i = 0; i < this.columns; i++) {
		this.cells[i] = [];
		for (var j = 0; j < this.rows; j++) {
			this.cells[i][j] = new Cell(i,j, cellWidth, cellHeight);
		}
	}

	this.drawGrid = function() {
		for (var i = 0; i < this.columns; i++) {
			for (var j = 0; j < this.rows; j++) {
				this.cells[i][j].render(this.startX, this.startY);
			}
		}
	}

	//replace constant value with formula based on startx and start y of grid
	this.crossHair = function() {
		for(var i = 0; i < this.columns; i++) {
			for (var j = 0; j < this.rows; j++) {
				if(i == this.currentX) {
					var c = this.getCell(this.currentX, j)
					c.changeColour(225, this.startY, this.startY);
				}
				if(j == this.currentY) {
					var c = this.getCell(i, this.currentY)
					c.changeColour(225, this.startY, this.startY);
				}
			}
		}
	}


	this.getRows = function() {
		return this.rows;
	}

	this.getColumns = function() {
		return this.columns;
	}

	this.getStartX = function() {
		return this.startX;
	}
	this.getEndX = function() {
		return this.endX;
	}

	this.getStartY = function() {
		return this.startY;
	}
	this.getEndY = function() {
		return this.endY;
	}
	this.getCurrentX = function() {
		return this.currentX;
	}

	this.getCurrentY = function() {
		return this.currentY;
	}
	this.getCell = function(x,y) {
		return this.cells[x][y]
	}

	this.getCurrentX = function() {
		return this.currentX;
	}
	this.getCurrentY = function() {
		return this.currentY;
	}

	this.info = function() {
		console.log("Number of Columns:", columns);
	  console.log("Number of Rows:", rows);
	  console.log("Total Number of Cells:", rows * columns);
	}

}

//check if a number is within a min and max range
function between(x, min, max) {
	return x >= min && x <= max;
}


//SETUP runs once at the beginning of the program initialization
function setup() {
	createCanvas(800, 800); //width,height
}


//DRAW executes over and over - the MAIN LOOP
function draw() {
	//background must be at the START
	// draw will draw everything to the screen in order of the code

	background(250,204,0);
	//initialize grid
	var grid = new Grid(9,9,50,50, 200, 200);
	//PROBLEMS !!!!!!!!!!!!!!!!1---------------------------------
	grid.drawGrid();


	var inGrid = ((between(mouseX, grid.getStartX(), grid.getEndX())) && (between(mouseY, grid.getStartY(),grid.getEndY())));


	if(inGrid) {
		console.log("mouseX:", mouseX, "mouseY:", mouseY);
		console.log("X:", grid.getCurrentX(), " Y:", grid.getCurrentY());

		grid.crossHair();
		var currentCell = grid.getCell(grid.getCurrentX(), grid.getCurrentY());
		currentCell.changeColour([255,0,0,50], grid.startX, grid.startY);
	}

}
