// TO DO: change grid size with the slider, change pen color with the color picker

// create namespace object with default values 
const app = {
    DEFAULT_GRID_SIZE: 16,
    DEFAULT_PEN_COLOR: '#000000',
    DEFAULT_MODE: 'Default Mode',
    gridSize: 16,
    penColor: '#000000',
    mode: 'Default Mode',
    grid: document.getElementById('grid'),
    clearBtn: document.getElementById('clearBtn'),
    eraserBtn: document.getElementById('eraserBtn'),
    defaultBtn: document.getElementById('defaultBtn'),
    rainbowBtn: document.getElementById('rainbowBtn')
};

app.init = function() {
    app.createGrid();
    app.clearBtn.addEventListener('click', app.reloadGrid);
    app.defaultBtn.addEventListener('click', app.updateMode);
    app.eraserBtn.addEventListener('click', app.updateMode);
    app.rainbowBtn.addEventListener('click', app.updateMode);
}

app.reloadGrid = function() {
    grid.innerHTML = ''
    app.createGrid();
}

app.updateMode = function(e){
    app.mode = e.target.textContent;
    if (app.mode === 'Eraser'){
        app.penColor = '#FFF';
    } else if (app.mode === 'Default Mode'){
        app.penColor = app.DEFAULT_PEN_COLOR;
    } 
}

app.showColor = function() {
    gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(item => item.addEventListener('mousedown', function(e){
        if (app.mode = 'default'){
            item.style.backgroundColor = app.penColor;
        }
    }));
};

app.createGrid = function(){
    const grid = document.getElementById('grid');
    grid.style.gridTemplateColumns = `repeat(${app.gridSize}, 1fr)`
    grid.style.gridTemplateRows = `repeat(${app.gridSize}, 1fr)`
    for(let i = 0 ; i < (app.gridSize * app.gridSize); i++){
        const gridItem = document.createElement('div');
        gridItem.classList.add('gridItem');
        grid.appendChild(gridItem);
    }
    app.showColor();
}

app.init();