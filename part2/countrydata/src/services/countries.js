import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = formData => {
  return axios.post(baseUrl, formData)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, changedContact) => {
  return axios.put(`${baseUrl}/${id}`, changedContact)
}

const getWeather = (country, api_key) => {
  return axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${api_key}`)
}


export default { 
  getAll: getAll, 
  create: create, 
  remove: remove, 
  update: update,
  getWeather: getWeather
}