function aparecer() {

    const pontosFinais = document.querySelector('#pontosFinaiss');
    const pontos = document.querySelector('.pontos');
    const pontosConteudo = document.querySelector('.pontos-conteudo');
    const pontosImg = document.querySelector('.pontos-img');

    const valorRecuperado = localStorage.getItem('pontosResgatados');

    let spann = document.createElement("span")

    if (pontosConteudo.style.display === "block") {
        pontosConteudo.style.display = "none"
        spann.textContent = valorRecuperado
        pontosFinais.appendChild(spann)
    } else {
        pontosConteudo.style.display = "block" 
        spann.textContent = valorRecuperado
        pontosFinais.appendChild(spann)
        
        // pontosFinais.innerHTML = localStorage.getItem('pontosResgatados')
        // pontosFinais.textContent = valorRecuperado
    }    
    // pontosFinais = document.write(valorRecuperado);
    // document.write

   
}