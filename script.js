// TO DO: onpress draw instead of just hovering

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
    app.showColor();
    app.clearBtn.addEventListener('click', app.reloadGrid);
    app.defaultBtn.addEventListener('click', app.updateMode);
    app.eraserBtn.addEventListener('click', app.updateMode);
    app.rainbowBtn.addEventListener('click', app.updateMode);
    app.sizeDragger.addEventListener('input', app.updateSize);
    app.colorInput.addEventListener('input', app.changeColor);
}

app.reloadGrid = function() {
    grid.innerHTML = ''
    app.createGrid();
    // once board is clear, still display current color in picker
    app.changeColor();
    app.showColor();
}

app.createRandomColor = function(){
    let randomColor = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    return randomColor;
}

app.updateMode = function(e){
    app.mode = e.target.textContent;
    if (app.mode === 'Eraser'){
        app.penColor = '#FFF';
    // if back to default mode, then apply color currently in color input selector
    } else if (app.mode === 'Default Mode'){
        app.changeColor();
    }
    app.showColor();
}

app.updateSize = function(e){
    app.gridSize = app.sizeDragger.value;
    app.sizeDisplay.textContent = `${app.gridSize} x ${app.gridSize}`;
    app.reloadGrid();
}

app.showColor = function() {
    gridItems = document.querySelectorAll('.gridItem');
    gridItems.forEach(item => item.addEventListener('mouseover', function(e){
        if (app.mode === 'Rainbow Mode'){
            app.penColor = app.createRandomColor();
        }
        item.style.backgroundColor = app.penColor;
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
}

app.init();