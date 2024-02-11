import { get, post } from "./http.js";
import * as webconf from "../../config/web.json" assert { type: "json" };

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
    
    if (password !== password_rep) {
        alert("Введенные пароли должны совпадать.");
        return;
    } 
    if (!isEmailAvailable(email)) {
        alert("Пользователь с этой почтой уже существует.");
        return;
    }
    if (!registerAccount(email, password)) {
        alert("Возникла ошибка при создании аккаунта. Попробуйте позже.");
        return;
    }

    sessionStorage.setItem("user_email", email);
    window.open("../html/user-main-page.html", "_self");
}

// TODO:
//
// Проверка свободной почты
function isEmailAvailable(email) {
    get(webconf.flaskUri, {
        "type": "emailCheck",
        "email": email
    }).then(
        data => { console.log(`Ответ на запрос проверки для почты [${email}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе проверки для почты [${email}]: ` + data); return false; }
    );
}

// TODO:
//
// Регистрация нового аккаунта
function registerAccount(email, password) {
    post(webconf.flaskUri, {
        "type": "createAccount",
        "email": email,
        "password": password
    }).then(
        data => { console.log(`Ответ на запрос создания аккаунта [${email}, ${password}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе создания аккаунта [${email}, ${password}]: ` + data); return false; }
    );
}