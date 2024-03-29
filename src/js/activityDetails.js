import ActivityDetails from "./activityDetails.mjs";
import { base64ToJson, getParams, renderHeaderFooter } from "./utils";

renderHeaderFooter()

let data = getParams("data")
let parent = document.querySelector(".main_container")
let details = new ActivityDetails(data, parent)
details.init()