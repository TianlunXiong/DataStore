import { builder } from '@/util/'
export default {
  namespaced: true,
  state: {
    objects: {

    },
    factory: {
      entriesBuffer: [

      ]
    }
  },
  mutations: {
    SAVE (state, object) {
      state.objects[object.name] = object.body
    },

    PUSH_ENTRIES_BUFFER (state, item) {
      state.factory.entriesBuffer.push(item)
    },
    ACHIEVE_ENTRIES_BUFFER (state, achieve) {
      state.factory.entriesBuffer[achieve.index]['value']['descriptor'] = achieve.descriptor
      state.factory.entriesBuffer[achieve.index]['value']['initiator'] = achieve.initiator
    },
    DELETE_ENTRIES_BUFFER (state, index) {
      state.factory.entriesBuffer.splice(index, 1)
    },
    RESET_ENTRIES_BUFFER (state) {
      state.factory.entriesBuffer = []
    }
  },
  actions: {
    save (context, object) {
      context.commit('SAVE', object)
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
    }
  }
}
