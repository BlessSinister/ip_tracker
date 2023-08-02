import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import icon from '../images/icon-location.svg'

const ipInput = document.querySelector('.search-bar__input')
const btn = document.querySelector('.search-bar__btn')
const ipInfo = document.querySelector('#ip')
const locationInfo = document.querySelector('#location')
const timezoneInfo = document.querySelector('#timezone')
const ispInfo = document.querySelector('#isp')
const markerItem = L.icon({
  iconUrl: icon,
  iconSize: [30, 40],
  // iconAnchor: [22, 94],
})

const mapArea = document.querySelector('.map')
const map = L.map(mapArea, {
  center: [51.505, -0.09],
  zoom: 13,
})
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map)

btn.addEventListener('click', getData)
ipInput.addEventListener('keydown', handleKey)

function getData() {
  if (validateIp(ipInput.value)) {
    fetch(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_b8C1bzddZJg0vJdopaKtQlhRbVpqo&ipAddress=${ipInput.value}`
    )
      .then((response) => response.json())
      .then(setInfo)
    //   (data) => setInfo(data)
  }
}
function handleKey(e) {
  if (e.key == 'Enter') {
    getData()
  }
}
function validateIp(ip) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return true
  }
  alert('You have entered an invalid IP address!')
  return false
}

function setInfo(data) {
  const { ip, location, isp } = data
  const { lat, lng } = data.location

  console.log(data)
  ipInfo.innerHTML = ip
  locationInfo.innerHTML = location.region
  timezoneInfo.innerHTML = location.timezone
  ispInfo.innerHTML = isp
  map.setView([lat, lng], 13)
  L.marker([lat, lng], { icon: markerItem }).addTo(map)
  addOffset(map)
}

function addOffset(map) {
  const offsetY = map.getSize().y * 0.15
  map.panBy([0, -offsetY], { animate: false })
}
document.addEventListener('DOMContentLoaded', () => {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=at_b8C1bzddZJg0vJdopaKtQlhRbVpqo&ipAddress=102.22.22.1`
  )
    .then((response) => response.json())
    .then(setInfo)
  //   (data) => setInfo(data)
})
