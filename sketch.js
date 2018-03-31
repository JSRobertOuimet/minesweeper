const s = 40;
const cr = 10;
const width = s * cr + 1;
const height = s * cr + 1;
const totalMines = 20;
let cols, rows, grid;

gameOver = () => {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
    }
  }
}

mousePressed = () => {
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      if(grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if(grid[i][j].mine) {
          gameOver();
        }
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

setup = () => {
  let container = document.querySelector('.container');
  let canvas = createCanvas(width, height);
  let options = [];

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
  
  canvas.parent(container);
}

draw = () => {
  background(255);
  for(let i = 0; i < cols; i++) {
    for(let j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}