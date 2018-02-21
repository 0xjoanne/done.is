import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  userId: '',
  task: {},
  taskTitle: '',
  detailsVisibility: false,
  navTitle: 'Inbox',
  navId: '0',
  inputListTitle: 'Inbox'
}

const mutations = {
  SETUSERID (state, id) {
    state.userId = id
  },
  SETTASK (state, task) {
    state.task = task
    state.taskTitle = task.title
  },
  SETTASKTITLE (state, title) {
    state.taskTitle = title
  },
  SETDETAILSVISIBILITY (state, visibility) {
    state.detailsVisibility = visibility
  },
  SETNAVTITLE (state, title) {
    state.navTitle = title
  },
  SETNAVID (state, id) {
    state.navId = id
  },
  SETINPUTLISTTITLE (state, title) {
    state.inputListTitle = title
  }
}

const actions = {

}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
