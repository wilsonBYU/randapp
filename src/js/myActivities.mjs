import { base64ToJson, filterActivities, getParams } from "./utils";

const sortMenu = () => {
  return `
    <section>
      <label for="filter">
        Filter
        <select id="sort">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="notcompleted">Not completed</option>
          <option value="inProgress">In progress</option>
          <option value="notinprogress">Not in progress</option>
          <option value="date">Date asigned</option>
          <option value="notdate">Not date asigned</option>
        </select>
      </label>
    </section>  
  `
}

const activityItem = (activity) => {
  const obj = base64ToJson(activity)
  return `
    <a href="/activity_details/index.html?data=${activity}">
      <li class="btn btn-orange activity-list_item">
        <div class="activity-list_item-container">
          <div>
            <p class="mp-0">${obj.activity}</p>
            <sub>Completed: ${obj.completed ? "Yes" : "No"} | In Progress: ${obj.inProgress ? "Yes" : "No"} | Date: ${obj.date ? obj.date : "Not Set"}</sub>
          </div>
          <img src="${obj.image.src.thumb}" />
        </div>
      </li>
    </a>
  `
}

const activityList = (activities) => `<ul class="myActivityList fw">${activities.map(activityItem).join("")}</ul>`;

export default class MyActivities {
  constructor(activityList, parentElement) {
    this.activityList = activityList
    this.parentElement = parentElement
  }

  init() {
    const filter = getParams("filter")
    this.renderSortMenu()
    this.renderActivities(filter)
    filter ? this.setSortMenuValue(filter) : null

  }

  renderSortMenu() {
    this.parentElement.insertAdjacentHTML("afterbegin", sortMenu())
    document.querySelector("#sort").addEventListener("change", e => {
      this.renderActivities(e.target.value)
      const children = document.querySelector(".myActivityList")
      this.parentElement.removeChild(children)
    })
  }

  setSortMenuValue(value) {
    document.querySelector("#sort").value = value
  }

  renderActivities(sort = null) {
    const list = sort && sort !== "all" ? filterActivities(this.activityList, sort) : this.activityList
    const renderedList = activityList(list)
    if (this.activityList.length > 0) {
      this.parentElement.insertAdjacentHTML("beforeend", renderedList)
    } else {
      this.parentElement.insertAdjacentHTML("afterbegin", "<h2>You have not added any activity yet. Click</h2><a href='/' class='btn btn-aqua'>Home<a><h2>for more options</h2>")
    }
  }
}