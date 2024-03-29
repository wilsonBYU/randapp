import { getLocalStorage, renderHeaderFooter } from "./utils";

renderHeaderFooter()

const boredApi = Boolean(getLocalStorage("boredApi") === true)
const unsplashApi = Boolean(getLocalStorage("unsplashApi") === true)

document.querySelector(".boredApi").innerHTML = boredApi ? `<i class="fas fa-check"></i> Connected` : `<i class="fas fa-exclamation-triangle"></i Not connected`
document.querySelector(".unsplashApi").innerHTML = unsplashApi ? `<i class="fas fa-check" ></i> Connected` : `<i class="fas fa-exclamation-triangle"></i> Not connected`