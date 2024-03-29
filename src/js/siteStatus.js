import { getLocalStorage, renderHeaderFooter } from "./utils";

renderHeaderFooter()

const boredApi = Boolean(getLocalStorage("boredApi") === true)
const unsplashApi = Boolean(getLocalStorage("unsplashApi") === true)

const bored = document.querySelector(".boredApi")
boredApi ? bored.classList.add("connected") : bored.classList.add("disconnected")
bored.innerHTML = boredApi ? `<i class="fas fa-check"></i> Connected` : `<i class="fas fa-exclamation-triangle"></i> Not connected`

const unsplash = document.querySelector(".unsplashApi")
unsplashApi ? unsplash.classList.add("connected") : unsplash.classList.add("disconnected")
unsplash.innerHTML = unsplashApi ? `<i class="fas fa-check" ></i> Connected` : `<i class="fas fa-exclamation-triangle"></i> Not connected`