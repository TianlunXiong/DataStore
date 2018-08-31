import { builder } from '@/util'
import Vue from 'vue'
export default {
  namespaced: true,
  state: {
    objects: {

    },
    factory: {
      entriesBuffer: []
    },
    serverStatus: false
  },
  getters: {
    dStoreList (state) {
      const names = Object.keys(state.objects)
      return names.map(name => {
        const someMember = state.objects[name]
        const values = Object.keys(someMember).map(key => ({
          key,
          descriptor: someMember[key].descriptor
        }))
        return {
          name,
          values
        }
      })
    }
  },
  mutations: {
    SAVE (state, object) {
      Vue.set(state.objects, object.name, object.body)
    },
    DELETE_OBJECT (state, name) {
      Vue.delete(state.objects, name)
    },
    PUSH_ENTRIES_BUFFER (state, item) {
      state.factory.entriesBuffer.push(item)
    },
    ACHIEVE_ENTRIES_BUFFER (state, achieve) {
      state.factory.entriesBuffer[achieve.index]['key'] = achieve.key
      state.factory.entriesBuffer[achieve.index]['value']['descriptor'] = achieve.descriptor
      state.factory.entriesBuffer[achieve.index]['value']['initiator'] = achieve.initiator
    },
    DELETE_ENTRIES_BUFFER (state, index) {
      state.factory.entriesBuffer.splice(index, 1)
    },
    RESET_ENTRIES_BUFFER (state) {
      state.factory.entriesBuffer = []
    },
    SET_SERVER (state, signal) {
      state.serverStatus = signal
    }
  },
  actions: {
    save (context, object) {
      context.commit('SAVE', object)
    },
    deleteObject (context, name) {
      context.commit('DELETE_OBJECT', name)
    },
    pushEntriesBuffer (context, item) {
      context.commit('PUSH_ENTRIES_BUFFER', item)
    },
    achieveEntriesBuffer (context, achieve) {
      context.commit('ACHIEVE_ENTRIES_BUFFER', achieve)
    },
    deleteEntriesBuffer (context, index) {
      context.commit('DELETE_ENTRIES_BUFFER', index)
    },
    resetEntriesBuffer (context) {
      context.commit('RESET_ENTRIES_BUFFER')
    },
    buildObject (context, name) {
      if (context.state.objects[name]) {
        return builder(context.state.objects[name])
      }
    },
    setServer (context, signal) {
      context.commit('SET_SERVER', signal)
    }
  }
}
