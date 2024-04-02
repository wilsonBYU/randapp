const alertTemplate = ({ title, body, type }) => {
  return `
    <section class="alert show-alert ${type}">
      <div class="alert-text">
        <h3>${title}</h3>
        <p>${body}</p>
      </div>
      <div class="alert_actions">
        <button class="close-alert"><i class="fas fa-times"></i></button>
      </div>
    </section>
  `
}

export default class Alert {
  constructor() {
    this.container = document.querySelector("body")
    this.handleContainer()
  }

  init() {
    this.handleContainer()
  }

  renderAlert(data) {
    let alert = alertTemplate(data)
    document.querySelector(".alert-container").insertAdjacentHTML("beforeend", alert)
    this.removeAlertEventListener()
  }

  handleContainer() {
    const hasAlertContainer = document.querySelector(".alert-container")
    console.log(hasAlertContainer)
    hasAlertContainer ? null : this.addAlertContainer()
  }

  addAlertContainer() {
    this.container.insertAdjacentHTML("afterbegin", `<section class="alert-container"></section>`)
  }

  removeAlertEventListener() {
    document.querySelectorAll(".close-alert").forEach(element => {
      element.addEventListener("click", e => {
        const alert = e.target.closest(".alert")
        alert.classList.toggle("show-alert")
        alert.classList.add("hide-alert")
        e.target.closest(".alert").addEventListener("animationend", e => {
          e.target.remove()
        })
      })
    })
  }
}