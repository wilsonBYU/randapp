export function getParams(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function joinData(activity, photo) {
  const data = { ...activity }
  data["completed"] = false
  data["inProgress"] = false
  data["date"] = null
  data["image"] = {}
  data.image["id"] = photo.results[0].id
  data.image["alt_description"] = photo.results[0].alt_description
  data.image["src"] = {}
  data.image.src["full"] = photo.results[0].urls.full
  data.image.src["thumb"] = photo.results[0].urls.thumb
  data.image.src["small"] = photo.results[0].urls.small
  return data
}

export const jsonToBase64 = (object) => {
  const encoded = btoa(JSON.stringify(object))
  return encoded
}

export const base64ToJson = (string) => {
  const object = JSON.parse(atob(string))
  return object
}

export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key)
  return JSON.parse(data)
}

export const setLocalStorage = (key, data) => {
  const storedData = getLocalStorage(key) || []
  storedData.push(data)
  localStorage.setItem(key, JSON.stringify(storedData))
}

export const renderHeaderFooter = () => {
  document.querySelector(".navigation").innerHTML = header()
  document.querySelector(".footer").innerHTML = footer()
}

const header = () => {
  return `
    <h1><a href="/">Randapp!</a></h1>
    <ul class="navigation_link-list">
      <li class="navigation_link-item"><a href="#">Site map</a></li>
      <li class="navigation_link-item"><a href="#">Site Status</a></li>
      <li class="navigation_link-item"><a href="#">Design</a></li>
      <li class="navigation_link-item"><a href="#">About</a></li>
    </ul>
  `
}

const footer = () => {
  return `
    <p>This is the footer</p>
  `
}