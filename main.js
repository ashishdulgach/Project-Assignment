const start = document.querySelector('.start');
const stop = document.querySelector('.stop');
const randomize = document.querySelector('.randomize');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let stopper = 0;

const resolution = 20;
canvas.width = 1000;
canvas.height = 800;

const COLS = canvas.width / resolution;
const ROWS = canvas.height / resolution;

function buildGrid() {
    return new Array(COLS).fill(null)
    .map(()=> new Array(ROWS).fill(null)
    .map(()=> Math.floor(Math.random()*2)));
}

let grid = buildGrid();


function update(){
  if(stopper === 0){
    grid= nextGen(grid);
    render(grid);
    requestAnimationFrame(update);
  }
} 

function nextGen(grid){
   const nextGen = grid.map( arr => [...arr]);
   
   for(let col = 0; col < grid.length; col++){
    for(let row = 0; row < grid[col].length; row++){
        const cell= grid[col][row];
        let numNeighbour = 0;
        for(let i= -1; i < 2 ; i++){
            for(let j= -1 ; j < 2 ; j++){
               if(i === 0 && j===0){
                   continue; 
               }
               const x_cell = col+i;
               const y_cell = row+j;
               if(x_cell >=0 && y_cell >0 &&  x_cell<COLS && y_cell < ROWS){
                  let currentNeighbour = grid[col+i][row+j];
                  numNeighbour += currentNeighbour;
             

               }
            }
            
        }

        if(cell === 1 && numNeighbour < 2){
          nextGen[col][row] = 0;  
        }else if(cell === 1 && numNeighbour > 3){
          nextGen[col][row] = 0;
        }else if(cell === 0 && numNeighbour === 3){
          nextGen[col][row] = 1;
        }


    }
  }
  return nextGen;

}

function render(grid) {
    for(let col = 0; col < grid.length; col++){
        for(let row = 0; row < grid[col].length; row++){
            const cell= grid[col][row];

            ctx.beginPath();
            ctx.rect(col * resolution , row * resolution, resolution , resolution );
            ctx.fillStyle = cell ? 'black' :'white';
            ctx.fill();
            ctx.stroke();
        }
    }
}

start.addEventListener('click'  , () => {
  stopper =0;
  requestAnimationFrame(update);
})

randomize.addEventListener('click' , () => {
   stopper = 1;
   grid = buildGrid();
   render(grid);
})

stop.addEventListener( 'click' , () => {
  stopper = 1;
})

