import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { userService } from '@/api/user';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path:'/projects',
    name:'Projects',
    component: () => import(/* webpackChunkName: "projects" */ '../views/Projects.vue')
  },
  {
    path:'/project/:id',
    name:'Project',
    component: () => import(/* webpackChunkName: "project" */ '../views/Project.vue')    
  },
  {
    path:'/owners',
    name:'Owners',
    component: () => import(/* webpackChunkName: "owners" */ '../views/Owners.vue')
  },
  {
    path:'/owner/:id',
    name:'Owner',
    component: () => import(/* webpackChunkName: "owner" */ '../views/Owner.vue')    
  },
  {
    path:'*',
    redirect:'/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.name !== 'Login' && !loggedIn()) {
    console.log('user not logged in,reroute')
    next({name:'Login'});
  } else next();
})

function loggedIn() {
  return userService.isLoggedIn();
}


export default router
