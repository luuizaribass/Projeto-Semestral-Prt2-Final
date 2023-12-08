// // Função de redirecionamento
// function redirecionarSeLogado() {
//     // Suponha que você tenha alguma lógica para verificar se o usuário está logado
//     var usuarioLogado = true; // Substitua isso pela sua lógica real

//     if (usuarioLogado) {
//         // Se o usuário estiver logado, atualize o link do menu para "usuarioemuas.html"
//         var linkUsuario = document.getElementById('linkUsuario');
//         if (linkUsuario) {
//             linkUsuario.href = 'usuarioemaus.html';
//         }
//     }
// }

const login = document.querySelector('.login')

login.addEventListener('click', function () {
    if (localStorage.getItem("userData")) {
        window.location.href = "usuarioemaus.html";
        login.setAttribute(href, "usuarioemaus.html")
    } else {
        window.location.href = "loginemaus.html"
        login.setAttribute(href, "loginemaus.html")
    }
})

function vai(){
    if (localStorage.getItem("userData")) {
        window.location.href = "usuarioemaus.html";
        login.setAttribute(href, "usuarioemaus.html")
    } else {
        window.location.href = "loginemaus.html"
        login.setAttribute(href, "loginemaus.html")
    }
}