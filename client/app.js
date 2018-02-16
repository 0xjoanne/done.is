import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import vClickOutside from 'v-click-outside'
const Chance = require('chance')()
import axios from 'axios'
sync(store, router)

Vue.use(ElementUI)
Vue.use(vClickOutside)

axios.defaults.baseURL = 'http://localhost:7001'
if (process.env.NODE_ENV === 'prod') {
  axios.defaults.baseURL = 'https://api.done.is'
}

Vue.mixin({
  created () {
    this.axios = axios
  }
})

const bus = new Vue()

Vue.mixin({
  beforeCreate () {
    this.$bus = bus
  }
})

const userId = localStorage.getItem('userId')
if (userId) {
  router.replace('/login')
}

Vue.prototype.$sortable = function (e, array) {
  const newIndex = e.newIndex
  const currentItem = array[newIndex]

  if (newIndex === 0) {
    const next = array[newIndex + 1].index
    currentItem.index = Chance.floating({min: -9999, max: next, fixed: 8})
  } else if (newIndex !== array.length - 1) {
    const prev = array[newIndex - 1].index
    const next = array[newIndex + 1].index
    currentItem.index = Chance.floating({min: prev, max: next, fixed: 8})
  } else {
    const prev = array[newIndex - 1].index
    currentItem.index = Chance.floating({min: prev, max: prev + 9999, fixed: 8})
  }
}

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
