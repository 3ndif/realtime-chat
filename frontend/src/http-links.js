import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://chat.local/',
  headers: getHeaders()
})

export const api = {
  login: 'oauth/token',
  user: 'api/v1/user'
}

function getHeaders () {
  let headers = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  let authUser = JSON.parse(window.localStorage.getItem('authUser'))

  if (authUser !== null) {
    headers['Authorization'] = 'Bearer ' + authUser.access_token
  }

  return headers
}
