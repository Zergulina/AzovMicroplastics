// Регистрация
document.getElementById("reg-btn").addEventListener("click", (e) => {
    e.preventDefault();
    onRegSubmit();
    return false;
});

function onRegSubmit() {
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var password_rep = document.getElementById("password-rep").value;
    
    if (password == password_rep && isEmailAvailable(email)) {
        registerAccount(email, password);
        sessionStorage.setItem("user_email", email);
        window.open("../html/project.html", "_self");
    } else {
        alert("Введенные пароли не совпадают или пользователь с этой почтой уже существует");
    }
}

// TODO:
//
// Проверка свободной почты
function isEmailAvailable(email) {
    return true;
}

// TODO:
//
// Регистрация нового аккаунта
function registerAccount(email, password) {

}