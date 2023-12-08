// Função para calcular a diferença entre as datas
function getTimeRemaining(endtime) {
    const total = Date.parse(endtime) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

// Função para exibir a contagem regressiva
function initializeClock(endtime) {
    const regressiva = document.getElementById('regressiva');
    const progressBar = document.getElementById('progress');
    const progressBarContainer = document.getElementById('progress-bar');

    function updateClock() {
        const t = getTimeRemaining(endtime);

        regressiva.innerHTML = `${t.days}d ${t.hours}h ${t.minutes}m ${t.seconds}s`;

        const totalTime = Date.parse(endtime) - Date.parse(dataDeInicioDoProgresso);
        const elapsedTime = totalTime - t.total;
        const percentage = (elapsedTime / totalTime) * 100;

        progressBar.style.width = `${percentage}%`;

        if (t.total <= 0) {
            clearInterval(timeinterval);
            progressBar.style.width = '100%';
        }
    }

    updateClock(); // Chama a função uma vez para evitar atrasos na exibição

    const timeinterval = setInterval(updateClock, 1000);
}

const dataDeInicioDoProgresso = new Date("Oct 1, " + new Date().getFullYear() + " 00:00:00 GMT");
// Define a data de término para o Natal deste ano
const deadline = new Date("December 25, " + new Date().getFullYear() + " 00:00:00 GMT");

// Inicia a contagem regressiva
initializeClock(deadline);