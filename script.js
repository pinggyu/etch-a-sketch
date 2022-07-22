// TO DO: continuous rainbow mode, onpress draw instead of just hovering

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
    rainbowBtn: document.getElementById('rainbowBtn'),
    sizeDragger: document.getElementById('sizeDragger'),
    sizeDisplay: document.getElementById('sizeDisplay'),
    colorInput: document.getElementById('colorInput')
};

app.init = function() {
    app.createGrid();
    app.clearBtn.addEventListener('click', app.reloadGrid);
    app.defaultBtn.addEventListener('click', app.updateMode);
    app.eraserBtn.addEventListener('click', app.updateMode);
    app.rainbowBtn.addEventListener('click', app.updateMode);
    app.sizeDragger.addEventListener('input', app.updateSize);
    app.colorInput.addEventListener('input', app.changeColor);
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
    } else if (app.mode === 'Rainbow Mode'){
        app.createRandomColors();
    }
}

app.createRandomColors = function(){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    app.penColor = `#${randomColor}`;
}

app.updateSize = function(e){
    app.gridSize = app.sizeDragger.value;
    app.sizeDisplay.textContent = `${app.gridSize} x ${app.gridSize}`;
    app.reloadGrid();
}

app.showColor = function() {
    gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(item => item.addEventListener('mouseover', function(e){
        if (app.mode = 'default'){
            item.style.backgroundColor = app.penColor;
        }
    }));
};

app.changeColor = function(e){
    app.penColor = app.colorInput.value;
}

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