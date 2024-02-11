import { get, post } from "./http.js";
import * as webconf from "../../config/web.json" assert { type: "json" };

window.onload = (e) => {
    
};

async function getDataset(workId) {
    const response = await get(webconf.flaskUri, {
        "type": "getDataset",
        "projectId": workId
    }).then(
        data => { console.log(`Ответ на запрос датасета [${workId}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе датасета [${workId}]: ` + data); return false; }
    );

    const picsIds = JSON.parse(response);

    return picsIds;
}

async function getDatasetImage(picId) {
    const response = await get(webconf.flaskUri, {
        "type": "getDatasetPic",
        "picId": picId
    }).then(
        data => { console.log(`Ответ на запрос изображения датасета [${picId}]: ` + data); return true; },
        data => { console.log(`Отказано в запросе изображения датасета [${picId}]: ` + data); return false; }
    );

    const img = JSON.parse(response);

    return img;
}
