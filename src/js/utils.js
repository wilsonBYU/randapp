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
  document.querySelector(".menuButton").addEventListener("click", (e) => {
    document.querySelector(".navigation_link-list").classList.toggle("hideMenu")
  })

}

export const filterActivities = (activities, filter) => {
  const negate = filter.includes("not")
  if (negate) {
    let filtered = activities.filter(act => !Boolean(base64ToJson(act)[filter.split("not")[1]]))
    return filtered
  } else {
    let filtered = activities.filter(act => Boolean(base64ToJson(act)[filter]))
    return filtered
  }
}

const header = () => {
  return `
    <div class="menu_options">
      <h1><a href="/ranpdapp/">Randapp!</a></h1>
      <button class="menuButton"><i class="fas fa-bars"></i></button>
    </div>
    <ul class="navigation_link-list hideMenu">
      <li class="navigation_link-item"><a href="/randapp/sitemap/"><i class="fas fa-sitemap"></i> Site map</a></li>
      <li class="navigation_link-item"><a href="/randapp/site_status/"><i class="fas fa-cogs"></i> Site Status</a></li>
      <li class="navigation_link-item"><a href="/randapp/about/"><i class="fas fa-info-circle"></i> About</a></li>
    </ul>
  `
}

const footer = () => {
  return `
    <p>Wilson Romero | BYU-I CIT330 | ${new Date().getFullYear()} | Powered by <a href="https://unsplash.com/">Unsplash.com</a> & <a href="http://www.boredapi.com/">Boredapi.com</a>
  `
}