var game;
var canvas = document.createElement('canvas');
var div; 
canvas.width = 640;
canvas.height = 640;
canvas.addEventListener('click', function(event){
	executeNext(event.offsetX,event.offsetY);
},false);
ctx = canvas.getContext('2d');
var pieceSize;
var gameState = 0;

function createNewGame(node, size, wc){
	div = node;
	div.appendChild(canvas);
	game = new gridGame(size,size,wc);
	pieceSize = 640/size;
	newGame();
	gameState = 0;
}

function playerDrawPiece(x,y){
	var gridX, gridY;
	gridX = parseInt(x/pieceSize);
	gridY = parseInt(y/pieceSize);
	var p = game.turn;
	//-1 err, 0 normal, >0 win
	switch(game.place(gridX,gridY)){
		case 0:
		//normal, next turn	
			drawPiece(p,gridX,gridY);
			return ;
		case 1:
		//p1 wins
			drawPiece(p,gridX,gridY);
			gameState = 2;
			return ;
		case 2:
		//p2 wins
			drawPiece(p,gridX,gridY);
			gameState = 2;
			return ;
		default:
		//err
			return ;
	}
}

function executeNext(x,y){
	switch(gameState){
		case 0:
			//waiting for the first piece to be drawn
			playerDrawPiece(x,y);
			gameState = 1;
			break;
		case 1:
			//on game
			playerDrawPiece(x,y);
			break;
		case 2:
			//got a winner(to case 0)
			newGame();
			break;
		case 3:
			//tba

			break;
		case 4:
			//tba

			break;
		default:
	}
}

function getMouseXY(event){
	executeNext(event.offsetX,event.offsetY);
}

function drawGrid(){
	for(var i=pieceSize;i<640;i+=pieceSize){
		ctx.beginPath();
		ctx.moveTo(0,i);
		ctx.lineTo(640,i);
		ctx.stroke();
		ctx.moveTo(i,0);
		ctx.lineTo(i,640);
		ctx.stroke();
	}
	
}

function drawPiece(p,x,y){
	var r = pieceSize/2;
	var cx = x*pieceSize+r;
	var cy = y*pieceSize+r;
	ctx.beginPath();
	ctx.arc(cx,cy,r,0,2*Math.PI,false);
	if(p==1)
		ctx.fill();
	ctx.stroke();		
}

function newGame(){
	game.newGame();
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawGrid();
	gameState = 0;
}

function gridGame(w,h,winCount){
	//0 nothing, 1 p1, 2 p2
	this.grid = [];
	
	this.totalPieces = w*h;
	
	this.winCount = winCount;

	this.win = 0;

	this.newGame = function(){
		this.win = 0;
		this.grid = [];
		for(var i=0;i<w;i++){
			this.grid.push([]);
			for(var j=0;j<h;j++){
				this.grid[i].push(0);
			}
		}
	}

	//this.newGame();
	
	this.turn = 1;	

	this.place = function(x,y){
		if(this.win!=0){
			console.log("Player "+this.win+" has won the game. Please start a new round.");
			alert("Player "+this.win+" has won the game. Please start a new round.");
			return -1;
		}
		//validate location
		if(!this.isValidLocation(x,y)){
			console.log("invalid location");
			//try again
			return -1;
		}
		if(this.grid[x][y]!=0){
			console.log("already has a piece on "+x+","+y);
			//try again
			return -1;
		}
		//place on the grid
		this.grid[x][y]=this.turn;
		//check piece connectivity
		if(this.checkWinnability(this.turn,x,y)){
			//winning
			this.win = this.turn;
			console.log("Player "+this.turn+" wins");
			alert("Player "+this.turn+" wins");
			return this.turn;
		}
		//take turn
		if(this.turn==1)
			this.turn=2;
		else
			this.turn=1;

		//wait for the next piece
		return 0;
	}

	this.isValidLocation = function(x,y){
		return x>-1&&x<w&&y>-1&&y<h;
	}
	
	this.checkWinnability = function(p,x,y){
		return this.checkDir(p,x,y,-1,-1)||this.checkDir(p,x,y,0,-1)||this.checkDir(p,x,y,+1,-1)||this.checkDir(p,x,y,-1,0)||this.checkDir(p,x,y,+1,0)||this.checkDir(p,x,y,-1,+1)||this.checkDir(p,x,y,0,+1)||this.checkDir(p,x,y,+1,+1);	
	}

	this.checkDir = function(p,x,y,dx,dy){
		var win = true;
		var tempCounter = this.winCount-1;
		while(tempCounter>0){
			x+=dx;
			y+=dy;
			if(!this.isValidLocation(x,y))
				return false;
			if(this.grid[x][y]!=p)
				return false;
			tempCounter--;
		}
		return true;
	}

	this.drawPiece = function(p,x,y){
		//draw a piece according to player turn.	
	}

	this.printGrid = function(){
		var result = "";
		for(var x=0;x<this.w;x++){
			for(var y=0;y<this.h;y++){
				result+=this.grid[x][y];
			}
			result+="\n";
		}
		console.log(result);
	}

}
