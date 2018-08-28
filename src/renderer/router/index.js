import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home.vue'
import creator from '@/pages/creator.vue'
import factory from '@/pages/creator/factory.vue'
import dStore from '@/pages/creator/dStore.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/creator',
      name: 'creator',
      component: creator,
      children: [
        {
          path: 'factory',
          name: 'factory',
          component: factory
        },
        {
          path: 'dstore',
          name: 'dstore',
          component: dStore
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
