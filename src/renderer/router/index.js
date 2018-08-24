import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home.vue'
import creator from '@/pages/creator.vue'
import ObjectMap from '@/components/ObjectMap.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/creator/:id',
      name: 'creator',
      component: creator,
      children: [
        {
          path: '',
          name: 'root',
          component: ObjectMap
        },
        {
          path: 'children',
          name: 'children',
          component: ObjectMap
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
