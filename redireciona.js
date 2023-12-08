// Função de redirecionamento
function redirecionarSeLogado() {
    // Suponha que você tenha alguma lógica para verificar se o usuário está logado
    var usuarioLogado = true; // Substitua isso pela sua lógica real

    if (usuarioLogado) {
        // Se o usuário estiver logado, atualize o link do menu para "usuarioemuas.html"
        var linkUsuario = document.getElementById('linkUsuario');
        if (linkUsuario) {
            linkUsuario.href = 'usuarioemaus.html';
        }
    }
}
