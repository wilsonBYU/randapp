import { base64ToJson, getLocalStorage, jsonToBase64 } from "./utils"
import Loader from "./loader.mjs"
import Alert from "./alert.mjs"

const options = () => {
  return `
    <section class="main_actions" style="--justify-content: start">
      <a href="/randapp/" class="btn fw btn-blue"><i class="fas fa-home"></i> Home</a>
      <a href="/randapp/my_activities/" class="btn fw btn-aqua"><i class="fas fa-tasks"></i> My activities</a>
      <a class="btn fw btn-red delete"><i class="fas fa-trash-alt"></i> Delete</a>
      <a class="btn fw btn-green save"><i class="fas fa-save"></i> Save</a>
    </section>
  `
}

const activityDetailsContent = (activity) => {
  return `
  <section class="main-example_activity loading">
    <h2>${activity.activity}</h2>
    <div class="picture_container">
        <img class="img-loading" src="${activity.image.src.full}" alt="Unsplash.com - ${activity.image.alt_description}">
    </div>
    <p>
      <span>Accesibility: ${activity.accessibility}</span> |
      <span>Type: <a href="#">${activity.type}</a></span> |
      <sopan>Price: ${activity.price}</span>
    </p> <p>
      <span>Participants: <input id="participants" type="number" value="${activity.participants}"/></span> |
      <span>Date: <input id="date" type="date" value="${activity.date}"></span>
      <span>Completed: <input id="completed" type="checkbox" ${activity.completed ? "checked" : ""}></span>
      <span>In Progress: <input id="inProgress" type="checkbox" ${activity.inProgress ? "checked" : ""}></span>
    </p>
  </section>`
}

export default class ActivityDetails {
  constructor(data, parentElement) {
    this.data = data
    this.dataJson = base64ToJson(this.data)
    this.parentElement = parentElement
    this.loader = new Loader(parentElement)
    this.alert = new Alert()
  }

  init() {
    this.parentElement.insertAdjacentHTML("afterbegin", options())
    this.loader.show()
    this.alert.init()
    this.renderActivity()
    this.handleFormData()
    this.handleLoad()
  }

  save() {
    let storageData = getLocalStorage("activities") || []
    const itemIndex = storageData.indexOf(this.data)
    const newItem = jsonToBase64(this.dataJson)
    if (itemIndex >= 0) {
      const cleanedData = storageData.filter(item => item !== this.data)
      storageData = [...cleanedData, newItem]
      localStorage.setItem("activities", JSON.stringify(storageData))
    }
    this.alert.renderAlert({ title: "Data saved!", body: "The activity data has been saved successfuly!", type: "success" })
  }

  delete() {
    const storageData = getLocalStorage("activities") || []
    const newData = storageData.filter(item => item !== this.data)
    localStorage.setItem("activities", JSON.stringify(newData))
    window.location.href = "/randapp/my_activities/"
  }

  renderActivity() {
    let renderData = activityDetailsContent(this.dataJson)
    this.parentElement.insertAdjacentHTML("beforeend", renderData)
  }

  handleLoad() {
    const imageToLoad = document.querySelector(".img-loading")
    const parentLoader = document.querySelector(".main-example_activity")
    this.loader.removeOnImageLoad(imageToLoad, parentLoader, "loading")
  }

  handleFormData() {
    document.querySelector("#participants").addEventListener("change", (e) => this.handleParticipants(e))
    document.querySelector("#date").addEventListener("change", (e) => this.handleDate(e))
    document.querySelector("#completed").addEventListener("change", (e) => this.handleCompleted(e))
    document.querySelector("#inProgress").addEventListener("change", (e) => this.handleInProgress(e))
    document.querySelector(".delete").addEventListener("click", (e) => this.delete())
    document.querySelector(".save").addEventListener("click", (e) => this.save())
  }

  handleDate(e) {
    this.dataJson.date = e.target.value
  }

  handleParticipants(e) {
    this.dataJson.participants = e.target.value
  }

  handleCompleted(e) {
    this.dataJson.completed = e.target.checked
    this.dataJson.inProgress = !e.target.checked
  }

  handleInProgress(e) {
    this.dataJson.inProgress = e.target.checked
    this.dataJson.completed = !e.target.checked
  }

}