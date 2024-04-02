const loaderAnimation = () => {
  return `
    <div class="loader-animation">
      <i class="fas fa-spinner"></i>
    </div>
  `
}

export default class Loader {
  constructor(container) {
    this.container = container
  }

  show() {
    this.container.insertAdjacentHTML("beforeend", loaderAnimation())
  }

  removeOnImageLoad(image, parent, classToggle) {
    if (image) {
      image.addEventListener("load", (e) => {
        parent.classList.toggle(classToggle)
        this.remove()
      })
    }
  }

  removeOnFetch(parent, classToggle) {
    this.remove()
    parent.classList.toggle(classToggle)
  }

  remove() {
    const loader = document.querySelector(".loader-animation")
    this.container.removeChild(loader)
  }

}