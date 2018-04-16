const LoginPage = () => import('./pages/LoginPage')
const HomePage = () => import('./pages/HomePage')
const ChatPage = () => import('./pages/ChatPage')

export const routes = [
  {path: '/', component: HomePage, name: 'home', meta: {requiresAuth: true}},
  {path: '/chat', component: ChatPage, name: 'chat', meta: {requiresAuth: true}},
  {path: '/login', component: LoginPage, name: 'login'}
]
