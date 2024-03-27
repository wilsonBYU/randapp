import MyActivities from "./myActivities.mjs";
import { filterActivities, getLocalStorage, getParams, renderHeaderFooter } from "./utils";

renderHeaderFooter()

const list = getLocalStorage("activities")
const parent = document.querySelector(".main_container")

const activities = new MyActivities(list, parent)
activities.init()
