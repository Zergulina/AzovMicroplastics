import { get, post } from "./http.js";
import * as webconf from "../../config/web.json" assert { type: "json" };

window.onload = (e) => {
    
};

async function getAvailableProjectWorks(id) {
    const response = await get(webconf.flaskUri, {
        "type": "getWorks",
        "projectId": id
    }).then(
        data => { console.log(`Ответ на запрос работ [${id}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе работ [${id}]: ` + data); return false; }
    );

    const workIds = JSON.parse(response);

    return workIds;
}

function doesUserHaveWorkAccess(id, email = sessionStorage.getItem("email")) {
    get(webconf.flaskUri, {
        "type": "userHasAccessToWork",
        "email": email,
        "projectId": id
    }).then(
        data => { console.log(`Ответ на запрос доступа к работе [${email}, ${id}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе доступа к работе [${email}, ${id}]: ` + data); return false; }
    );
}

function selectWork(id) {
    sessionStorage.setItem("selectedWorkId", id);
}

function openWork(id) {
    if (doesUserHaveWorkAccess(id)) {
        selectWork(id);
        window.open("../html/work.html", "_self");
    }
}