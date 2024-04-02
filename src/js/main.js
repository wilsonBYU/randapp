import HomeScreen from "./home.mjs";
import Loader from "./loader.mjs";
import ExternalServices from "./services.mjs";
import { renderHeaderFooter } from "./utils";

renderHeaderFooter()

const service = new ExternalServices()
const parentElement = document.querySelector(".main_container")

const main = new HomeScreen(service, parentElement)
main.renderMenu()
main.init()


document.querySelector(".feelLucky").addEventListener("click", async (e) => {
  main.feelLucky()
  main.init()
})

document.querySelector(".random").addEventListener("click", async (e) => {
  main.removeActivity()
  main.init()
})