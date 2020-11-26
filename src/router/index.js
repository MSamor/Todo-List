import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  }
]

const router = new VueRouter({
  routes
})

export default router
