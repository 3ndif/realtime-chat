import axios from 'axios'

export const HTTP = axios.create({
  baseURL: 'http://chat.local/',
  headers: getHeaders()
})

export const api = {
  login: 'oauth/token',
  user: 'api/v1/user',
  getUserList: 'api/v1/get-user-list',
  getConversationWithUser: 'api/v1/get-conversation-with-user',
  sendNewMessage: 'api/v1/send-new-message'
}

function getHeaders () {
  let headers = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }

  let authUser = JSON.parse(window.localStorage.getItem('authUser'))

  if (authUser && authUser.access) {
    headers['Authorization'] = 'Bearer ' + authUser.access.access_token
  }

  return headers
}
