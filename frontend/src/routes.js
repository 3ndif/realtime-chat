import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

export const routes = [
  {path: '/', component: HomePage, name: 'home', meta: {requiresAuth: true}},
  {path: '/login', component: LoginPage, name: 'login'}
]
