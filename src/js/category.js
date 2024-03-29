import Category from "./category.mjs";
import ExternalServices from "./services.mjs";
import { getParams, renderHeaderFooter } from "./utils";

renderHeaderFooter()

const dataSource = new ExternalServices()
const category = getParams("category")
const parent = document.querySelector(".main_container")

const activities = new Category(dataSource, category, parent)

activities.init()