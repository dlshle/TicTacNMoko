function game(w,h,winCount){
	//0 nothing, 1 p1, 2 p2
	this.grid = [[]];
	
	this.totalPieces = w*h;
	
	this.winCount = winCount;

	this.grid.length = w;

	for(var i=0;i<w;i++)
		this.grid[i].length = h;

	for(var i=0;i<w;i++){
		for(var j=0;j<h;j++)
			this.grid[i][j]=0;
	}

	this.turn = 1;	

	this.place = function(x,y){
		//validate location
		if(!this.isValidLocation(x,y)){
			console.log("invalid location");
			//try again
		}
		if(this.grid[x][y]!=0){
			console.log("already has a piece on "+x+","+y);
			//try again
		}
		//take turn
		if(this.turn==1)
			this.turn=2;
		else
			this.turn=1;
		//place on the grid
		grid[x][y]=this.turn;
		//check piece connectivity
		if(this.checkPiece(this.turn,x,y,1)){
			//winning
		}
	}

	this.isValidLocation = function(x,y){
		return x>-1&&x<w&&y>-1&&y<h;
	}

	this.checkPiece(p,x,y,c){
		if(this.isValidLocation(x,y))
			return false;
		if(this.grid[x,y]!=p)
			return false;
		if(counter==this.winCount)
			return true;
		return checkPiece(p,x-1,y-1,c+1)||checkPiece(p,x,y-1,c+1)||checkPiece(p,x+1,y-1,c+1)||checkPiece(p,x-1,y,c+1)||checkPiece(p,x+1,y,c+1)||checkPiece(p,x-1,y+1,c+1)||checkPiece(p,x,y+1,c+1)||checkPiece(p,x+1,y+1,c+1);
	}

	this.drawPiece = function(p,x,y){
		//draw a piece according to player turn.	
	}


}
