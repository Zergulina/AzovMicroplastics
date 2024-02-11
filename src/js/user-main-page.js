import { get, post } from "./http.js";
import * as webconf from "../../config/web.json" assert { type: "json" };

window.onload = (e) => {
    
};

async function getUserProjectsIds(email = sessionStorage.getItem("email")) {
    const response = await get(webconf.flaskUri, {
        "type": "getProjects",
        "email": email
    }).then(
        data => { console.log(`Ответ на запрос проектов [${email}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе проектов [${email}]: ` + data); return false; }
    );

    const projectsIds = JSON.parse(response);

    return projectsIds;
}

function doesUserHaveProjectAccess(id, email = sessionStorage.getItem("email")) {
    get(webconf.flaskUri, {
        "type": "userHasAccessToProject",
        "email": email,
        "projectId": id
    }).then(
        data => { console.log(`Ответ на запрос доступа к проекту [${email}, ${id}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе доступа к проекту [${email}, ${id}]: ` + data); return false; }
    );
}

function selectProject(id) {
    sessionStorage.setItem("selectedProjectId", id);
}

function openProject(id) {
    if (doesUserHaveProjectAccess(id)) {
        selectProject(id);
        window.open("../html/project.html", "_self");
    }
}