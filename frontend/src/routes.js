import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

export const routes = [
  {path: '/', component: HomePage, name: 'home'},
  {path: '/login', component: LoginPage, name: 'login'}
]
