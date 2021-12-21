import Vue from 'vue'
import Router from 'vue-router'
import Users from '../components/Users.vue'

Vue.use(Router)


const router= new Router({
  routes:[
    {path:'/',redirect:'/users'},
    {path:'/users', component:Users,}

  ]
})

export default router
