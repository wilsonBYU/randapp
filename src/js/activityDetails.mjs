import { base64ToJson, getLocalStorage, jsonToBase64, setLocalStorage } from "./utils"

const options = () => {
  return `
    <section class="main_actions" style="--justify-content: start">
      <a href="/" class="btn fw btn-blue">Home</a>
      <a href="/my_activities/index.html" class="btn fw btn-aqua">My activities</a>
      <a class="btn fw btn-red delete">Delete</a>
      <a class="btn fw btn-green save">Save</a>
    </section>
  `
}

const activityDetailsContent = (activity) => {
  return `
  <section class="main-example_activity">
    <h2>${activity.activity}</h2>
    <div class="picture_container">
      <picture>
        <img src="${activity.image.src.full}" alt="Unsplash.com - ${activity.image.alt_description}">
      </picture>
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
  }

  init() {
    this.parentElement.insertAdjacentHTML("afterbegin", options())
    let renderData = activityDetailsContent(this.dataJson)
    this.parentElement.insertAdjacentHTML("beforeend", renderData)
    document.querySelector("#participants").addEventListener("change", (e) => this.handleParticipants(e))
    document.querySelector("#date").addEventListener("change", (e) => this.handleDate(e))
    document.querySelector("#completed").addEventListener("change", (e) => this.handleCompleted(e))
    document.querySelector("#inProgress").addEventListener("change", (e) => this.handleInProgress(e))
    document.querySelector(".delete").addEventListener("click", (e) => this.delete())
    document.querySelector(".save").addEventListener("click", (e) => this.save())
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
  }

  delete() {
    const storageData = getLocalStorage("activities") || []
    const newData = storageData.filter(item => item !== this.data)
    localStorage.setItem("activities", JSON.stringify(newData))
    window.location.href = "/my_activities/index.html"
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