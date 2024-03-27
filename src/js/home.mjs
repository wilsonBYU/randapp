import { jsonToBase64, setLocalStorage } from "./utils"

const menuElements = () => {
  return `
  <section class="main_actions" style="--justify-content: space-between">
    <a href="/my_activities/index.html" class="btn fw btn-red">My activities</a>
    <a class="btn fw btn-orange random">Random activity</a>
    <a class="btn fw btn-blue feelLucky">I feel lucky</a>
    <a href="/my_activities/index.html?filter=completed" class="btn fw btn-green">Completed activities</a>
    <a href="/my_activities/index.html?filter=inProgress" class="btn fw btn-pink">In Progress</a>
    <a class="btn fw btn-aqua">Choose a category</a>
  </section>
  `
}

const exampleActivity = (activity) => {
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
      <span>Participants: ${activity.participants}</span> |
      <span>Price: ${activity.price}</span>
    </p>
    <button class="btn fw btn-orange addActivity">Add to my activities!</button>
  </section>`
}

export default class HomeScreen {
  constructor(dataSource, container) {
    this.dataSource = dataSource
    this.container = container
    this.activity = []
  }

  async init() {
    this.activity = await this.dataSource.getRandomActivity()
    this.renderActivity()
    document.querySelector(".addActivity").addEventListener("click", () => {
      this.goToActivity()
    })
  }

  async feelLucky() {
    this.activity = await this.dataSource.getRandomActivity()
    this.goToActivity()
  }

  goToActivity() {
    const activity64 = jsonToBase64(this.activity)
    setLocalStorage("activities", activity64)
    window.location.href = `/activity_details/index.html?data=${activity64}`
  }

  removeActivity() {
    const item = document.querySelector(".main-example_activity")
    this.container.removeChild(item)
  }

  renderMenu() {
    const menu = menuElements()
    this.container.insertAdjacentHTML("afterbegin", menu)
  }

  renderActivity() {
    const activityForm = exampleActivity(this.activity)
    this.container.insertAdjacentHTML("beforeend", activityForm)
  }
}