import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

export const routes = [
  {path: '/', component: HomePage, name: 'home', meta: {requiresAuth: true}},
  {path: '/chat', component: ChatPage, name: 'chat', meta: {requiresAuth: true}},
  {path: '/login', component: LoginPage, name: 'login'}
]
