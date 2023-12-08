// const buttonPause = document.querySelector(".btn-pause");
// let isPaused = false;
// buttonPause.addEventListener("click", () => {
//     if (isPaused) {
//         isPaused = false;
//         buttonPause.innerText = "Pausar";
//         gameLoop();
//     } else {
//         isPaused = true;
//         buttonPause.innerText = "Retomar";
//         clearInterval(loopId);
//     }
// });
// Caminhos das imagens dos alimentos
// foodImages[0].src = "img/jaqmolerose2.png";
// foodImages[1].src = "img/molebege1.png";
// foodImages[2].src = "img/trocacamis6.png";

// const snakeHeadImage = new Image();
// snakeHeadImage.src = "img/biblia1.png";

// const snakeBodyImage = new Image();
// snakeBodyImage.src = "img/trocacamis6.png";

// const snakeBodyImage1 = new Image();
// snakeBodyImage1.src = "img/camisleao2.png";

// Adicione esta parte do código para controlar o tempo de espera


const LAST_PLAY_KEY = 'lastPlayTime';
const WAIT_TIME_IN_HOURS = 24;

function canPlayAgain() {
    const lastPlayTime = localStorage.getItem(LAST_PLAY_KEY);

    if (!lastPlayTime) {
        return true;
    }

    const currentTime = new Date().getTime();
    const elapsedTimeInHours = (currentTime - parseInt(lastPlayTime)) / (1000 * 60 * 60);

    return elapsedTimeInHours >= WAIT_TIME_IN_HOURS;
}

function setLastPlayTime() {
    const currentTime = new Date().getTime();
    localStorage.setItem(LAST_PLAY_KEY, currentTime.toString());
}


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");



const score = document.querySelector(".score--value");
const finalScore = document.querySelector(".final-score > span");
const menu = document.querySelector(".menu-screen");
const buttonPlay = document.querySelector(".btn-play");

const audio = new Audio("../assets/audio.mp3");

const size = 30;

const initialPosition = { x: 270, y: 240 };

let snake = [{ x: 270, y: 240, lastFood: null }];

const incrementScore = () => {
    score.innerText = +score.innerText + 2;
};

const randomNumber = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const randomPosition = () => {
    const number = randomNumber(0, canvas.width - size);
    return Math.round(number / 30) * 30;
};

const foodImages = [
    new Image(),
    new Image(),
    new Image()
];

// Caminhos das imagens dos alimentos
foodImages[0].src = "img/food.png";
foodImages[1].src = "img/food.png";
foodImages[2].src = "img/food.png";


const snakeHeadImage = new Image();
snakeHeadImage.src = "img/pacman.png";

const snakeBodyImage = new Image();
snakeBodyImage.src = "img/food.png";

const snakeBodyImage1 = new Image();
snakeBodyImage1.src = "img/food.png";


const food = {
    x: randomPosition(),
    y: randomPosition(),
    imageIndex: Math.floor(Math.random() * foodImages.length)
};

let direction, loopId, isGameOver = false;

const drawFood = () => {
    const { x, y, imageIndex } = food;
    ctx.drawImage(foodImages[imageIndex], x, y, size, size);
};

const drawSnake = () => {
    snake.forEach((segment, index) => {
        if (index === snake.length - 1) {
            ctx.drawImage(snakeHeadImage, segment.x, segment.y, size, size);
        } else {
            // Desenha a imagem do último alimento consumido pelo segmento
            if (segment.lastFood) {
                // Use a imagem do último alimento consumido
                ctx.drawImage(foodImages[segment.lastFood.imageIndex], segment.x, segment.y, size, size);
            } else {
                // Use a imagem padrão do corpo da cobra (ou seja, o corpo sem alimento)
                ctx.drawImage(snakeBodyImage, segment.x, segment.y, size, size);
            }
        }
    });
};



const moveSnake = () => {
    if (!direction || isGameOver) return;

    const head = snake[snake.length - 1];

    if (direction === "right") {
        snake.push({ x: head.x + size, y: head.y });
    }

    if (direction === "left") {
        snake.push({ x: head.x - size, y: head.y });
    }

    if (direction === "down") {
        snake.push({ x: head.x, y: head.y + size });
    }

    if (direction === "up") {
        snake.push({ x: head.x, y: head.y - size });
    }

    snake.shift();
};

const drawGrid = () => {
    ctx.lineWidth = 1;
    ctx.strokeStyle = "#191919";

    for (let i = 30; i < canvas.width; i += 30) {
        ctx.beginPath();
        ctx.lineTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.lineTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
    }
};

const checkEat = () => {
    const head = snake[snake.length - 1];

    if (head.x === food.x && head.y === food.y) {
        incrementScore();
        head.lastFood = { ...food }; // Salva uma cópia do alimento consumido
        snake.push({ x: head.x, y: head.y, lastFood: null });
        audio.play();

        let x = randomPosition();
        let y = randomPosition();

        const newImageIndex = Math.floor(Math.random() * foodImages.length);

        while (snake.find((position) => position.x === x && position.y === y)) {
            x = randomPosition();
            y = randomPosition();
        }

        food.x = x;
        food.y = y;
        food.imageIndex = newImageIndex;
    }
};



const checkCollision = () => {
    const head = snake[snake.length - 1];
    const canvasLimit = canvas.width - size;
    const neckIndex = snake.length - 2;

    const wallCollision =
        head.x < 0 || head.x > canvasLimit || head.y < 0 || head.y > canvasLimit;

    const selfCollision = snake.find((position, index) => {
        return index < neckIndex && position.x === head.x && position.y === head.y;
    });

    if (wallCollision || selfCollision) {
        gameOver();
    }
};

const gameOver = () => {
    direction = undefined;
    isGameOver = true;

    menu.style.display = "flex";
    finalScore.innerText = score.innerText;
    canvas.style.filter = "blur(2px)";
};

const gameLoop = () => {
    clearInterval(loopId);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid();
    drawFood();
    moveSnake();
    drawSnake();
    checkEat();
    checkCollision();

    // Reduza o intervalo de tempo para aumentar a velocidade
    loopId = setTimeout(() => {
        gameLoop();
    }, 100); // Reduzi para 100 milissegundos, sinta-se à vontade para ajustar conforme necessário
};

gameLoop();

document.addEventListener("keydown", ({ key }) => {
    if (key === "ArrowRight" && direction !== "left") {
        direction = "right";
    }

    if (key === "ArrowLeft" && direction !== "right") {
        direction = "left";
    }

    if (key === "ArrowDown" && direction !== "up") {
        direction = "down";
    }

    if (key === "ArrowUp" && direction !== "down") {
        direction = "up";
    }
});

canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touchX = e.changedTouches[0].pageX;
    const touchY = e.changedTouches[0].pageY;
    const offsetX = touchX - canvas.getBoundingClientRect().left;
    const offsetY = touchY - canvas.getBoundingClientRect().top;

    const head = snake[snake.length - 1];

    const deltaX = offsetX - head.x;
    const deltaY = offsetY - head.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? "right" : "left";
    } else {
        direction = deltaY > 0 ? "down" : "up";
    }
});


function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({
        width: progressBarWidth
    }, timeleft == timetotal ? 0 : 1000, "linear");

    if (timeleft > 0) {
        setTimeout(function () {
            progress(timeleft - 1, timetotal, $element);
        }, 1000);
    }
};

function updateCountdownBar() {
    const countdownContainer = document.getElementById('countdown-container');
    const countdownBar = document.getElementById('countdown-bar');
    const progressBar = $('#progressBar');
    const playButton = document.querySelector('.btn-play');

    const updateInterval = 1000; // Atualiza a cada segundo
    const totalTime = 24 * 60 * 60 * 1000; // Ajustado para 24 horas em milissegundos

    let elapsedTime = 0;

    const update = () => {
        elapsedTime += updateInterval;

        const remainingTime = totalTime - elapsedTime;
        const percentage = (remainingTime / totalTime) * 100;

        progressBar.width(percentage + "%");

        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            countdownContainer.style.display = 'none';
            playButton.style.display = 'block';
        }
    };

    const countdownInterval = setInterval(update, updateInterval);
    update(); // Chama a função de atualização imediatamente

    countdownContainer.style.display = 'block';
    playButton.style.display = 'none';

    // Inicia a animação da barra de progresso
    progress(24 * 60 * 60, totalTime, countdownBar);
}

buttonPlay.addEventListener("click", () => {
    if (canPlayAgain()) {
        // Verifique se o jogo está no estado de game over
        if (isGameOver) {
            // Reinicialize as variáveis do jogo
            score.innerText = "00";
            menu.style.display = "none";
            canvas.style.filter = "none";
            snake = [initialPosition];
            direction = undefined;
            isGameOver = false;

            // Atualize o tempo do último jogo
            setLastPlayTime();

            // // Inicie o loop do jogo novamente
            // gameLoop();
        }
    } else {
        alert("Você só pode jogar novamente após 24 horas.");
    }
});


function resgatarPontos() {
    // Lógica para resgatar pontos (pode ser ajustada conforme necessário)
    const pontosResgatados = +score.innerText;
    // Obtém a pontuação atual do jogo
    localStorage.setItem('pontosResgatados', pontosResgatados);

    // const pontosFinais = document.getElementById('pontosFinais')
    //     pontosFinais.innerHTML=JSON.parse(localStorage.getItem('pontosResgatados'));

    // Zere o score
    score.innerText = "00";

    // Exiba a mensagem na mesma página
    const mensagemResgate = document.getElementById('mensagem-resgate');
    alert(`Você resgatou ${pontosResgatados} pontos na página de pontos!`);
    location.href = "index.html"
}

const buttonResgatarPontos = document.getElementById('buttonResgatarPontos');

buttonResgatarPontos.addEventListener('click', function(event){
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('userData'));

    if (user && user.username) {
        resgatarPontos();
    } else {
        alert('Você precisa estar logado para resgatar pontos!');
        // Redirecione para a página de login (substitua 'login.html' pelo caminho real da página de login)
        window.location.href = 'loginemaus.html';
    }
});




// // Recupere os pontos do localStorage
//  localStorage.setItem('pontosResgatados', JSON.stringify(pontosResgatados));