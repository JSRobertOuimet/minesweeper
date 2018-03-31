function Cell(i, j, s) {
  this.i = i;
  this.j = j;
  this.x = i * s;
  this.y = j * s;
  this.s = s;

  this.mine = false;
  this.minesCount = 0;
  this.revealed = false;
}

Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect( this.x, this.y, this.s, this.s );

  if(this.revealed) {
    if(this.mine) {
      fill(200);
      ellipse(
        this.x + this.s * 0.5,
        this.y + this.s * 0.5,
        this.s * 0.5,
        this.s * 0.5
      );
    }
    else {
      fill(200);
      rect( this.x, this.y, this.s, this.s );
      fill(0);

      if(this.minesCount > 0) {
        text(this.minesCount, this.x + this.s * 0.5, this.y + this.s - this.s / 3);
        textSize(18);
        textAlign(CENTER);
      }
    }
  }
}

Cell.prototype.countMines = function() {
  let total = 0;
  
  if(this.mine) {
    this.minesCount = -1;
    return;
  }

  for(let xOff = -1; xOff <= 1; xOff++) {
    for(let yOff = -1; yOff <= 1; yOff++) {
      let i = this.i + xOff;
      let j = this.j + yOff;

      if(i > -1 && i < cols && j > -1 && j < rows) {
        let neighbour = grid[i][j];

        if(neighbour.mine) {
          total++;
        }
      }
    }
  }

  this.minesCount = total;
}

Cell.prototype.contains = function(x, y) {
  return (
    x > this.x &&
    x < this.x + this.s &&
    y > this.y &&
    y < this.y + this.s
  );
}

Cell.prototype.reveal = function() {
  this.revealed = true;

  if(this.minesCount === 0) {
    this.floodFill();
  }
}

Cell.prototype.floodFill = function() {
  for(let xOff = -1; xOff <= 1; xOff++) {
    for(let yOff = -1; yOff <= 1; yOff++) {
      let i = this.i + xOff;
      let j = this.j + yOff;

      if(i > -1 && i < cols && j > -1 && j < rows) {
        let neighbour = grid[i][j];

        if(!neighbour.mine && !neighbour.revealed) {
          neighbour.reveal();
        }
      }
    }
  }
}