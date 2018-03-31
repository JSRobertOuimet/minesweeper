const s = 40;
const width = s * 10 + 1;
const height = s * 10 + 1;
const totalMines = 10;
let cols, rows, grid;

mousePressed = () => {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      if(grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
      }
    }
  }
}

make2DArr = (cols, rows) => {
  const arr = new Array(cols);
  
  for(let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  
  return arr;
}


// ====================
// P5 Stuff
// ====================

setup = () => {
  let options = [];

  createCanvas(width, height);
  
  cols = floor(width / s);
  rows = floor(height / s);
  grid = make2DArr(cols, rows);
  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, s);
    }
  }
  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }

  for(let n = 0; n < totalMines; n++) {
    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];

    options.splice(index, 1);
    grid[i][j].mine = true;
  }
  
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].countMines();
    }
  }
}

draw = () => {
  background(255);
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}