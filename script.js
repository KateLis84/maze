const player = document.getElementById('player');
const goal = document.getElementById('goal');
const message = document.getElementById('message');
const maze = document.getElementById('maze');
const container = document.querySelector('.container');

let playerPosition = { x: 0, y: 0 };
const gridSize = 40;
const goalPosition = { x: 11, y: 11 }; // Позиція мети

// Лабіринт
const mazeMap = [
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0],
];

// Генерація лабіринту
function generateMaze() {
    maze.querySelectorAll('.wall').forEach(wall => wall.remove());

    mazeMap.forEach((row, y) => {
        row.forEach((cell, x) => {
            if (cell === 0) {
                const wall = document.createElement('div');
                wall.classList.add('wall');
                wall.style.width = `${gridSize}px`;
                wall.style.height = `${gridSize}px`;
                wall.style.position = 'absolute';
                wall.style.top = `${y * gridSize}px`;
                wall.style.left = `${x * gridSize}px`;
                wall.style.backgroundColor = '#333';
                maze.appendChild(wall);
            }
        });
    });
}

// Оновлення позиції гравця
function updatePlayerPosition() {
    player.style.top = `${playerPosition.y * gridSize}px`;
    player.style.left = `${playerPosition.x * gridSize}px`;

    if (
        playerPosition.x === goalPosition.x &&
        playerPosition.y === goalPosition.y
    ) {
        endGame();
    }
}

// Завершення гри
function endGame() {
    maze.style.display = 'none';
    message.style.display = 'none';

    const resultImage = document.createElement('img');
    resultImage.src = 'https://i.ibb.co/7nh9rNg/image.png';
    resultImage.alt = 'Congratulations';
    resultImage.style.maxWidth = '100%';
    resultImage.style.marginTop = '20px';

    const refreshButton = document.createElement('button');
    refreshButton.textContent = 'Refresh';
    refreshButton.style.marginTop = '20px';
    refreshButton.style.padding = '10px 20px';
    refreshButton.style.fontSize = '1rem';
    refreshButton.style.backgroundColor = '#d63384';
    refreshButton.style.color = '#fff';
    refreshButton.style.border = 'none';
    refreshButton.style.borderRadius = '5px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.addEventListener('click', () => {
        location.reload();
    });

    container.appendChild(resultImage);
    container.appendChild(refreshButton);
}

// Перевірка, чи можна рухатись
function canMove(x, y) {
    return (
        x >= 0 &&
        y >= 0 &&
        x < mazeMap[0].length &&
        y < mazeMap.length &&
        mazeMap[y][x] === 1
    );
}

// Управління клавіатурою
document.addEventListener('keydown', (event) => {
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (event.key === 'ArrowUp') newY--;
    if (event.key === 'ArrowDown') newY++;
    if (event.key === 'ArrowLeft') newX--;
    if (event.key === 'ArrowRight') newX++;

    if (canMove(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        updatePlayerPosition();
    }
});

// Управління свайпами
let startX = 0;
let startY = 0;

maze.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

maze.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) newX++; // Свайп вправо
        else newX--; // Свайп вліво
    } else {
        if (diffY > 0) newY++; // Свайп вниз
        else newY--; // Свайп вгору
    }

    if (canMove(newX, newY)) {
        playerPosition.x = newX;
        playerPosition.y = newY;
        updatePlayerPosition();
    }
});

// Ініціалізація лабіринту
generateMaze();
updatePlayerPosition();
