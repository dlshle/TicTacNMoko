function gridGame(w,h,winCount){
	//0 nothing, 1 p1, 2 p2
	this.grid = [];
	
	this.totalPieces = w*h;
	
	this.winCount = winCount;

	this.win = 0;

	this.newGame = function(){
		this.win = 0;
		for(var i=0;i<w;i++){
			this.grid.push([]);
		}
		for(var i=0;i<w;i++){
			for(var j=0;j<h;j++)
				this.grid[i].push(0);
		}
	}

	this.newGame();
	
	this.turn = 1;	

	this.place = function(x,y){
		if(this.win!=0){
			console.log("Player "+this.win+" has won the game. Please start a new round.");
			return ;
		}
		//validate location
		if(!this.isValidLocation(x,y)){
			console.log("invalid location");
			//try again
			return ;
		}
		if(this.grid[x][y]!=0){
			console.log("already has a piece on "+x+","+y);
			//try again
			return ;
		}
		//place on the grid
		this.grid[x][y]=this.turn;
		//check piece connectivity
		if(this.checkWinnability(this.turn,x,y)){
			//winning
			this.win = this.turn;
			console.log("Player "+this.turn+" wins");
			return ;
		}
		//take turn
		if(this.turn==1)
			this.turn=2;
		else
			this.turn=1;

		//wait for the next piece
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
