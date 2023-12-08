document.addEventListener("DOMContentLoaded", function() {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
        document.getElementById("username_display").innerText = userData.username;
        document.getElementById("email_display").innerText = userData.email;
        document.getElementById("password_display").innerText = userData.password;
    }
});