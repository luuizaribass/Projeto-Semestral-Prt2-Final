let indiceImagemAtual = 0;
        const imagensCarrossel = document.querySelectorAll('.imagem-carrossel');

        function mudarImagem(n) {
            indiceImagemAtual += n;

            if (indiceImagemAtual < 0) {
                indiceImagemAtual = imagensCarrossel.length - 1;
            } else if (indiceImagemAtual >= imagensCarrossel.length) {
                indiceImagemAtual = 0;
            }

            imagensCarrossel.forEach((imagem) => {
                imagem.classList.remove('ativo');
            });

            imagensCarrossel[indiceImagemAtual].classList.add('ativo');
        }

        setInterval(() => {
            mudarImagem(1);
        }, 6000);